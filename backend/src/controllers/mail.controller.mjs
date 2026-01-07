import nodemailer from "nodemailer";
import env from "../config/env.mjs";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST || "smtp.gmail.com",
  port: env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  }
});

export const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"${env.FROM_NAME}" <${env.FROM_EMAIL}>`,
      to,
      subject,
      html
    });

    // If Gmail rejects or fails
    if (!info.accepted || info.accepted.length === 0) {
      console.error("Mail rejected:", info);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Mail error:", err.message || err);
    return false;
  }
};
