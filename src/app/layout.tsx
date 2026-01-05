import type { Metadata } from 'next';
import { Orbitron, Roboto } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
    weight: ['600', '800'],
});

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
    title: 'SIMBARA - BAZNAS Kabupaten Banjarnegara',
    description: 'Sistem Informasi Manajemen Baznas Kabupaten Banjarnegara',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={`${orbitron.variable} ${roboto.variable} antialiased bg-white text-black font-roboto`}>
                {children}
            </body>
        </html>
    );
}
