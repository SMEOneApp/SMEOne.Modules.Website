const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const createTransport = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const loadTemplate = (templateName) => {
  // Try multiple locations so this works locally AND in Vercel's bundled function runtime.
  const candidates = [
    path.join(__dirname, "email-templates", `${templateName}.html`),
    path.join(process.cwd(), "api", "email-templates", `${templateName}.html`),
    path.join(process.cwd(), "email-templates", `${templateName}.html`),
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, "utf8");
    }
  }

  throw new Error(
    `Email template "${templateName}.html" not found. Looked in: ${candidates.join(", ")}`
  );
};

const interpolate = (template, params) => {
  let result = template;
  for (const [key, value] of Object.entries(params)) {
    result = result.split(`{{${key}}}`).join(value ?? "");
  }
  return result;
};

const sendEmail = async ({ to, subject, templateName, params }) => {
  console.log(`[mailer] Preparing to send "${subject}" to ${to}`);

  const raw = loadTemplate(templateName);
  const html = interpolate(raw, {
    PLATFORM_NAME: "SMEOne",
    SUPPORT_EMAIL: process.env.SMTP_FROM_EMAIL || "hello@smeone.africa",
    SITE_URL: process.env.SITE_URL || "https://smeone.africa",
    ...params,
  });

  const transporter = createTransport();

  try {
    await transporter.verify();
    console.log("[mailer] SMTP connection verified");
  } catch (verifyErr) {
    console.error("[mailer] SMTP verify failed:", {
      message: verifyErr.message,
      code: verifyErr.code,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
    });
    throw verifyErr;
  }

  const info = await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "SMEOne"}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });

  console.log(`[mailer] Sent ${info.messageId} to ${to} (accepted: ${info.accepted?.length || 0})`);
  return info;
};

module.exports = { sendEmail };
