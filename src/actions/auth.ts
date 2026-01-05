'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { createSession, deleteSession, verifyPassword } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return { error: 'Username dan Password wajib diisi' };
    }

    try {
        const user = await db.select().from(users).where(eq(users.username, username)).limit(1);

        if (user.length === 0) {
            return { error: 'Username tidak ditemukan' };
        }

        const isValid = verifyPassword(password, user[0].password);

        if (!isValid) {
            return { error: 'Password salah' };
        }

        // Login sukses, buat session
        await createSession(user[0].id.toString());

    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Terjadi kesalahan server' };
    }

    // Redirect di luar try-catch karena redirect melempar error
    redirect('/admin/dashboard');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
