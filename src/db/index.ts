import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const poolConfig: PoolConfig = {
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.POSTGRES_URL?.includes('vercel') || process.env.POSTGRES_URL?.includes('supabase') ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
};

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

export const db = drizzle(pool, { schema });
