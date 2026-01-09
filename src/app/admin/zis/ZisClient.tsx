'use client';

import { deleteZisLog } from '@/actions/zis';
import { useState } from 'react';

type Log = {
    id: number;
    type: string;
    amount: string;
    month: number;
    year: number;
}

type ZisClientProps = {
    initialLogs: Log[];
}

export default function ZisClient({ initialLogs }: ZisClientProps) {
    const [logs, setLogs] = useState<Log[]>(initialLogs);

    const handleDelete = async (id: number) => {
        if (confirm('Yakin ingin menghapus log ini?')) {
            const result = await deleteZisLog(id);
            if (result.success) {
                setLogs(prev => prev.filter(log => log.id !== id));
            } else {
                alert('Gagal menghapus log.');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
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
                                <button onClick={() => handleDelete(log.id)} className="text-red-500 font-bold hover:underline text-xs uppercase">
                                    HAPUS
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
