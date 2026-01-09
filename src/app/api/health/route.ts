import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
    try {
        const result = await db.execute(sql`SELECT 1 as test`);
        return NextResponse.json({
            status: 'success',
            database: 'connected',
            result: result
        });
    } catch (error) {
        console.error('Database connection test failed:', error);
        return NextResponse.json({
            status: 'error',
            database: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
