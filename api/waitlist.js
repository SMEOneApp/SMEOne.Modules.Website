const BACKOFFICE_API_URL =
  "https://smeone-modules-monolith.onrender.com/api/v1/backoffice/waitlist";

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
      return res.status(503).json({
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
        return res.status(409).json({ message: "You're already on the waitlist!" });
      }
      return res.status(apiResponse.status).json({ message });
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

    return res.status(200).json({ message: "You've been added to the waitlist!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Unable to add contact to waitlist.",
    });
  }
};
