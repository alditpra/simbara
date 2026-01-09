'use client';

import { deleteProposal, updateProposalStatus, getProposalById } from '@/actions/proposals';
import { useState, useEffect } from 'react';
import UpdateProposalModal from '@/components/UpdateProposalModal';
import { useRouter } from 'next/navigation';

type AdminProposalsClientProps = {
    proposals: any[];
}

export default function AdminProposalsClient({ proposals: initialProposals }: AdminProposalsClientProps) {
    const router = useRouter();
    const [proposals, setProposals] = useState<any[]>(initialProposals);
    const [selectedProposal, setSelectedProposal] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async (id: number) => {
        if (confirm('Yakin ingin menghapus proposal ini?')) {
            const result = await deleteProposal(id);
            if (result.success) {
                setProposals(prev => prev.filter(p => p.id !== id));
            } else if (result.error) {
                alert(result.error);
            }
        }
    };

    const handleOpenUpdateModal = async (id: number) => {
        const proposal = await getProposalById(id);
        if (proposal) {
            setSelectedProposal(proposal);
            setIsModalOpen(true);
        } else {
            alert('Proposal tidak ditemukan');
        }
    };

    const handleSaveUpdate = async (id: number, status: string, notes: string) => {
        const result = await updateProposalStatus(id, status, notes);
        if (result.success) {
            setProposals(prev => prev.map(p => p.id === id ? { ...p, status, adminNotes: notes } : p));
            setIsModalOpen(false);
            router.refresh();
        } else if (result.error) {
            alert('Gagal update proposal: ' + result.error);
        }
    };

    const refreshProposals = async () => {
        try {
            const response = await fetch('/admin/proposals?refresh=' + Date.now());
            if (!response.ok) {
                router.refresh();
                return;
            }
            const data = await response.json();
            if (data.props) {
                setProposals(data.props);
            } else {
                router.refresh();
            }
        } catch (error) {
            console.error('Failed to refresh proposals:', error);
            router.refresh();
        }
    };
    return (
        <div className="w-full max-w-6xl p-5 md:p-10">
            <h1 className="text-2xl font-black mb-8 text-black uppercase">DAFTAR PROPOSAL</h1>

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
                        {proposals.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-5 text-center text-gray-500 font-bold italic">Belum ada proposal masuk</td>
                            </tr>
                        ) : (
                            proposals.map((p, index) => (
                                <tr key={p.id}>
                                    <td className="p-3 border border-[#aabce0] text-center font-medium text-gray-800">{index + 1}</td>
                                    <td className="p-3 border border-[#aabce0] text-center font-medium text-gray-800 uppercase">{p.applicantName}</td>
                                    <td className="p-3 border border-[#aabce0] text-center font-medium text-gray-800">{p.nik}</td>
                                    <td className="p-3 border border-[#aabce0] text-center">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() => handleOpenUpdateModal(p.id)}
                                                className="text-blue-700 font-extrabold text-xs uppercase hover:underline"
                                            >
                                                UPDATE
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="text-blue-700 font-extrabold text-xs uppercase hover:underline"
                                            >
                                                HAPUS
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <UpdateProposalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                proposal={selectedProposal}
                onSave={handleSaveUpdate}
            />
        </div>
    );
}
