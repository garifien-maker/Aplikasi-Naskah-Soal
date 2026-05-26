-- SQL Schema untuk Database Neon Console (PostgreSQL)
-- Jalankan query ini di SQL Editor pada dashboard Neon Console Anda.

-- 1. Buat Tabel Konfigurasi Ujian & Soal yang Dihasilkan
CREATE TABLE IF NOT EXISTS generated_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    phase VARCHAR(10) NOT NULL,
    class_level VARCHAR(50) NOT NULL,
    topics TEXT[] NOT NULL,
    custom_material TEXT,
    question_count INT NOT NULL,
    duration INT NOT NULL,
    teacher_name VARCHAR(255),
    school_name VARCHAR(255),
    semester VARCHAR(50),
    academic_year VARCHAR(50),
    questions JSONB NOT NULL,
    difficulty_dist JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Indeks untuk pencarian cepat berdasarkan mata pelajaran
CREATE INDEX IF NOT EXISTS idx_exams_subject ON generated_exams(subject);
CREATE INDEX IF NOT EXISTS idx_exams_created_at ON generated_exams(created_at DESC);
