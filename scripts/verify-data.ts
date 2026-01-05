import { db } from '../src/db';
import { users, proposals, zisLogs } from '../src/db/schema';
import { count, desc } from 'drizzle-orm';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.production.local' });

async function main() {
    console.log('🔍 Verifying Database Content...\n');

    try {
        // 1. Check Users
        const userCount = await db.select({ count: count() }).from(users);
        console.log(`👤 Users Count: ${userCount[0].count}`);

        // 2. Check Proposals
        const proposalCount = await db.select({ count: count() }).from(proposals);
        console.log(`📄 Proposals Count: ${proposalCount[0].count}`);

        const latestProposals = await db.select().from(proposals).orderBy(desc(proposals.createdAt)).limit(3);
        if (latestProposals.length > 0) {
            console.log('   Latest 3 Proposals:');
            latestProposals.forEach(p => console.log(`   - [${p.status}] ${p.applicantName} (${p.serviceUnit})`));
        }

        // 3. Check ZIS Logs
        const logCount = await db.select({ count: count() }).from(zisLogs);
        console.log(`\n📊 ZIS Logs Count: ${logCount[0].count}`);

        const sampleLogs = await db.select().from(zisLogs).limit(3);
        if (sampleLogs.length > 0) {
            console.log('   Sample Logs:');
            sampleLogs.forEach(l => console.log(`   - ${l.type}: Rp ${l.amount}`));
        }

        console.log('\n✅ Data verification complete. The application is connected to this data.');

    } catch (e) {
        console.error('❌ Verification failed:', e);
    }

    process.exit(0);
}

main();
