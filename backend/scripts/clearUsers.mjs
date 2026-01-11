import { connectDB } from '../src/config/db.mjs';
import env from '../src/config/env.mjs';

const clearUsers = async () => {
    try {
        console.log('Connecting to database...');
        // Initialize pool
        const pool = await connectDB();

        // Simple query to truncate users table
        const query = 'TRUNCATE TABLE users RESTART IDENTITY CASCADE;';
        await pool.query(query);
        console.log('✅ All users deleted successfully.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to delete users:', err);
        process.exit(1);
    }
};

clearUsers();
