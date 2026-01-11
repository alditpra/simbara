'use server';

import { db } from '@/db';
import { proposals } from '@/db/schema';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { eq, sql, like, or, ilike } from 'drizzle-orm';
import { unstable_noStore as noStore } from 'next/cache';
import { saveFileLocally, canUseLocalStorage } from '@/lib/upload';

export async function createProposal(formData: FormData) {
    noStore();

    console.log('=== createProposal called ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('BLOB_READ_WRITE_TOKEN:', process.env.BLOB_READ_WRITE_TOKEN ? 'SET' : 'NOT SET');

    const nik = formData.get('nik') as string;
    const applicantName = formData.get('name') as string;
    const address = formData.get('address') as string;
    const file = formData.get('file') as File;

    console.log('FormData received:');
    console.log('- NIK:', nik);
    console.log('- Name:', applicantName);
    console.log('- Address:', address);
    console.log('- File:', file?.name, file?.size);

    if (!nik || !applicantName || !address) {
        console.log('Validation failed: Data tidak lengkap');
        return { success: false, error: 'Data tidak lengkap' };
    }

    let fileUrl = '';

    if (file && file.size > 0) {
        const MAX_FILE_SIZE = 4 * 1024 * 1024;

        if (file.size > MAX_FILE_SIZE) {
            console.log('File too large:', file.size, 'Max:', MAX_FILE_SIZE);
            return { success: false, error: 'Ukuran file maksimal 4MB' };
        }

        console.log('Starting file upload...');
        try {
            if (process.env.BLOB_READ_WRITE_TOKEN) {
                console.log('Uploading to Vercel Blob:', file.name, 'Size:', file.size);
                const blob = await put(file.name, file, {
                    access: 'public',
                    token: process.env.BLOB_READ_WRITE_TOKEN,
                    addRandomSuffix: true
                });
                fileUrl = blob.url;
                console.log('Blob upload success:', fileUrl);
            } else if (canUseLocalStorage()) {
                console.log('Saving file locally:', file.name, 'Size:', file.size);
                fileUrl = await saveFileLocally(file);
                console.log('Local save success:', fileUrl);
            } else {
                console.log('No upload method available');
                return { success: false, error: 'Upload tidak tersedia di environment ini. Pastikan BLOB_READ_WRITE_TOKEN sudah di-set.' };
            }
        } catch (err) {
            console.error('Upload failed:', err);
            if (err instanceof Error) {
                console.error('Error message:', err.message);
                console.error('Error stack:', err.stack);
            }
            return { success: false, error: 'Gagal upload file: ' + (err instanceof Error ? err.message : 'Unknown error') };
        }
    }

    console.log('Inserting into database...');
    console.log('Values:', { nik, applicantName, address, fileUrl });

    try {
        const result = await db.insert(proposals).values({
            nik,
            applicantName,
            address,
            fileUrl,
            status: 'processed'
        }).returning();

        console.log('Database insert success:', result[0]);

        revalidatePath('/admin/proposals');
        revalidatePath('/admin/proposals/add');

        return {
            success: true,
            data: result[0],
            redirect: '/admin/proposals'
        };
    } catch (error) {
        console.error('Database insert failed:', error);
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            return { success: false, error: error.message };
        }
        console.error('Non-Error object:', error);
        return { success: false, error: 'Gagal menyimpan proposal' };
    }
}

export async function getProposals() {
    noStore();
    try {
        const result = await db.select().from(proposals).orderBy(sql`${proposals.createdAt} DESC`);
        return result || [];
    } catch (error) {
        console.error('Error fetching proposals:', error);
        return [];
    }
}

export async function getProposalById(id: number) {
    noStore();
    try {
        const res = await db.select().from(proposals).where(eq(proposals.id, id));
        return res?.[0] || null;
    } catch (error) {
        console.error('Error fetching proposal:', error);
        return null;
    }
}

export async function updateProposalStatus(id: number, status: string, notes: string) {
    noStore();
    try {
        const result = await db.update(proposals)
            .set({ status: status, adminNotes: notes, updatedAt: new Date() })
            .where(eq(proposals.id, id))
            .returning();

        if (result.length === 0) {
            return { success: false, error: 'Proposal tidak ditemukan' };
        }

        revalidatePath('/admin/proposals');

        return { success: true, data: result[0] };
    } catch (error) {
        console.error('Error updating proposal:', error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Gagal update status' };
    }
}

export async function deleteProposal(id: number) {
    noStore();
    try {
        const result = await db.delete(proposals).where(eq(proposals.id, id)).returning();

        if (result.length === 0) {
            return { success: false, error: 'Proposal tidak ditemukan' };
        }

        revalidatePath('/admin/proposals');

        return { success: true };
    } catch (error) {
        console.error('Error deleting proposal:', error);
        return { success: false, error: 'Gagal hapus proposal' };
    }
}

export async function searchProposals(query: string) {
    noStore();
    try {
        if (!query) {
            return await getProposals();
        }
        const result = await db.select().from(proposals).where(
            or(
                like(proposals.nik, `%${query}%`),
                ilike(proposals.applicantName, `%${query}%`)
            )
        ).orderBy(sql`${proposals.createdAt} DESC`);
        return result || [];
    } catch (error) {
        console.error('Error searching proposals:', error);
        return [];
    }
}