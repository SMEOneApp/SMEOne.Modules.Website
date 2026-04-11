const BREVO_BASE_URL = "https://api.brevo.com/v3";
const DEFAULT_LIST_NAME = "WAITLIST";

const json = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

const parseRequestBody = async (req) => {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
};

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

  if (response.status === 204) {
    return null;
  }

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

    if (existingList) {
      return existingList.id;
    }

    if (!payload.lists || payload.lists.length < limit) {
      break;
    }

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

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { message: "Method not allowed." });
  }

  if (!process.env.BREVO_API_KEY) {
    return json(res, 500, {
      message: "Brevo API key is not configured on the server.",
    });
  }

  try {
    const { email, firstName, lastName } = await parseRequestBody(req);
    const trimmedEmail = String(email || "").trim();
    const trimmedFirstName = String(firstName || "").trim();
    const trimmedLastName = String(lastName || "").trim();

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      return json(res, 400, { message: "A valid email address is required." });
    }

    if (!trimmedFirstName || !trimmedLastName) {
      return json(res, 400, {
        message: "First name and last name are required.",
      });
    }

    const listId = await findOrCreateList(
      process.env.BREVO_LIST_NAME || DEFAULT_LIST_NAME
    );

    await brevoRequest("/contacts", {
      method: "POST",
      body: JSON.stringify({
        email: trimmedEmail,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          FIRSTNAME: trimmedFirstName,
          LASTNAME: trimmedLastName,
          SIGNED_UP_AT: new Date().toISOString(),
        },
      }),
    });

    return json(res, 200, { message: "Contact added to waitlist." });
  } catch (error) {
    return json(res, 500, {
      message: error.message || "Unable to add contact to waitlist.",
    });
  }
};
