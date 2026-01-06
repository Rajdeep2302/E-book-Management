export const registrationMail = ({ name, registrationId, email }) => {
  return `
  <div style="
      background: linear-gradient(135deg,#1d2671,#c33764);
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
          background: #28c76f;
          color: #fff;
          font-size: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
      ">
        ✓
      </div>

      <h1 style="margin: 15px 0 5px 0; color: #111;">
        Registration Successful
      </h1>

      <p style="color: #555; font-size: 15px; line-height: 22px;">
        Hey <strong>${name}</strong>,<br/>
        Your account has been successfully created.
      </p>

      <div style="
          background: #f5f5f5;
          padding: 14px;
          border-radius: 12px;
          text-align: left;
          margin-top: 10px;
          font-size: 14px;
          color: #333;
      ">
        <p><strong>Registration ID:</strong> ${registrationId}</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>

      <a
        href="https://rajdeeppal.me/"
        style="
          display: inline-block;
          margin-top: 16px;
          background: #1d2671;
          color: #fff;
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 8px;
          font-weight: bold;
        "
      >
        Go to Login
      </a>

    </div>

    <p style="color:#fff;font-size:13px;margin-top:15px;opacity:.9">
      © 2026 Incognito • All Rights Reserved
    </p>

  </div>
  `;
};
