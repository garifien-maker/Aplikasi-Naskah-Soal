// Database client helper menggunakan Neon Serverless Driver
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is missing! Hubungkan dengan Neon Console.');
}

// Membuat sql client instance
export const sql = neon(process.env.DATABASE_URL);
