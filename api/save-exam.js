import { sql } from './db.js';

export default async function handler(req, res) {
  // Mengizinkan CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  try {
    const { config, questions } = req.body;

    if (!config || !questions) {
      return res.status(400).json({ error: 'Missing config or questions data' });
    }

    const result = await sql`
      INSERT INTO generated_exams (
        title, subject, grade, phase, class_level, topics, custom_material,
        question_count, duration, teacher_name, school_name, semester, academic_year,
        questions, difficulty_dist
      ) VALUES (
        ${config.title}, ${config.subject}, ${config.grade}, ${config.phase}, ${config.classLevel},
        ${config.topics}, ${config.customMaterial || null}, ${config.questionCount}, ${config.duration},
        ${config.teacherName || null}, ${config.schoolName || null}, ${config.semester || null}, ${config.academicYear || null},
        ${JSON.stringify(questions)}, ${JSON.stringify(config.difficultyDist)}
      )
      RETURNING id, title, created_at
    `;

    return res.status(200).json({
      success: true,
      message: 'Ujian berhasil disimpan ke Neon DB!',
      data: result[0]
    });
  } catch (error) {
    console.error('Error saving exam to Neon DB:', error);
    return res.status(500).json({
      success: false,
      error: 'Gagal menyimpan ke database Neon',
      details: error.message
    });
  }
}
