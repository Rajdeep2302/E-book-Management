export const otpMail = ({ name, otp }) => {
  return `
  <div style="
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      padding: 40px 0;
      width: 100%;
      text-align: center;
      font-family: Arial, Helvetica, sans-serif;
  ">

    <div style="
        background: #ffffff;
        max-width: 520px;
        margin: 0 auto;
        border-radius: 16px;
        padding: 35px 25px;
        box-shadow: 0 25px 70px rgba(0,0,0,.25);
    ">

      <div style="
          height: 75px;
          width: 75px;
          margin: 0 auto;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: #fff;
          font-size: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
      ">
        🔐
      </div>

      <h1 style="margin: 20px 0 10px 0; color: #111;">
        Password Reset OTP
      </h1>

      <p style="color: #555; font-size: 15px; line-height: 22px;">
        Hey <strong>${name}</strong>,<br/>
        We received a request to reset your password. Use the code below to verify your identity:
      </p>

      <div style="
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          padding: 25px;
          border-radius: 12px;
          margin: 25px auto;
          max-width: 220px;
      ">
        <p style="
            font-size: 42px;
            font-weight: bold;
            color: #fff;
            letter-spacing: 10px;
            margin: 0;
        ">${otp}</p>
      </div>

      <p style="color: #666; font-size: 14px; margin-top: 15px;">
        This code expires in <strong>5 minutes</strong>.
      </p>

      <p style="color: #999; font-size: 12px; margin-top: 20px;">
        If you didn't request this, please ignore this email.
      </p>

    </div>

    <p style="color:#fff;font-size:13px;margin-top:15px;opacity:.9">
      © ${new Date().getFullYear()} EduHub • All Rights Reserved
    </p>

  </div>
  `;
};
