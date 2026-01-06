import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
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
