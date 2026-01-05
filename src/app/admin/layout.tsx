'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    // Handle hydration mismatch for date
    useEffect(() => {
        setMounted(true);
        setCurrentTime(new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' }));

        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header Atas */}
            <div className="bg-white p-5 text-xl font-black uppercase text-black border-b border-[#ddd] flex items-center justify-between shrink-0">
                <span>Tampilan Menu Administrator</span>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden p-2 text-black hover:bg-gray-100 rounded transition-colors"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden relative">

                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="absolute inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
                        absolute top-0 left-0 h-full w-72 bg-[#90ee90] p-5 flex flex-col border-r border-[#ccc] overflow-y-auto z-30 transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
                        md:static md:translate-x-0
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <div className="flex justify-between items-center mb-10 pl-2.5">
                        <div className="text-3xl font-black text-black uppercase">
                            SIMBARA
                        </div>
                        {/* Close button inside sidebar for mobile convenience */}
                        <button
                            className="md:hidden text-black hover:bg-black/10 rounded-full p-1 transition-colors"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4">
                        <SidebarLink
                            href="/admin/dashboard"
                            active={pathname === '/admin/dashboard'}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            DASHBOARD
                        </SidebarLink>

                        <SidebarLink
                            href="/admin/proposals/add"
                            active={pathname === '/admin/proposals/add'}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            TAMBAH PROPOSAL
                        </SidebarLink>

                        <SidebarLink
                            href="/admin/proposals"
                            active={pathname === '/admin/proposals'}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            LIHAT PROPOSAL
                        </SidebarLink>

                        <SidebarLink
                            href="/admin/zis"
                            active={pathname === '/admin/zis'}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            TAMBAH <br /> INFO PEMASUKAN & <br /> PENDISTRIBUSIAN
                        </SidebarLink>
                    </nav>
                </aside>

                {/* Konten Utama */}
                <main className="flex-1 bg-[#f4f6f9] relative flex flex-col items-center justify-start py-10 overflow-y-auto w-full">

                    {/* Widget Tanggal */}
                    {mounted && (
                        <div className="absolute top-5 right-5 bg-[#ffcc00] py-2.5 px-5 rounded font-bold text-sm text-black shadow-sm z-10 hidden sm:block">
                            {currentTime}
                        </div>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ href, children, active, onClick }: { href: string, children: React.ReactNode, active: boolean, onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`
        border border-[#e6e600] rounded-full py-3 px-4 text-center font-bold text-sm text-black cursor-pointer shadow-sm transition-transform duration-100 flex items-center justify-center min-h-[50px]
        ${active ? 'bg-[#fff700] scale-105 shadow-md' : 'bg-[#ffff00] hover:bg-[#fff700] hover:scale-105'}
      `}
        >
            {children}
        </Link>
    );
}
