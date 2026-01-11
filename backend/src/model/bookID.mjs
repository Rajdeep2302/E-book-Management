import { sql } from "../config/db.mjs";

export const bookID = async (id) => {
  const result = await sql`
    SELECT upload_id 
    FROM uploads 
    WHERE upload_id = ${id}
  `;

  return result.length ? result[0] : null;
};
