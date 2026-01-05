import { db } from '../src/db';
import { proposals, zisLogs } from '../src/db/schema';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker/locale/id_ID';

// Load environment variables (.env.local or .env.production.local depending on what is available)
dotenv.config({ path: '.env.local' });
// Fallback if local not found/empty
dotenv.config({ path: '.env.production.local' });

async function main() {
    console.log('🌱 Seeding Dummy Data...');

    // --- SEED PROPOSALS ---
    const proposalData: typeof proposals.$inferInsert[] = [];
    const statuses = ['processed', 'approved', 'rejected'] as const;

    // Generate 15 dummy proposals
    for (let i = 0; i < 15; i++) {
        proposalData.push({
            nik: faker.string.numeric(16),
            applicantName: faker.person.fullName(),
            address: faker.location.streetAddress({ useFullAddress: true }),
            serviceUnit: i % 2 === 0 ? 'Masjid Al-Hikmah' : 'Dinas Sosial',
            status: faker.helpers.arrayElement(statuses),
            adminNotes: 'Ini adalah data dummy otomatis.',
            createdAt: faker.date.recent({ days: 30 }),
        });
    }

    try {
        await db.insert(proposals).values(proposalData);
        console.log(`✅ Inserted ${proposalData.length} proposals.`);
    } catch (e) {
        console.error('❌ Error seeding proposals:', e);
    }

    // --- SEED ZIS LOGS ---
    const zisData: typeof zisLogs.$inferInsert[] = [];
    const currentYear = new Date().getFullYear();

    // Data Pemasukan & Pendistribusian per bulan (Jan-Dec)
    for (let month = 1; month <= 12; month++) {
        // Pemasukan (Tipe Pemasukan)
        zisData.push({
            type: 'pemasukan',
            amount: faker.commerce.price({ min: 10000000, max: 50000000, dec: 0 }),
            description: `Pemasukan Zakat Bulan ${month}`,
            month: month,
            year: currentYear,
        });

        // Pendistribusian (Tipe Pendistribusian)
        zisData.push({
            type: 'pendistribusian',
            amount: faker.commerce.price({ min: 5000000, max: 40000000, dec: 0 }),
            description: `Pendistribusian Zakat Bulan ${month}`,
            month: month,
            year: currentYear,
        });
    }

    try {
        await db.insert(zisLogs).values(zisData);
        console.log(`✅ Inserted ${zisData.length} ZIS logs.`);
    } catch (e) {
        console.error('❌ Error seeding ZIS logs:', e);
    }

    process.exit(0);
}

main();
