'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header Atas */}
            <div className="bg-white p-5 text-xl font-black uppercase text-black border-b border-[#ddd]">
                Tampilan Menu Administrator
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 bg-[#90ee90] p-5 flex flex-col border-r border-[#ccc] overflow-y-auto">
                    <div className="text-3xl font-black text-black mb-10 pl-2.5 uppercase">
                        SIMBARA
                    </div>

                    <nav className="flex flex-col gap-4">
                        <SidebarLink href="/admin/dashboard" active={pathname === '/admin/dashboard'}>
                            DASHBOARD
                        </SidebarLink>

                        <SidebarLink href="/admin/proposals/add" active={pathname === '/admin/proposals/add'}>
                            TAMBAH PROPOSAL
                        </SidebarLink>

                        <SidebarLink href="/admin/proposals" active={pathname === '/admin/proposals'}>
                            LIHAT PROPOSAL
                        </SidebarLink>

                        <SidebarLink href="/admin/zis" active={pathname === '/admin/zis'}>
                            TAMBAH <br /> INFO PEMASUKAN & <br /> PENDISTRIBUSIAN
                        </SidebarLink>
                    </nav>
                </aside>

                {/* Konten Utama */}
                <main className="flex-1 bg-[#f4f6f9] relative flex flex-col items-center justify-center overflow-y-auto w-full">

                    {/* Widget Tanggal */}
                    <div className="absolute top-5 right-5 bg-[#ffcc00] py-2.5 px-5 rounded font-bold text-sm text-black shadow-sm z-10">
                        {new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' })}
                    </div>

                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ href, children, active }: { href: string, children: React.ReactNode, active: boolean }) {
    return (
        <Link
            href={href}
            className={`
        border border-[#e6e600] rounded-full py-3 px-4 text-center font-bold text-sm text-black cursor-pointer shadow-sm transition-transform duration-100 flex items-center justify-center min-h-[50px]
        ${active ? 'bg-[#fff700] scale-105 shadow-md' : 'bg-[#ffff00] hover:bg-[#fff700] hover:scale-105'}
      `}
        >
            {children}
        </Link>
    );
}
