'use client';

import { createProposal } from '@/actions/proposals';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProposalForm() {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError('');
        setSuccess(false);

        const formData = new FormData(event.currentTarget);
        console.log('Submitting proposal form...');
        console.log('NIK:', formData.get('nik'));
        console.log('Name:', formData.get('name'));
        console.log('Address:', formData.get('address'));
        console.log('File:', (formData.get('file') as File)?.name);

        try {
            const result = await createProposal(formData);
            console.log('Server action result:', result);

            if (result?.success && result.redirect) {
                console.log('Redirecting to:', result.redirect);
                setSuccess(true);
                setTimeout(() => {
                    router.push(result.redirect);
                }, 500);
            } else if (result?.error) {
                console.error('Server action error:', result.error);
                setError(result.error);
                setIsPending(false);
            } else {
                console.error('Unexpected result from server action:', result);
                setError('Terjadi kesalahan tak terduga');
                setIsPending(false);
            }
        } catch (err) {
            console.error('Submission error:', err);
            if (err instanceof Error) {
                console.error('Error name:', err.name);
                console.error('Error message:', err.message);
            }
            setError('Terjadi kesalahan saat menyimpan proposal');
            setIsPending(false);
        }
    }

    return (
        <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black mb-8 text-black">TAMBAH PROPOSAL</h2>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 font-bold text-sm">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-bold text-sm">Proposal berhasil ditambahkan! Mengalihkan ke daftar proposal...</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">NAMA PEMOHON</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full max-w-md p-3 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 outline-none focus:border-[#4a90e2] transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">ALAMAT</label>
                    <input
                        type="text"
                        name="address"
                        required
                        className="w-full max-w-md p-3 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 outline-none focus:border-[#4a90e2] transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">NIK PEMOHON</label>
                    <input
                        type="text"
                        name="nik"
                        required
                        className="w-full max-w-md p-3 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 outline-none focus:border-[#4a90e2] transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">UPLOAD PROPOSAL (PDF/DOC)</label>
                    <input
                        type="file"
                        name="file"
                        accept=".pdf,.doc,.docx"
                        className="w-full max-w-md p-2 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 bg-white cursor-pointer"
                    />
                    <span className="text-xs text-gray-500 font-medium">Maksimal 4MB. Format: PDF, DOC, DOCX</span>
                </div>

                <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-[#4a90e2] text-white px-6 py-2.5 rounded font-bold text-sm hover:bg-[#357ebd] shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Menyimpan...' : 'Simpan'}
                    </button>
                    <Link href="/admin/proposals">
                        <button
                            type="button"
                            className="bg-[#e0e0e0] text-[#333] px-6 py-2.5 rounded font-bold text-sm border border-[#ccc] hover:bg-[#d4d4d4] transition-colors"
                        >
                            Tutup
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
