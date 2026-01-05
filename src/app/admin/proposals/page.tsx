'use client';

import Link from 'next/link';
import { getProposals, deleteProposal } from '@/actions/proposals';
import { useEffect, useState } from 'react';

type Proposal = {
    id: number;
    applicantName: string;
    nik: string;
    status: string | null;
}

export default function LihatProposalPage() {
    const [proposals, setProposals] = useState<Proposal[]>([]);

    useEffect(() => {
        getProposals().then(setProposals);
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Yakin ingin menghapus proposal ini?')) {
            await deleteProposal(id);
            setProposals(prev => prev.filter(p => p.id !== id));
        }
    }

    return (
        <div className="w-full max-w-6xl p-5 md:p-10">
            <h1 className="text-2xl font-black mb-8 text-black uppercase">DAFTAR PROPOSAL</h1>

            {/* Search Section */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-xl">
                <input
                    type="text"
                    placeholder="MASUKAN NO NIK"
                    className="flex-1 p-3 border-2 border-black rounded-full font-bold text-gray-600 outline-none bg-[#eef2f5] uppercase placeholder:text-gray-400"
                />
                <button className="bg-gradient-to-b from-[#aaccff] to-[#bca0e6] text-black font-extrabold px-8 py-3 rounded-full shadow hover:opacity-90 uppercase text-sm">
                    CARI PROPOSAL
                </button>
            </div>

            {/* Table Section */}
            <div className="w-full overflow-x-auto border border-[#aabce0] rounded-lg shadow-sm bg-white">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead className="bg-[#c8dcf9]">
                        <tr>
                            <th className="p-4 border border-[#aabce0] text-black font-extrabold text-sm w-16 text-center">NO</th>
                            <th className="p-4 border border-[#aabce0] text-black font-extrabold text-sm text-center">PROPOSAL</th>
                            <th className="p-4 border border-[#aabce0] text-black font-extrabold text-sm text-center">NIK PEMOHON</th>
                            <th className="p-4 border border-[#aabce0] text-black font-extrabold text-sm w-48 text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#eef4fc]">
                        {proposals.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-5 text-center text-gray-500 font-bold italic">Belum ada proposal masuk</td>
                            </tr>
                        )}
                        {proposals.map((p, index) => (
                            <tr key={p.id}>
                                <td className="p-3 border border-[#aabce0] text-center font-medium text-gray-800">{index + 1}</td>
                                <td className="p-3 border border-[#aabce0] text-center font-medium text-gray-800 uppercase">{p.applicantName}</td>
                                <td className="p-3 border border-[#aabce0] text-center font-medium text-gray-800">{p.nik}</td>
                                <td className="p-3 border border-[#aabce0] text-center">
                                    <div className="flex justify-center gap-4">
                                        <Link href={`/admin/proposals/${p.id}/edit`} className="text-blue-700 font-extrabold text-xs uppercase hover:underline">
                                            UPDATE
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="text-blue-700 font-extrabold text-xs uppercase hover:underline"
                                        >
                                            HAPUS
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
