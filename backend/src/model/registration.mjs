import { sql } from "../config/db.mjs";

export const registration = async (id) => {
  const result = await sql`
    SELECT registration_id 
    FROM users 
    WHERE registration_id = ${id}
  `;

  return result.length ? result[0] : null;
};
