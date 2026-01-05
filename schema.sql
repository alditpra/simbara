-- Tabel untuk Admin Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk Pendistribusian & Pemasukan ZIS (Grafik)
CREATE TABLE IF NOT EXISTS zis_logs (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('pemasukan', 'pendistribusian')),
  amount DECIMAL(15, 2) NOT NULL,
  description TEXT,
  month INT NOT NULL,  -- 1-12
  year INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Proposal
CREATE TABLE IF NOT EXISTS proposals (
  id SERIAL PRIMARY KEY,
  nik VARCHAR(16) NOT NULL,
  applicant_name VARCHAR(100) NOT NULL,
  service_unit VARCHAR(100), -- Dinas / Masjid / Instansi
  address TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'processed' CHECK (status IN ('processed', 'approved', 'rejected')),
  file_url TEXT, -- Link PDF di Vercel Blob
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Admin User (Password: admin123 - Hashed dummy for now)
INSERT INTO users (username, password) 
VALUES ('admin', 'admin123') 
ON CONFLICT (username) DO NOTHING;
