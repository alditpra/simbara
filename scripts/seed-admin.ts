import { db } from '../src/db';
import { users } from '../src/db/schema';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables (.env.local or .env.production.local depending on what is available)
dotenv.config({ path: '.env.local' });
// Fallback if local not found/empty
dotenv.config({ path: '.env.production.local' });

// Standalone hashPassword (similiar to src/lib/session.ts but without 'server-only' dependency)
function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

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

        console.log('✅ Admin user created successfully via Seed!');
    } catch (e) {
        console.error('❌ Error seeding user:', e);
    }

    process.exit(0);
}

main();
