'use client';

import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProposalById, updateProposalStatus } from '@/actions/proposals';
import { useRouter } from 'next/navigation';

export default function UpdateProposalPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [proposal, setProposal] = useState<any>(null);
    const [status, setStatus] = useState<string>('processed');
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        getProposalById(Number(params.id)).then(data => {
            if (data) {
                setProposal(data);
                setStatus(data.status || 'processed');
                setNotes(data.adminNotes || '');
            }
        });
    }, [params.id]);

    const handleSave = async () => {
        await updateProposalStatus(Number(params.id), status, notes);
        alert('Data berhasil diupdate!');
        router.push('/admin/proposals');
    };

    if (!proposal) return <div className="p-10">Loading...</div>;

    return (
        <div className="w-full max-w-4xl p-5 md:p-10">
            <div className="bg-white p-10 rounded shadow-sm border border-gray-100">
                <h2 className="text-2xl font-black mb-8 text-black">Menu Admin Update Proposal</h2>

                {/* Informasi Proposal */}
                <div className="flex flex-col gap-4 mb-10">
                    <InfoRow label="PEMOHON" value={proposal.applicantName} />
                    <InfoRow label="ALAMAT" value={proposal.address} />
                    <InfoRow label="NIK PEMOHON" value={proposal.nik} />

                    {/* Link Download File */}
                    <div className="flex text-sm text-black font-bold">
                        <span className="w-40 uppercase">FILE PROPOSAL</span>
                        <span className="mr-2">:</span>
                        {proposal.fileUrl ? (
                            <a href={proposal.fileUrl} target="_blank" className="text-blue-600 underline uppercase">Lihat Dokumen</a>
                        ) : (
                            <span className="text-gray-500 uppercase">TIDAK ADA FILE</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-start">

                    {/* Checkbox Group */}
                    <div className="flex flex-col gap-4">
                        <CheckboxItem
                            label="Sedang di Proses"
                            checked={status === 'processed'}
                            onClick={() => setStatus('processed')}
                        />
                        <CheckboxItem
                            label="Di Setujui"
                            checked={status === 'approved'}
                            onClick={() => setStatus('approved')}
                        />
                        <CheckboxItem
                            label="Belum Di Setujui"
                            checked={status === 'rejected'}
                            onClick={() => setStatus('rejected')}
                        />
                    </div>

                    {/* Notes Box */}
                    <div className="flex-1 w-full p-4 border-2 border-black bg-white min-h-[120px]">
                        <span className="font-extrabold italic text-sm text-black block mb-2">Catatan :</span>
                        <textarea
                            className="w-full h-full border-none outline-none font-bold text-sm text-black resize-none"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Tulis catatan admin di sini..."
                        />
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        className="bg-[#4a90e2] text-white px-8 py-2.5 rounded font-medium shadow hover:bg-[#357ebd] transition-colors"
                    >
                        Simpan
                    </button>
                </div>

            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex text-sm text-black font-bold">
            <span className="w-40 uppercase">{label}</span>
            <span className="mr-2">:</span>
            <span className="uppercase">{value}</span>
        </div>
    );
}

function CheckboxItem({ label, checked, onClick }: { label: string, checked: boolean, onClick: () => void }) {
    return (
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={onClick}>
            <div className={`
        w-6 h-6 border-2 border-[#333] flex items-center justify-center bg-white transition-colors
        ${checked ? 'bg-white' : ''}
      `}>
                {checked && <Check className="w-5 h-5 text-black stroke-[3]" />}
            </div>
            <span className="font-bold text-sm text-black">{label}</span>
        </div>
    );
}
