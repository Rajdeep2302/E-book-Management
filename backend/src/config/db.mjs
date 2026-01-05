import { neon } from "@neondatabase/serverless";
import env from "./env.mjs";

let sql = null;

export const connectDB = async () => {
  try {
    if (!env.DB_URL) throw new Error("DATABASE_URL not found");

    sql = neon(env.DB_URL);

    // sanity check
    const result = await sql`SELECT NOW()`;
    console.log("PostgreSQL Connected:", result[0].now);

    return sql;
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

export { sql };
