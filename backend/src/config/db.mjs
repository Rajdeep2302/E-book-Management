import pg from "pg";
import env from "./env.mjs";

let pool = null;

export const connectDB = async () => {
  try {
    if (!env.DB_URL) {
        console.warn("DATABASE_URL not found - Mocking DB Connection for Demo");
        sql = async (strings, ...values) => {
            console.log("Mock SQL query:", strings[0]);
            return [{}]; // Return dummy data
        };
        return sql;
    }

    pool = new pg.Pool({ connectionString: env.DB_URL });

    // Sanity check
    const result = await pool.query("SELECT NOW()");
    console.log("PostgreSQL Connected:", result.rows[0].now);

    return pool;
  } catch (err) {
    console.error("DB connection failed:", err.message);
    // Don't exit for hackathon demo
    // process.exit(1);
    sql = async () => [];
  }
};

// SQL template tag function for compatibility with existing code
export const sql = async (strings, ...values) => {
  if (!pool) {
    throw new Error("Database not connected. Call connectDB() first.");
  }

  // Build parameterized query
  let text = strings[0];
  for (let i = 0; i < values.length; i++) {
    text += `$${i + 1}` + strings[i + 1];
  }

  const result = await pool.query(text, values);
  return result.rows;
};

export { pool };
