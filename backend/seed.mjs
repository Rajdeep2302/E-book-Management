/**
 * Database Seed Script
 * Run with: node seed.mjs
 * Creates tables and inserts sample data for student, teacher, and admin users
 * 
 * Schema: User-defined strict schema with added columns for Auth tokens.
 * Role: 0=Student, 1=Teacher, 2=Admin
 */

import pg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("DATABASE_URL not found in .env");
    process.exit(1);
}

const pool = new pg.Pool({ connectionString: DATABASE_URL });

async function query(text, params) {
    const result = await pool.query(text, params);
    return result.rows;
}

async function seed() {
    try {
        console.log("Connecting to database...");

        // Test connection
        await query("SELECT NOW()");
        console.log("✓ Connected to PostgreSQL");

        // Drop existing users table to recreate with new schema
        console.log("Dropping existing users table...");
        await query("DROP TABLE IF EXISTS users CASCADE");
        console.log("✓ Old table dropped");

        // Create users table
        // CRITICAL: Using User's defined schema as base
        // Added: is_verified, tokens, timestamps to support existing logic
        console.log("Creating users table...");
        await query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(1000) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        department TEXT DEFAULT NULL,
        institute TEXT NOT NULL,
        password TEXT NOT NULL,
        otp INT DEFAULT NULL,
        role INT DEFAULT 0,
        
        is_verified BOOLEAN DEFAULT FALSE,
        email_verification_token TEXT,
        email_verification_expiry TIMESTAMP,
        reset_password_token TEXT,
        reset_password_expiry TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log("✓ Users table ready");

        // Hash the password 'password' for sample users
        const hashedPassword = await bcrypt.hash("password", 10);
        console.log("✓ Password hashed");

        // Insert sample student (Role 0)
        console.log("Inserting sample student...");
        try {
            await query(`
        INSERT INTO users (name, email, password, role, is_verified, institute, department, phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, ['John Student', 'student@test.com', hashedPassword, 0, true, 'Test Institute', 'Computer Science', '1234567890']);
            console.log("✓ Student user created");
        } catch (e) {
            console.log("→ Student user error:", e.message);
        }

        // Insert sample teacher (Role 1)
        console.log("Inserting sample teacher...");
        try {
            await query(`
        INSERT INTO users (name, email, password, role, is_verified, institute, department, phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, ['Jane Teacher', 'teacher@test.com', hashedPassword, 1, true, 'Test Institute', 'Computer Science', '0987654321']);
            console.log("✓ Teacher user created");
        } catch (e) {
            console.log("→ Teacher user error:", e.message);
        }

        // Insert sample admin (Role 2)
        console.log("Inserting sample admin...");
        try {
            await query(`
        INSERT INTO users (name, email, password, role, is_verified, institute, department, phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, ['Admin User', 'admin@test.com', hashedPassword, 2, true, 'Test Institute', 'Administration', '5555555555']);
            console.log("✓ Admin user created");
        } catch (e) {
            console.log("→ Admin user error:", e.message);
        }

        // Verify data
        console.log("\n--- Sample Users Created ---");
        const users = await query("SELECT id, name, email, role, institute FROM users");
        console.table(users);

        console.log("\n✅ Seed completed successfully!");

        await pool.end();
    } catch (err) {
        console.error("Seed failed:", err.message);
        await pool.end();
        process.exit(1);
    }
}

seed();
