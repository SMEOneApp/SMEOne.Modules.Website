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
  const templatePath = path.join(
    __dirname,
    "email-templates",
    `${templateName}.html`
  );
  return fs.readFileSync(templatePath, "utf8");
};

const interpolate = (template, params) => {
  let result = template;
  for (const [key, value] of Object.entries(params)) {
    result = result.split(`{{${key}}}`).join(value ?? "");
  }
  return result;
};

const sendEmail = async ({ to, subject, templateName, params }) => {
  const raw = loadTemplate(templateName);
  const html = interpolate(raw, {
    PLATFORM_NAME: "SMEOne",
    SUPPORT_EMAIL: process.env.SMTP_FROM_EMAIL || "hello@smeone.africa",
    SITE_URL: process.env.SITE_URL || "https://smeone.africa",
    ...params,
  });

  const transporter = createTransport();
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "SMEOne"}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };
