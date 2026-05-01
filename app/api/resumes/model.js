import { sql } from "@/lib/db";

let initPromise;

async function ensureDb() {
  if (!initPromise) {
    initPromise = ResumeModel.initDb();
  }
  return initPromise;
}

export const ResumeModel = {
  async initDb() {
    await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
    await sql`
      CREATE TABLE IF NOT EXISTS resumes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) DEFAULT 'Untitled Resume',
        public BOOLEAN DEFAULT false,
        template VARCHAR(50) DEFAULT 'classic',
        accent_color VARCHAR(50) DEFAULT '#3b82f6',
        professional_summary TEXT DEFAULT '',
        skills JSONB DEFAULT '[]'::jsonb,
        personal_info JSONB DEFAULT '{}'::jsonb,
        experience JSONB DEFAULT '[]'::jsonb,
        project JSONB DEFAULT '[]'::jsonb,
        education JSONB DEFAULT '[]'::jsonb,
        certification JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  },

  async create(userId, title = 'Untitled Resume') {
    await ensureDb();
    const result = await sql`
      INSERT INTO resumes (user_id, title)
      VALUES (${userId}, ${title})
      RETURNING *;
    `;
    return result[0];
  },

  async findAllByUserId(userId) {
    await ensureDb();
    return await sql`
      SELECT * FROM resumes 
      WHERE user_id = ${userId} 
      ORDER BY updated_at DESC;
    `;
  },

  async findById(userId, id) {
    await ensureDb();
    const result = await sql`
      SELECT * FROM resumes 
      WHERE user_id = ${userId} AND id = ${id};
    `;
    return result[0] || null;
  },

  async findPublicById(id) {
    await ensureDb();
    const result = await sql`
      SELECT * FROM resumes 
      WHERE id = ${id} AND public = true;
    `;
    return result[0] || null;
  },

  async delete(userId, id) {
    await ensureDb();
    const result = await sql`
      DELETE FROM resumes 
      WHERE user_id = ${userId} AND id = ${id} 
      RETURNING id;
    `;
    return result[0] || null;
  },

  async update(userId, id, resumeDataCopy) {
    await ensureDb();
    const {
      title,
      public: isPublic,
      template,
      accent_color,
      professional_summary,
      skills,
      personal_info,
      experience,
      project,
      education,
      certification,
    } = resumeDataCopy;

    const result = await sql.query(
      `
      UPDATE resumes
      SET 
        title = COALESCE($1, title),
        public = COALESCE($2, public),
        template = COALESCE($3, template),
        accent_color = COALESCE($4, accent_color),
        professional_summary = COALESCE($5, professional_summary),
        skills = COALESCE($6::jsonb, skills),
        personal_info = COALESCE($7::jsonb, personal_info),
        experience = COALESCE($8::jsonb, experience),
        project = COALESCE($9::jsonb, project),
        education = COALESCE($10::jsonb, education),
        certification = COALESCE($11::jsonb, certification),
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $12 AND id = $13
      RETURNING *;
      `,
      [
        title ?? null,
        isPublic ?? null,
        template ?? null,
        accent_color ?? null,
        professional_summary ?? null,
        skills === undefined ? null : JSON.stringify(skills),
        personal_info === undefined ? null : JSON.stringify(personal_info),
        experience === undefined ? null : JSON.stringify(experience),
        project === undefined ? null : JSON.stringify(project),
        education === undefined ? null : JSON.stringify(education),
        certification === undefined ? null : JSON.stringify(certification),
        userId,
        id,
      ]
    );
    
    return result[0] || null;
  }
};
