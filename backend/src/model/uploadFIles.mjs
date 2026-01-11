import { pool } from '../config/db.mjs';

class UploadFile {
  constructor(data) {
    this.uploadId = data.registration_id;
    this.userId = data.user_id;
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.category = data.category;
    this.language = data.language;
    this.year = data.year;
    this.documentType = data.document_type;
    this.bookFile = data.book_file;
    this.coverFile = data.cover_file;
    this.createdAt = data.created_at;
    this.isBook = data.isBook;
  }

  // ------------------ CREATE ------------------
  static async create({
    user_id,
    registration_id,
    title,
    author,
    description,
    category,
    language,
    year,
    documentType,
    bookFile,
    coverFile,
    isBook
  }) {
    const query = `
      INSERT INTO uploads 
        (user_id, upload_id, title, author, description, category, language, year, document_type, book_file, cover_file, is_a_book)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      user_id,
      registration_id,
      title,
      author,
      description || null,
      category ,
      language ,
      year || null,
      documentType || null,
      bookFile ,
      coverFile || null,
      isBook || 0
    ];

    const res = await pool.query(query, values);
    return new UploadFile(res.rows[0]);
  }

  // ------------------ FIND ONE ------------------
  static async findById(uploadId) {
    const res = await pool.query(
      `SELECT * FROM uploads WHERE upload_id = $1 LIMIT 1`,
      [uploadId]
    );
    if (!res.rows.length) return null;
    return new UploadFile(res.rows[0]);
  }

  static async findByUser(userId) {
    const res = await pool.query(
      `SELECT * FROM uploads WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return res.rows.map(r => new UploadFile(r));
  }

  // ------------------ LIST ------------------
  static async findAll({ skip = 0, limit = 20 } = {}) {
    const res = await pool.query(
      `SELECT * FROM uploads ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, skip]
    );
    return res.rows.map(r => new UploadFile(r));
  }

  // ------------------ DELETE ------------------
  async deleteOne() {
    await pool.query(`DELETE FROM uploads WHERE upload_id = $1`, [
      this.uploadId
    ]);
  }

  // ------------------ SAFE JSON ------------------
  toJSON() {
    return {
      uploadId: this.uploadId,
      userId: this.userId,
      title: this.title,
      author: this.author,
      description: this.description,
      category: this.category,
      language: this.language,
      year: this.year,
      documentType: this.documentType,
      bookFile: this.bookFile,
      coverFile: this.coverFile,
      createdAt: this.createdAt
    };
  }
}

export default UploadFile;
