import { sql } from "../config/db.mjs";

export const insertUser = async (data) => {
  const result = await sql`
    INSERT INTO users 
      (name, email, phone, department, institute, password, registration_id, student, teacher)
    VALUES 
      (${data.name}, ${data.email}, ${data.phone}, ${data.department}, ${data.institute},
       ${data.password}, ${data.registration_id}, ${data.student}, ${data.teacher})
    RETURNING *;
  `;
  return result[0];
};


export const getAllUsers = async () => {
  return await sql`SELECT * FROM users`;
};
