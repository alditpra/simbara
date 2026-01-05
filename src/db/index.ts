import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Setup connection pool
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: false // Disable SSL for local dev if needed, or set to true for Vercel
});

export const db = drizzle(pool, { schema });
