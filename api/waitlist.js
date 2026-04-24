const BACKOFFICE_API_URL =
  "https://smeone-modules-monolith.onrender.com/api/v1/backoffice/waitlist";

const json = (statusCode, payload) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let apiResponse;
    try {
      apiResponse = await fetch(BACKOFFICE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          email: trimmedEmail,
        }),
        signal: controller.signal,
      });
    } catch (fetchError) {
      clearTimeout(timeout);
      const isTimeout = fetchError.name === "AbortError";
      return json(503, {
        message: isTimeout
          ? "The server is waking up — please try again in a moment."
          : "Could not reach the waitlist service. Please try again.",
      });
    }
    clearTimeout(timeout);

    const payload = await apiResponse.json().catch(() => ({}));

    if (!apiResponse.ok) {
      const message = payload.message || "Unable to add contact to waitlist.";
      if (message.toLowerCase().includes("already on the waitlist")) {
        return json(409, { message: "You're already on the waitlist!" });
      }
      return json(apiResponse.status, { message });
    }

    // Send confirmation email (non-fatal, lazy-require so nodemailer never blocks startup)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const { sendEmail } = require("./mailer");
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
      } catch (mailErr) {
        console.error("[mailer] Failed to load mailer:", mailErr.message);
      }
    }

    return json(200, { message: "You've been added to the waitlist!" });
  } catch (error) {
    return json(500, {
      message: error.message || "Unable to add contact to waitlist.",
    });
  }
};
