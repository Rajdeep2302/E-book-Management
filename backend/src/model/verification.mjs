import { sql } from "../config/db.mjs"

export const emailVerification = async (email)=>{
    const result = await sql`
    SELECT email FROM users WHERE email = ${email}`

    return result.length ? result[0] : null;
}