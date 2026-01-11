import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("DATABASE_URL not found in .env");
    process.exit(1);
}

const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function createSettingsTable() {
    try {
        console.log("Connecting to database...");
        await pool.query("SELECT NOW()");

        console.log("Creating settings table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )
        `);

        // Seed maintenance mode if not exists
        const res = await pool.query("SELECT * FROM settings WHERE key = 'maintenance_mode'");
        if (res.rows.length === 0) {
            await pool.query("INSERT INTO settings (key, value) VALUES ('maintenance_mode', 'false')");
            console.log("Seeded maintenance_mode = false");
        }

        console.log("✅ Settings table ready");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed to create settings table:", err);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

createSettingsTable();
