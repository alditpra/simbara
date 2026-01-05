'use client';

import { Lock, User } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header Judul */}
            <div className="p-5 bg-white w-full border-b border-gray-200">
                <h1 className="text-2xl font-black text-black uppercase">
                    LOGIN ADMIN SIMBARA
                </h1>
            </div>

            <div className="flex-1 bg-gradient-to-br from-[#2b4c7e] to-[#1e88e5] flex justify-center items-center p-5">

                {/* Kartu Login */}
                <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden p-10">

                    {/* Kolom Kiri (Branding) */}
                    <div className="flex-1 min-w-[300px] flex flex-col items-center justify-center text-center md:pr-5 border-b md:border-b-0 md:border-r border-transparent mb-8 md:mb-0">
                        <img
                            src="/logo-baznas.png"
                            alt="Garuda Pancasila"
                            className="w-48 h-auto mb-2.5"
                        />

                        <div className="text-[#1b5e20] font-serif font-black text-3xl mb-0.5 tracking-wider">
                            BAZNAS
                        </div>
                        <div className="font-serif text-sm text-[#333] mb-1.5">
                            Badan Amil Zakat Nasional
                        </div>
                        <div className="text-[#1b5e20] font-extrabold text-base uppercase mb-8">
                            KABUPATEN BANJARNEGARA
                        </div>

                        <div className="font-orbitron text-4xl text-[#2e4a33] tracking-[0.1em] uppercase mt-2.5 font-bold">
                            SIMBARA
                        </div>
                    </div>

                    {/* Kolom Kanan (Form) */}
                    <div className="flex-1 min-w-[300px] md:pl-10 flex flex-col justify-center">
                        <h2 className="text-center font-extrabold text-[#333] text-xl mb-8 uppercase">
                            LOGIN
                        </h2>

                        <form>
                            <div className="relative mb-4">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    required
                                    className="w-full py-3 pr-4 pl-12 bg-[#e6e6e6] border-none rounded-full text-sm outline-none text-[#555]"
                                />
                            </div>

                            <div className="relative mb-4">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    className="w-full py-3 pr-4 pl-12 bg-[#e6e6e6] border-none rounded-full text-sm outline-none text-[#555]"
                                />
                            </div>

                            <div className="flex items-center text-xs text-[#666] mb-6">
                                <input
                                    type="checkbox"
                                    id="showPass"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="mr-2"
                                />
                                <label htmlFor="showPass" className="cursor-pointer select-none">
                                    Show Password
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#5cb85c] text-white py-3 rounded-full font-extrabold text-sm uppercase tracking-wide transition-colors duration-300 hover:bg-[#4cae4c] cursor-pointer border-none"
                            >
                                LOGIN
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
