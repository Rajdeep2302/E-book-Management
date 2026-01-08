import dotenv from "dotenv";
dotenv.config();

const required = (key) => {
  if (!process.env[key]) {
    console.warn(`Missing required env: ${key} - Using Mock Value for Hackathon`);
    return "postgres://mock:mock@localhost:5432/mock"; // Default mock
  }
  return process.env[key];
};

const env = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8000,

  DB_URL: required("DATABASE_URL"),
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRE: process.env.JWT_EXPIRE || "30d",

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  FROM_NAME: process.env.FROM_NAME || "EduHub",
  FROM_EMAIL: process.env.FROM_EMAIL,

  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

  SUPABASE_URL: required("SUPABASE_URL"),
  SUPABASE_KEY: required("SUPABASE_KEY"),
});

export default env;
