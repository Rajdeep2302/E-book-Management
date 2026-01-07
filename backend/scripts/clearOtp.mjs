import { connectDB, pool } from '../src/config/db.mjs';

const clearOtpData = async () => {
    try {
        console.log('🔗 Connecting to database...');
        await connectDB();

        console.log('🧹 Clearing OTP data from all users...');
        const result = await pool.query(`
            UPDATE users 
            SET otp = NULL, reset_password_expiry = NULL 
            WHERE otp IS NOT NULL OR reset_password_expiry IS NOT NULL
        `);

        console.log(`✅ Cleared OTP data from ${result.rowCount} user(s)`);
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
};

clearOtpData();
