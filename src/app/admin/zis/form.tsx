'use client';

import { addZisLog } from '@/actions/zis';
import { useRef } from 'react';

export default function ZisForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function clientAction(formData: FormData) {
        const result = await addZisLog(formData);
        if (result.success) {
            alert("Data Berhasil Disimpan!");
            formRef.current?.reset();
        } else {
            alert("Gagal menyimpan data.");
        }
    }

    return (
        <div className="bg-white p-5 md:p-10 rounded-lg shadow-sm border border-gray-100 mb-10">
            <h2 className="text-2xl font-black mb-8 text-black uppercase">
                TAMBAH INFO PEMASUKAN & PENDISTRIBUSIAN
            </h2>

            <form ref={formRef} action={clientAction} className="flex flex-col gap-6">

                {/* Jenis Data (Radio Button) */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">JENIS DATA</label>
                    <div className="flex gap-6 mt-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="type" value="pemasukan" className="w-5 h-5 accent-[#4a90e2]" defaultChecked />
                            <span className="font-bold text-gray-700 uppercase">PEMASUKAN ZIS</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="type" value="pendistribusian" className="w-5 h-5 accent-[#4a90e2]" />
                            <span className="font-bold text-gray-700 uppercase">PENDISTRIBUSIAN ZIS</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">NOMINAL (RP)</label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Contoh: 15000000"
                        required
                        className="w-full max-w-md p-3 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 outline-none focus:border-[#4a90e2] transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">BULAN & TAHUN</label>
                    <div className="flex gap-4">
                        <select name="month" className="p-3 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 outline-none bg-white">
                            <option>JANUARI</option>
                            <option>FEBRUARI</option>
                            <option>MARET</option>
                            <option>APRIL</option>
                            <option>MEI</option>
                            <option>JUNI</option>
                            <option>JULI</option>
                            <option>AGUSTUS</option>
                            <option>SEPTEMBER</option>
                            <option>OKTOBER</option>
                            <option>NOVEMBER</option>
                            <option>DESEMBER</option>
                        </select>
                        <input
                            type="number"
                            name="year"
                            defaultValue={new Date().getFullYear()}
                            required
                            className="w-24 p-3 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 outline-none focus:border-[#4a90e2] text-center"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-black uppercase">KETERANGAN (OPSIONAL)</label>
                    <textarea
                        name="description"
                        rows={3}
                        className="w-full max-w-lg p-3 border-2 border-[#ccc] rounded-lg font-bold text-gray-700 outline-none focus:border-[#4a90e2] resize-none"
                    ></textarea>
                </div>

                <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100">
                    <button
                        type="submit"
                        className="bg-[#4a90e2] text-white px-6 py-2.5 rounded font-bold text-sm hover:bg-[#357ebd] shadow transition-colors"
                    >
                        Simpan
                    </button>
                    <button
                        type="button"
                        className="bg-[#e0e0e0] text-[#333] px-6 py-2.5 rounded font-bold text-sm border border-[#ccc] hover:bg-[#d4d4d4] transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </form>
        </div>
    );
}
