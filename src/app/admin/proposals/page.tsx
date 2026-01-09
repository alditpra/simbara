import { db } from '@/db';
import { proposals } from '@/db/schema';
import { sql, desc } from 'drizzle-orm';
import { unstable_noStore as noStore } from 'next/cache';
import { deleteProposal } from '@/actions/proposals';
import AdminProposalsClient from './AdminProposalsClient';

export const dynamic = 'force-dynamic';

noStore();

async function getProposalsData() {
    try {
        const data = await db.select().from(proposals).orderBy(desc(sql`${proposals.createdAt}`));
        return data || [];
    } catch (error) {
        console.error('Error fetching proposals:', error);
        return [];
    }
}

export default async function AdminProposalsPage() {
    const proposals = await getProposalsData();

    return <AdminProposalsClient proposals={proposals} />;
}
