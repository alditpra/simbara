'use server';

import { db } from '@/db';
import { zisLogs } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';
import { unstable_noStore as noStore } from 'next/cache';

// Action untuk Input ZIS
export async function addZisLog(formData: FormData) {
    noStore();

    const type = formData.get('type') as string;
    const amount = formData.get('amount') as string;
    const month = formData.get('month') as string;
    const year = formData.get('year') as string;
    const description = formData.get('description') as string;

    if (!type || !amount || !month || !year) {
        return { success: false, error: 'Data tidak lengkap' };
    }

    const monthMap: Record<string, number> = {
        'JANUARI': 1, 'FEBRUARI': 2, 'MARET': 3, 'APRIL': 4,
        'MEI': 5, 'JUNI': 6, 'JULI': 7, 'AGUSTUS': 8,
        'SEPTEMBER': 9, 'OKTOBER': 10, 'NOVEMBER': 11, 'DESEMBER': 12
    };

    const monthNum = monthMap[month] || 1;

    try {
        const result = await db.insert(zisLogs).values({
            type: type,
            amount: amount,
            month: monthNum,
            year: parseInt(year),
            description: description
        }).returning();

        if (result.length === 0) {
            return { success: false, error: 'Gagal menyimpan data' };
        }

        revalidatePath('/');
        revalidatePath('/admin/zis');
        return { success: true };
    } catch (error) {
        console.error('Error adding ZIS log:', error);
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
    noStore();
    try {
        const result = await db.delete(zisLogs).where(eq(zisLogs.id, id)).returning();

        if (result.length === 0) {
            return { success: false, error: 'Data tidak ditemukan' };
        }

        revalidatePath('/admin/zis');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete log:", error);
        return { success: false, error: 'Gagal menghapus data' };
    }
}
