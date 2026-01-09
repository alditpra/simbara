# Struktur Skripsi SIMBARA
## (Sistem Informasi Monitoring Pengajuan Bantuan BAZNAS Kabupaten Banjarnegara)

---

## **BAB 1: PENDAHULUAN** ✅ (Sudah ada & disetujui)

---

## **BAB 2: TINJAUAN PUSTAKA**

### 2.1 Landasan Teori
**Teori pendek sederhana:**
- Pengertian Sistem Informasi
- Pengertian Aplikasi Berbasis Web
- Pengertian BAZNAS dan Program Bantuan
- Pengertian ZIS (Zakat, Infaq, Sedekah) - singkat saja

### 2.2 Penelitian Terdahulu
Cari 2-3 jurnal yang mirip:
- Penelitian tentang sistem informasi bantuan sosial
- Penelitian tentang sistem berbasis web untuk lembaga zakat

Format per jurnal (1 paragraf per jurnal):
```
Penelitian oleh [Nama Peneliti] mengenai [judul penelitian].
Hasil penelitian menunjukkan bahwa [hasil utama].
Perbedaan dengan penelitian ini adalah [perbedaan].
```

### 2.3 Kerangka Pemikiran
1 paragraf singkat:
```
Penelitian ini menggunakan SDLC (Software Development Life Cycle)
dengan tahapan analisis kebutuhan, perancangan, implementasi, dan pengujian.
Sistem dibangun menggunakan teknologi Next.js, PostgreSQL, dan Drizzle ORM
untuk memantau pengajuan bantuan di BAZNAS Kabupaten Banjarnegara.
```

---

## **BAB 3: METODE PENELITIAN**

### 3.1 Model Pengembangan Sistem
**SDLC (Waterfall)**

Tulis 1 paragraf:
```
Penelitian ini menggunakan metode Software Development Life Cycle (SDLC)
dengan model waterfall. Tahapan penelitian terdiri dari: (1) Analisis kebutuhan sistem,
(2) Perancangan sistem, (3) Implementasi sistem, dan (4) Pengujian sistem.
```

### 3.2 Tahapan Penelitian
```
3.2.1 Tahap Analisis Kebutuhan Sistem
   Menganalisis kebutuhan sistem berdasarkan observasi terhadap proses
   manual pengajuan bantuan di BAZNAS Kabupaten Banjarnegara.
   Kebutuhan fungsional dan non-fungsional diidentifikasi.

3.2.2 Tahap Perancangan Sistem
   Membuat desain sistem yang meliputi desain database (ERD),
   desain alur sistem (flowchart), dan desain antarmuka (mockup).

3.2.3 Tahap Implementasi Sistem
   Implementasi sistem menggunakan teknologi Next.js, PostgreSQL,
   dan Drizzle ORM sesuai dengan desain yang telah dibuat.

3.2.4 Tahap Pengujian Sistem
   Melakukan pengujian sistem menggunakan metode Black Box Testing
   untuk memastikan semua fitur berfungsi sesuai kebutuhan.
```

### 3.3 Teknik Pengumpulan Data
```
3.3.1 Studi Literatur
   Mengumpulkan data dari buku, jurnal, dan dokumentasi teknologi
   yang terkait dengan pengembangan sistem informasi berbasis web.

3.3.2 Observasi
   Melakukan observasi terhadap proses manual pengajuan bantuan
   di BAZNAS Kabupaten Banjarnegara untuk memahami alur yang sedang berjalan.
```

### 3.4 Metode Pengujian
```
Metode pengujian yang digunakan adalah Black Box Testing.
Pengujian dilakukan dengan memasukkan input ke dalam sistem dan
mengamati output yang dihasilkan. Jika output sesuai dengan yang diharapkan,
maka fitur tersebut dinyatakan berjalan dengan baik.
```

---

## **BAB 4: ANALISIS DAN PERANCANGAN SISTEM**

### 4.1 Analisis Kebutuhan Sistem
#### 4.1.1 Kebutuhan Fungsional
**Fitur-fitur yang sudah ada di projek Anda:**
```
1. Sistem Login Admin
   - Admin dapat login ke sistem
   - Admin dapat logout

2. Manajemen Proposal (Admin)
   - Admin dapat melihat daftar proposal
   - Admin dapat menambah proposal baru
   - Admin dapat mengedit proposal
   - Admin dapat menghapus proposal
   - Admin dapat mengubah status proposal (processed/approved/rejected)
   - Admin dapat menambahkan catatan (admin notes)

3. Manajemen Data ZIS (Admin)
   - Admin dapat menambah data pemasukan ZIS
   - Admin dapat menambah data pendistribusian ZIS

4. Dashboard (Admin)
   - Admin dapat melihat grafik perolehan ZIS
   - Admin dapat melihat grafik pendistribusian ZIS
   - Admin dapat melihat statistik ringkas

5. Cek Proposal (Masyarakat)
   - Masyarakat dapat memasukkan NIK untuk mencari proposal
   - Masyarakat dapat melihat status dan detail proposal

6. Informasi BAZNAS
   - Menampilkan informasi tentang BAZNAS Kabupaten Banjarnegara
```

#### 4.1.2 Kebutuhan Non-Fungsional
```
1. Keamanan: Sistem memiliki autentikasi admin
2. Performance: Sistem dapat diakses dengan cepat
3. Usability: Antarmuka yang mudah digunakan
4. Portability: Sistem berbasis web dapat diakses dari berbagai perangkat
```

### 4.2 Perancangan Sistem
#### 4.2.1 Desain Database (ERD)
**Tabel yang ada di schema.ts:**
```
Tabel users:
- id, username, password, created_at

Tabel zis_logs:
- id, type (pemasukan/pendistribusian), amount, description, month, year, created_at

Tabel proposals:
- id, nik, applicant_name, service_unit, address, status (processed/approved/rejected),
  file_url, admin_notes, created_at, updated_at
```

Buat gambar ERD sederhana (3 tabel dengan relationship).

#### 4.2.2 Flowchart Sistem
Buat flowchart sederhana:
```
1. Alur Login Admin
2. Alur Pengajuan Proposal (Masyarakat)
3. Alur Manajemen Proposal (Admin)
4. Alur Cek Proposal by NIK (Masyarakat)
```

#### 4.2.3 Desain Antarmuka
Masukkan screenshot/mockup dari projek Anda:
- Halaman Home / Landing Page
- Halaman Login Admin
- Halaman Dashboard Admin
- Halaman Manajemen Proposal
- Halaman Cek Proposal (masyarakat)

#### 4.2.4 Use Case Diagram
**Aktor:**
- Admin
- Masyarakat

**Use Cases:**
- Login
- Logout
- Kelola Proposal
- Kelola Data ZIS
- Lihat Grafik
- Cek Proposal
- Lihat Informasi BAZNAS

---

## **BAB 5: IMPLEMENTASI SISTEM**

### 5.1 Lingkungan Pengembangan
```
Hardware:
- Laptop/PC dengan spesifikasi [isi sendiri]

Software:
- OS: Linux/Windows/Mac
- Code Editor: VS Code
- Browser: Chrome/Edge

Teknologi:
- Framework: Next.js 16.1.1
- Language: TypeScript
- Database: PostgreSQL
- ORM: Drizzle ORM
- Styling: Tailwind CSS
- Chart Library: Chart.js
- UI Components: Lucide React
```

### 5.2 Implementasi Database
```
Database yang digunakan adalah PostgreSQL dengan tabel-tabel sebagai berikut:

1. Tabel users
   Menyimpan data admin yang dapat login ke sistem.

2. Tabel zis_logs
   Menyimpan data pemasukan dan pendistribusian ZIS.

3. Tabel proposals
   Menyimpan data pengajuan proposal bantuan beserta statusnya.

[Insert screenshot dari database / schema file]
```

### 5.3 Implementasi Fitur-Fitur Sistem
#### 5.3.1 Implementasi Halaman Utama (Home Page)
```
Halaman utama menampilkan informasi SIMBARA dan menu utama:
- Grafik Informasi Perolehan ZIS
- Grafik Informasi Pendistribusian ZIS
- Informasi Tentang BAZNAS Kabupaten Banjarnegara
- Tombol Cek Proposal

[Insert screenshot halaman home + penjelasan code]
```

#### 5.3.2 Implementasi Sistem Login Admin
```
[Insert screenshot halaman login + penjelasan code]
```

#### 5.3.3 Implementasi Dashboard Admin
```
[Insert screenshot dashboard + penjelasan code]
```

#### 5.3.4 Implementasi Manajemen Proposal
```
[Insert screenshot list proposal + form tambah/edit + penjelasan code]
```

#### 5.3.5 Implementasi Manajemen Data ZIS
```
[Insert screenshot form tambah data ZIS + penjelasan code]
```

#### 5.3.6 Implementasi Fitur Cek Proposal
```
Fitur ini memungkinkan masyarakat memasukkan NIK untuk mencari status proposal.
[Insert screenshot + penjelasan code]
```

#### 5.3.7 Implementasi Grafik ZIS
```
Grafik menggunakan Chart.js untuk visualisasi perolehan dan pendistribusian ZIS.
[Insert screenshot grafik + penjelasan code]
```

---

## **BAB 6: PENGUJIAN SISTEM**

### 6.1 Metode Pengujian
```
Pengujian dilakukan menggunakan metode Black Box Testing.
Pengujian fokus pada fungsionalitas sistem tanpa melihat internal code.
```

### 6.2 Hasil Pengujian

**Format Tabel Testing:**

| No | Fitur | Test Case | Input | Output Expected | Output Actual | Hasil |
|----|-------|-----------|-------|-----------------|---------------|-------|
| 1 | Login Admin | Login dengan username & password benar | admin / password123 | Masuk ke Dashboard | Masuk ke Dashboard | ✅ Pass |
| 2 | Login Admin | Login dengan password salah | admin / salah | Tampil error message | Tampil error message | ✅ Pass |
| 3 | Tambah Proposal | Input data lengkap | [isi data] | Proposal berhasil ditambah | Proposal berhasil ditambah | ✅ Pass |
| 4 | Edit Proposal | Ubah status | approved | Status berubah ke approved | Status berubah ke approved | ✅ Pass |
| 5 | Hapus Proposal | Klik tombol hapus | [klik hapus] | Proposal terhapus | Proposal terhapus | ✅ Pass |
| 6 | Cek Proposal | Input NIK | 1234567890 | Tampilkan detail proposal | Tampilkan detail proposal | ✅ Pass |
| 7 | Tambah Data ZIS | Input pemasukan | [isi data] | Data berhasil ditambah | Data berhasil ditambah | ✅ Pass |
| 8 | Lihat Grafik | Klik menu grafik | [klik] | Tampilkan grafik perolehan | Tampilkan grafik | ✅ Pass |

**Buat 10-15 test case untuk semua fitur.**

### 6.3 Pembahasan Hasil Pengujian
```
Berdasarkan hasil pengujian di atas, dari 15 test case yang dilakukan:
- 14 test case berhasil (Pass)
- 1 test case gagal (Fail) - [jelaskan kenapa fail dan bagaimana fix-nya]

Secara keseluruhan, sistem berjalan dengan baik dan memenuhi kebutuhan fungsional
yang telah ditentukan. Tingkat keberhasilan sistem adalah 93.33%.
```

### 6.4 Evaluasi Kinerja (Opsional - kalau mau lebih lengkap)
```
Pengujian kinerja dilakukan dengan mengukur:
- Waktu load halaman: 1-2 detik
- Response time: < 1 detik

[Insert data pengukuran]
```

---

## **BAB 7: PENUTUP**

### 7.1 Kesimpulan
```
Berdasarkan penelitian yang telah dilakukan, dapat disimpulkan bahwa:

1. Sistem informasi monitoring pengajuan bantuan BAZNAS Kabupaten Banjarnegara
   telah berhasil dibangun menggunakan SDLC dengan teknologi Next.js,
   PostgreSQL, dan Drizzle ORM.

2. Sistem memiliki fitur-fitur utama yaitu:
   - Sistem login admin
   - Manajemen proposal bantuan
   - Manajemen data ZIS
   - Dashboard dengan grafik
   - Fitur cek proposal untuk masyarakat

3. Berdasarkan pengujian menggunakan metode Black Box Testing,
   sistem berjalan dengan tingkat keberhasilan 93.33%.

4. Sistem membantu optimalisasi proses monitoring pengajuan bantuan
   di BAZNAS Kabupaten Banjarnegara.
```

### 7.2 Saran
```
1. Pengembangan lebih lanjut dapat menambahkan fitur notifikasi email/SMS.
2. Sistem dapat diintegrasikan dengan sistem BAZNAS nasional.
3. Dapat dilakukan pengembangan aplikasi mobile.
4. Dapat ditambahkan fitur laporan dalam format PDF/Excel.
```

### 7.3 Keterbatasan Penelitian
```
1. Sistem hanya dikembangkan untuk BAZNAS Kabupaten Banjarnegara.
2. Pengujian hanya dilakukan oleh peneliti, belum melibatkan user nyata.
3. Sistem belum terintegrasi dengan sistem BAZNAS nasional.
```

---

## **Ringkasan Struktur Paling Mudah:**

| Bab | Isi Utama | Tingkat Kesulitan |
|-----|-----------|-------------------|
| 1 | Pendahuluan (sudah ada) | ✅ Easy |
| 2 | Teori sederhana + 2-3 jurnal | ✅ Easy |
| 3 | SDLC + Black Box Testing | ✅ Easy |
| 4 | Analisis kebutuhan + Desain (ERD, Flowchart, Mockup) | ⚠️ Medium |
| 5 | Implementasi (screenshot + penjelasan code) | ✅ Easy (copy dari projek Anda) |
| 6 | Table Testing (15 test case) | ✅ Easy |
| 7 | Kesimpulan + Saran | ✅ Easy |

---

## **Dokumen yang Perlu Dibuat:**

1. **ERD Diagram** (bisa pakai Draw.io / DBeaver)
2. **Flowchart** (bisa pakai Draw.io)
3. **Use Case Diagram** (bisa pakai Draw.io)
4. **Mockup/Screenshot** (langsung dari projek Anda)
5. **Table Testing** (Excel/Word)
6. **Daftar Pustaka** (format APA/IEEE)

---

## **Teknologi yang Digunakan:**

- **Framework:** Next.js 16.1.1
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS 4
- **Charts:** Chart.js 4.5.1
- **UI Icons:** Lucide React
- **Auth:** Custom session management
- **Deployment:** Vercel (opsional)

---

## **Database Schema:**

```sql
-- Tabel Users (Admin)
users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)

-- Tabel ZIS Logs (Pemasukan & Pendistribusian)
zis_logs (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL, -- 'pemasukan' | 'pendistribusian'
  amount DECIMAL(15,2) NOT NULL,
  description TEXT,
  month INTEGER NOT NULL, -- 1-12
  year INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)

-- Tabel Proposals
proposals (
  id SERIAL PRIMARY KEY,
  nik VARCHAR(16) NOT NULL,
  applicant_name VARCHAR(100) NOT NULL,
  service_unit VARCHAR(100), -- Dinas / Masjid
  address TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'processed', -- processed, approved, rejected
  file_url TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

---

## **Total Estimasi:**

- **Bab 1:** 10-15 halaman (sudah ada)
- **Bab 2:** 15-20 halaman
- **Bab 3:** 10-15 halaman
- **Bab 4:** 20-25 halaman
- **Bab 5:** 25-30 halaman
- **Bab 6:** 10-15 halaman
- **Bab 7:** 5-10 halaman

**Total: 95-120 halaman** (standar skripsi S1 di Indonesia)

---

## **Catatan Penting:**

1. **Edit Bab-1 line 9**: Ubah "Berdasarkan hasil wawancara" menjadi "Berdasarkan observasi"
2. **Fokus Bab-4**: Buat ERD, Flowchart, dan Use Case Diagram dengan tools seperti Draw.io
3. **Bab-5**: Ambil screenshot langsung dari aplikasi yang sudah jadi
4. **Bab-6**: Buat test case sedetail mungkin untuk setiap fitur
5. **Bab-7**: Kesimpulan harus menjawab tujuan penelitian di Bab-1

---

**Dibuat untuk:** Penulisan Skripsi S1 Informatika/Teknik Informatika
**Project:** SIMBARA - Sistem Informasi Monitoring Pengajuan Bantuan BAZNAS Kabupaten Banjarnegara
**Metode:** SDLC (Waterfall) + Black Box Testing
**Tanggal:** Januari 2026
