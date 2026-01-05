import { db } from '../src/db';
import { users } from '../src/db/schema';
import { hashPassword } from '../src/lib/session';
import dotenv from 'dotenv';

// Load environment variables (.env.local or .env.production.local depending on what is available)
dotenv.config({ path: '.env.local' });
// Fallback if local not found/empty
dotenv.config({ path: '.env.production.local' });

async function main() {
    console.log('🌱 Seeding Admin User...');

    const username = 'alditpra';
    const password = '123';

    try {
        const hashedPassword = hashPassword(password);
        console.log(`🔑 Username: ${username}`);
        console.log(`🔑 Password: ${password}`);
        console.log(`🔒 Hash: ${hashedPassword}`);

        // Insert or ignore if exists (users has unique constraint on username)
        await db.insert(users).values({
            username,
            password: hashedPassword,
        }).onConflictDoNothing();

        console.log('✅ Admin user created successfully!');
    } catch (e) {
        console.error('❌ Error seeding user:', e);
    }

    process.exit(0);
}

main();
