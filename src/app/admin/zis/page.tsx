import { getZisLogs, deleteZisLog } from '@/actions/zis';
import ZisForm from './form';

export default async function TambahZisPage() {
    const logs = await getZisLogs();

    return (
        <div className="w-full max-w-4xl p-5 md:p-10">
            {/* Form Component (Client) */}
            <ZisForm />

            {/* Riwayat Table (Server) */}
            <h2 className="text-xl font-black mb-4 text-black uppercase">RIWAYAT INPUT TERBARU</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-black uppercase font-bold">
                        <tr>
                            <th className="p-3 text-center">TIPE</th>
                            <th className="p-3 text-center">BULAN/THN</th>
                            <th className="p-3 text-right">NOMINAL</th>
                            <th className="p-3 text-center">AKSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-5 text-center text-gray-500 font-bold italic">Belum ada data history</td>
                            </tr>
                        )}
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                <td className={`p-3 text-center font-bold uppercase ${log.type === 'pemasukan' ? 'text-green-600' : 'text-orange-500'}`}>
                                    {log.type}
                                </td>
                                <td className="p-3 text-center font-medium text-gray-800">
                                    {log.month}/{log.year}
                                </td>
                                <td className="p-3 text-right font-medium text-gray-800">
                                    Rp {Number(log.amount).toLocaleString('id-ID')}
                                </td>
                                <td className="p-3 text-center">
                                    <form action={async () => {
                                        'use server';
                                        await deleteZisLog(log.id);
                                    }}>
                                        <button className="text-red-500 font-bold hover:underline text-xs uppercase">HAPUS</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
