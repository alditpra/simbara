'use server';

import { db } from '@/db';
import { proposals } from '@/db/schema';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { eq, sql } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { saveFileLocally } from '@/lib/upload';
import { NextResponse } from 'next/server';

// Create Proposal
export async function createProposal(formData: FormData) {
    noStore();

    const nik = formData.get('nik') as string;
    const applicantName = formData.get('name') as string;
    const address = formData.get('address') as string;
    const file = formData.get('file') as File;

    if (!nik || !applicantName || !address) {
        return { success: false, error: 'Data tidak lengkap' };
    }

    let fileUrl = '';

    if (file && file.size > 0) {
        const MAX_FILE_SIZE = 4 * 1024 * 1024;

        if (file.size > MAX_FILE_SIZE) {
            return { success: false, error: 'Ukuran file maksimal 4MB' };
        }

        try {
            if (process.env.BLOB_READ_WRITE_TOKEN) {
                const blob = await put(file.name, file, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });
                fileUrl = blob.url;
            } else {
                fileUrl = await saveFileLocally(file);
            }
        } catch (err) {
            console.error("Upload failed", err);
            return { success: false, error: 'Gagal upload file' };
        }
    }

    try {
        const result = await db.insert(proposals).values({
            nik,
            applicantName,
            address,
            fileUrl,
            status: 'processed'
        }).returning();

        revalidatePath('/admin/proposals');
        return { success: true, data: result[0], redirect: '/admin/proposals' };
    } catch (error) {
        console.error("Database insert failed:", error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Gagal menyimpan proposal' };
    }
}

// Get All Proposals
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

// Get Single Proposal
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

// Update Proposal Status
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
        revalidatePath(`/admin/proposals/${id}/edit`);
        return { success: true, data: result[0] };
    } catch (error) {
        console.error('Error updating proposal:', error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Gagal update status' };
    }
}

// Delete Proposal
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
