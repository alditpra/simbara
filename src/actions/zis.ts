'use server';

import { db } from '@/db';
import { zisLogs } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';
import { unstable_noStore as noStore } from 'next/cache';

// Action untuk Input ZIS
export async function addZisLog(formData: FormData) {
    const type = formData.get('type') as string;
    const amount = formData.get('amount') as string;
    const month = formData.get('month') as string;
    const year = formData.get('year') as string;
    const description = formData.get('description') as string;

    if (!type || !amount || !month || !year) {
        throw new Error('Data tidak lengkap');
    }

    // Konversi Nama Bulan ke Angka (Simple Map)
    const monthMap: Record<string, number> = {
        'JANUARI': 1, 'FEBRUARI': 2, 'MARET': 3, 'APRIL': 4,
        'MEI': 5, 'JUNI': 6, 'JULI': 7, 'AGUSTUS': 8,
        'SEPTEMBER': 9, 'OKTOBER': 10, 'NOVEMBER': 11, 'DESEMBER': 12
    };

    const monthNum = monthMap[month] || 1;

    try {
        await db.insert(zisLogs).values({
            type: type,
            amount: amount, // Drizzle akan handle konversi ke decimal string
            month: monthNum,
            year: parseInt(year),
            description: description
        });

        revalidatePath('/'); // Refresh halaman depan agar grafik update
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Gagal menyimpan data' };
    }
}

// Action untuk mendapatkan Log
export async function getZisLogs() {
    noStore();
    try {
        return await db.select().from(zisLogs).orderBy(desc(zisLogs.id));
    } catch (error) {
        console.error("Failed to fetch logs:", error);
        return [];
    }
}

// Action untuk Hapus Log
export async function deleteZisLog(id: number) {
    try {
        await db.delete(zisLogs).where(eq(zisLogs.id, id));
        revalidatePath('/admin/zis');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete log:", error);
        return { success: false, error: 'Gagal menghapus data' };
    }
}
