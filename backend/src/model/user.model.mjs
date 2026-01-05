import { sql } from "../config/db.mjs";

export const insertUser = async (name,id) => {
  const result = await sql`
    INSERT INTO users (name, registration_id)
    VALUES (${name}, ${id})
    RETURNING *
  `;
  return result[0];
};

export const getAllUsers = async () => {
  return await sql`SELECT * FROM users`;
};
