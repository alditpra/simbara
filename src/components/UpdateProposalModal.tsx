'use client';

import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type Proposal = {
    id: number;
    applicantName: string;
    address: string;
    nik: string;
    status: string | null;
    adminNotes: string | null;
    fileUrl: string | null;
}

type UpdateProposalModalProps = {
    isOpen: boolean;
    onClose: () => void;
    proposal: Proposal | null;
    onSave: (id: number, status: string, notes: string) => Promise<void>;
}

export default function UpdateProposalModal({ isOpen, onClose, proposal, onSave }: UpdateProposalModalProps) {
    const [status, setStatus] = useState<string>('processed');
    const [notes, setNotes] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (proposal) {
            setStatus(proposal.status || 'processed');
            setNotes(proposal.adminNotes || '');
        }
    }, [proposal]);

    const handleSave = async () => {
        if (!proposal) return;

        setIsLoading(true);
        try {
            await onSave(proposal.id, status, notes);
            onClose();
        } catch (error) {
            console.error('Failed to update:', error);
            alert('Gagal mengupdate proposal');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !proposal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white w-full max-w-2xl shadow-lg relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black hover:text-red-500 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-black mb-8 text-black uppercase">Menu Admin Update Proposal</h2>

                    <div className="flex flex-col gap-4 mb-10">
                        <InfoRow label="PEMOHON" value={proposal.applicantName} />
                        <InfoRow label="ALAMAT" value={proposal.address} />
                        <InfoRow label="NIK PEMOHON" value={proposal.nik} />

                        <div className="flex text-sm text-black font-bold">
                            <span className="w-40 uppercase">FILE PROPOSAL</span>
                            <span className="mr-2">:</span>
                            {proposal.fileUrl ? (
                                <a
                                    href={proposal.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline uppercase hover:text-blue-800"
                                >
                                    Lihat Dokumen
                                </a>
                            ) : (
                                <span className="text-gray-500 uppercase">TIDAK ADA FILE</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 items-start">

                        <div className="flex flex-col gap-5">
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

                        <div className="flex-1 w-full p-4 border-2 border-black bg-white min-h-[120px]">
                            <span className="font-extrabold italic text-sm text-black block mb-2">Catatan :</span>
                            <textarea
                                className="w-full h-full border-none outline-none font-bold text-sm text-black resize-none bg-transparent"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Tulis catatan admin di sini..."
                                rows={5}
                            />
                        </div>

                    </div>

                    <div className="mt-10">
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className={`
                                bg-[#4a90e2] text-white px-10 py-3 rounded font-medium shadow
                                hover:bg-[#357ebd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                                font-bold text-sm uppercase
                            `}
                        >
                            {isLoading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>

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
                w-6 h-6 border-2 border-black flex items-center justify-center bg-white transition-colors
            `}>
                {checked && <Check className="w-5 h-5 text-black stroke-[3]" />}
            </div>
            <span className="font-bold text-sm text-black uppercase">{label}</span>
        </div>
    );
}
