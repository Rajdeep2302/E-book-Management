import nodemailer from 'nodemailer';
import env from '../config/env.mjs';

/**
 * Send email using SMTP
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text body
 * @param {string} options.html - HTML body (optional)
 */
export const sendEmail = async (options) => {
    // Create transporter with SMTP settings
    const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS
        }
    });

    // Email options
    const mailOptions = {
        from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`📧 Email sent: ${info.messageId}`);

    return info;
};

/**
 * Generate welcome email HTML (sent after account creation)
 */
export const getWelcomeEmailHTML = (name, email, loginUrl) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; text-align: center; }
        .content h2 { color: #1f2937; margin-bottom: 10px; }
        .content p { color: #6b7280; line-height: 1.6; }
        .info-box { background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: left; }
        .info-box p { margin: 5px 0; color: #374151; }
        .info-box strong { color: #1f2937; }
        .button { display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 EduHub</h1>
        </div>
        <div class="content">
          <h2>Welcome to EduHub, ${name}! 🎉</h2>
          <p>Your account has been successfully created. You can now access all our educational resources.</p>
          
          <div class="info-box">
            <p><strong>Account Details:</strong></p>
            <p>📧 Email: ${email}</p>
            <p>🕐 Created: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <a href="${loginUrl}" class="button">Login to Your Account</a>
          <p style="font-size: 12px; color: #9ca3af;">Start exploring books, notes, and more!</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} EduHub. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};


/**
 * Generate password reset email HTML
 */
export const getResetPasswordEmailHTML = (name, resetUrl) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #ef4444, #f97316); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; text-align: center; }
        .content h2 { color: #1f2937; margin-bottom: 10px; }
        .content p { color: #6b7280; line-height: 1.6; }
        .button { display: inline-block; background: linear-gradient(135deg, #ef4444, #f97316); color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset</h1>
        </div>
        <div class="content">
          <h2>Hi ${name},</h2>
          <p>We received a request to reset your password. Click the button below to set a new password.</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          <p style="font-size: 12px; color: #9ca3af;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} EduHub. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
