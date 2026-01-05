import { pgTable, serial, text, decimal, integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Tabel Users (Admin)
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 50 }).notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// Tabel ZIS Logs (Pemasukan & Pendistribusian)
export const zisLogs = pgTable('zis_logs', {
    id: serial('id').primaryKey(),
    type: varchar('type', { length: 20 }).notNull(), // 'pemasukan' | 'pendistribusian'
    amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
    description: text('description'),
    month: integer('month').notNull(), // 1-12
    year: integer('year').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// Tabel Proposals
export const proposals = pgTable('proposals', {
    id: serial('id').primaryKey(),
    nik: varchar('nik', { length: 16 }).notNull(),
    applicantName: varchar('applicant_name', { length: 100 }).notNull(),
    serviceUnit: varchar('service_unit', { length: 100 }), // Dinas / Masjid
    address: text('address').notNull(),
    status: varchar('status', { length: 20 }).default('processed'), // processed, approved, rejected
    fileUrl: text('file_url'),
    adminNotes: text('admin_notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
