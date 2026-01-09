import { getZisLogs } from '@/actions/zis';
import ZisForm from './form';
import ZisClient from './ZisClient';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function TambahZisPage() {
    noStore();
    const logs = await getZisLogs();

    return (
        <div className="w-full max-w-4xl p-5 md:p-10">
            <ZisForm />
            <h2 className="text-xl font-black mt-10 mb-4 text-black uppercase">RIWAYAT INPUT TERBARU</h2>
            <ZisClient initialLogs={logs} />
        </div>
    );
}
