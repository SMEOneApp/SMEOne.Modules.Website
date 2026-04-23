const { sendEmail } = require("./mailer");

const BREVO_BASE_URL = "https://api.brevo.com/v3";
const DEFAULT_LIST_NAME = "WAITLIST";

const json = (statusCode, payload) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const brevoRequest = async (path, options = {}) => {
  const response = await fetch(`${BREVO_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const message =
      errorPayload.message || errorPayload.code || "Brevo request failed.";
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
};

const findOrCreateList = async (listName) => {
  let offset = 0;
  const limit = 50;

  while (true) {
    const payload = await brevoRequest(
      `/contacts/lists?limit=${limit}&offset=${offset}`
    );
    const existingList = (payload.lists || []).find(
      (list) => list.name === listName
    );
    if (existingList) return existingList.id;
    if (!payload.lists || payload.lists.length < limit) break;
    offset += limit;
  }

  const createdList = await brevoRequest("/contacts/lists", {
    method: "POST",
    body: JSON.stringify({
      name: listName,
      folderId: Number(process.env.BREVO_FOLDER_ID || 1),
    }),
  });
  return createdList.id;
};

// Lazy DB save — only requires Prisma when DATABASE_URL is present,
// so a missing generated client never crashes the function on startup.
const saveToDatabase = async (firstName, lastName, email) => {
  const prisma = require("./db");
  await prisma.waitlistEntry.upsert({
    where: { email },
    update: { firstName, lastName },
    create: { firstName, lastName, email },
  });
};

const contactExistsInBrevo = async (email) => {
  try {
    const response = await fetch(
      `${BREVO_BASE_URL}/contacts/${encodeURIComponent(email)}`,
      {
        headers: {
          Accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );
    return response.ok;
  } catch {
    return false;
  }
};

const addToBrevo = async (firstName, lastName, email) => {
  const listId = await findOrCreateList(
    process.env.BREVO_LIST_NAME || DEFAULT_LIST_NAME
  );
  await brevoRequest("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        SIGNED_UP_AT: new Date().toISOString(),
      },
    }),
  });
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed." });
  }

  try {
    const { email, firstName, lastName } = JSON.parse(event.body || "{}");
    const trimmedEmail = String(email || "").trim();
    const trimmedFirstName = String(firstName || "").trim();
    const trimmedLastName = String(lastName || "").trim();

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      return json(400, { message: "A valid email address is required." });
    }

    if (!trimmedFirstName || !trimmedLastName) {
      return json(400, { message: "First name and last name are required." });
    }

    // Check duplicate before doing anything else
    if (process.env.BREVO_API_KEY) {
      const alreadyRegistered = await contactExistsInBrevo(trimmedEmail);
      if (alreadyRegistered) {
        return json(409, { message: "You're already on the waitlist!" });
      }
    }

    // Add to Brevo (primary — must succeed)
    if (process.env.BREVO_API_KEY) {
      await addToBrevo(trimmedFirstName, trimmedLastName, trimmedEmail);
    }

    // Persist to DB (non-fatal)
    if (process.env.DATABASE_URL) {
      saveToDatabase(trimmedFirstName, trimmedLastName, trimmedEmail).catch(
        (err) => console.error("[db] Failed to save waitlist entry:", err.message)
      );
    }

    // Send confirmation email (non-fatal)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      sendEmail({
        to: trimmedEmail,
        subject: "You're on the SMEOne Waitlist! 🎉",
        templateName: "waitlist-confirmation",
        params: {
          FIRST_NAME: trimmedFirstName,
          LAST_NAME: trimmedLastName,
        },
      }).catch((err) =>
        console.error("[mailer] Failed to send confirmation email:", err.message)
      );
    }

    return json(200, { message: "You've been added to the waitlist!" });
  } catch (error) {
    return json(500, {
      message: error.message || "Unable to add contact to waitlist.",
    });
  }
};
