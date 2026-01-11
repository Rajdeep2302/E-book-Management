import { connectDB, pool } from '../src/config/db.mjs';
import bcrypt from 'bcrypt';

const seedUsers = async () => {
    try {
        console.log('🌱 Connecting to database...');
        await connectDB();

        console.log('🧹 Clearing existing users...');
        await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

        console.log('👤 Creating test users...');

        const passwordHash = await bcrypt.hash('Password@123', 10);

        const users = [
            {
                name: 'Student User',
                email: 'student@test.com',
                password: passwordHash,
                role: 0, // Student
                is_verified: true,
                institute: 'Test Institute',
                department: 'Computer Science',
                phone: '1234567890'
            },
            {
                name: 'Teacher User',
                email: 'teacher@test.com',
                password: passwordHash,
                role: 1, // Teacher
                is_verified: true,
                institute: 'Test Institute',
                department: 'Engineering',
                phone: '0987654321'
            },
            {
                name: 'Admin User',
                email: 'admin@test.com',
                password: passwordHash,
                role: 2, // Admin
                is_verified: true,
                institute: 'Admin Institute',
                department: 'Administration',
                phone: '1122334455'
            }
        ];

        const query = `
            INSERT INTO users (name, email, password, role, is_verified, institute, department, phone)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, name, email, role;
        `;

        for (const user of users) {
            const values = [user.name, user.email, user.password, user.role, user.is_verified, user.institute, user.department, user.phone];
            const res = await pool.query(query, values);
            console.log(`✅ Created user: ${res.rows[0].email} (Role: ${res.rows[0].role})`);
        }

        console.log('✨ Seeding completed successfully!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seedUsers();
