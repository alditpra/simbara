'use client';

import { createProposal } from '@/actions/proposals';
import Link from 'next/link';

export default function AddProposalForm() {
    return (
        <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black mb-8 text-black">TAMBAH PROPOSAL</h2>

            <form action={createProposal} className="flex flex-col gap-6">
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

                {/* Input File Tambahan (Untuk PDF) */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">UPLOAD PROPOSAL (PDF/DOC)</label>
                    <input
                        type="file"
                        name="file"
                        accept=".pdf,.doc,.docx"
                        className="w-full max-w-md p-2 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 bg-white cursor-pointer"
                    />
                    <span className="text-xs text-red-500 font-bold">* Maksimal 4MB</span>
                </div>

                <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100">
                    <button
                        type="submit"
                        className="bg-[#4a90e2] text-white px-6 py-2.5 rounded font-bold text-sm hover:bg-[#357ebd] shadow transition-colors"
                    >
                        Simpan
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
