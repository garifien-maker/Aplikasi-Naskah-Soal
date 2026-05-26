import { sql } from './db.js';

export default async function handler(req, res) {
  // Mengizinkan CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const exams = await sql`
      SELECT id, title, subject, grade, phase, class_level, question_count, teacher_name, created_at
      FROM generated_exams
      ORDER BY created_at DESC
      LIMIT 50
    `;

    return res.status(200).json({
      success: true,
      data: exams
    });
  } catch (error) {
    console.error('Error fetching exams from Neon DB:', error);
    return res.status(500).json({
      success: false,
      error: 'Gagal mengambil data dari database Neon',
      details: error.message
    });
  }
}
