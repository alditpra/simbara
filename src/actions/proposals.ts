'use server';

import { db } from '@/db';
import { proposals } from '@/db/schema';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { eq, sql } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { unstable_noStore as noStore } from 'next/cache';

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

    // Handle File Upload
    if (file && file.size > 0) {
        try {
            // Coba upload ke Vercel Blob
            if (process.env.BLOB_READ_WRITE_TOKEN) {
                const blob = await put(file.name, file, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });
                fileUrl = blob.url;
            } else {
                // Fallback dev environment (Dummy URL)
                console.warn("BLOB_READ_WRITE_TOKEN not found. Using dummy URL.");
                fileUrl = `https://dummy-file-url.com/${file.name}`;
            }
        } catch (err) {
            console.error("Upload failed", err);
            return { success: false, error: 'Gagal upload file' };
        }
    }

    try {
        await db.insert(proposals).values({
            nik,
            applicantName,
            address,
            fileUrl,
            status: 'processed'
        });

        revalidatePath('/admin/proposals');
    } catch (error) {
        console.error("Database insert failed", error);
        return { success: false, error: 'Gagal menyimpan proposal' };
    }

    redirect('/admin/proposals');
}

// Get All Proposals
export async function getProposals() {
    try {
        return await db.select().from(proposals).orderBy(sql`${proposals.createdAt} DESC`);
    } catch (error) {
        return [];
    }
}

// Get Single Proposal
export async function getProposalById(id: number) {
    try {
        const res = await db.select().from(proposals).where(eq(proposals.id, id));
        return res[0];
    } catch (error) {
        return null;
    }
}

// Update Proposal Status
export async function updateProposalStatus(id: number, status: string, notes: string) {
    try {
        await db.update(proposals)
            .set({ status: status, adminNotes: notes })
            .where(eq(proposals.id, id));

        revalidatePath('/admin/proposals');
        revalidatePath(`/admin/proposals/${id}/edit`);
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Gagal update status' };
    }
}

// Delete Proposal
export async function deleteProposal(id: number) {
    try {
        await db.delete(proposals).where(eq(proposals.id, id));
        revalidatePath('/admin/proposals');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Gagal hapus proposal' };
    }
}
