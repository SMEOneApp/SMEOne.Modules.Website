const BREVO_BASE_URL = "https://api.brevo.com/v3";
const DEFAULT_LIST_NAME = "WAITLIST";

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
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || err.code || "Brevo request failed.");
  }

  if (response.status === 204) return null;
  return response.json();
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

const findOrCreateList = async (listName) => {
  let offset = 0;
  const limit = 50;

  while (true) {
    const data = await brevoRequest(
      `/contacts/lists?limit=${limit}&offset=${offset}`
    );
    const existing = (data.lists || []).find((l) => l.name === listName);
    if (existing) return existing.id;
    if (!data.lists || data.lists.length < limit) break;
    offset += limit;
  }

  const created = await brevoRequest("/contacts/lists", {
    method: "POST",
    body: JSON.stringify({
      name: listName,
      folderId: Number(process.env.BREVO_FOLDER_ID || 1),
    }),
  });
  return created.id;
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

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    const { email, firstName, lastName } = req.body || {};
    const trimmedEmail = String(email || "").trim();
    const trimmedFirstName = String(firstName || "").trim();
    const trimmedLastName = String(lastName || "").trim();

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      return res.status(400).json({ message: "A valid email address is required." });
    }

    if (!trimmedFirstName || !trimmedLastName) {
      return res.status(400).json({ message: "First name and last name are required." });
    }

    if (!process.env.BREVO_API_KEY) {
      return res.status(500).json({ message: "Waitlist service is not configured." });
    }

    const alreadyRegistered = await contactExistsInBrevo(trimmedEmail);
    if (alreadyRegistered) {
      return res.status(409).json({ message: "You're already on the waitlist!" });
    }

    await addToBrevo(trimmedFirstName, trimmedLastName, trimmedEmail);

    // Send confirmation email (non-fatal — log full error but still return 200)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const { sendEmail } = require("./mailer");
        await sendEmail({
          to: trimmedEmail,
          subject: "You're on the SMEOne Waitlist! 🎉",
          templateName: "waitlist-confirmation",
          params: {
            FIRST_NAME: trimmedFirstName,
            LAST_NAME: trimmedLastName,
          },
        });
      } catch (mailErr) {
        console.error("[mailer] Email send failed:", {
          message: mailErr.message,
          code: mailErr.code,
          command: mailErr.command,
          response: mailErr.response,
        });
      }
    } else {
      console.warn("[mailer] Skipping email — SMTP_USER / SMTP_PASS not set");
    }

    return res.status(200).json({ message: "You've been added to the waitlist!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Unable to add to waitlist.",
    });
  }
};
