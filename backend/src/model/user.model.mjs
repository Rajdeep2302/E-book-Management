import { pool } from '../config/db.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import env from '../config/env.mjs';

/**
 * User Model (SQL)
 * Adapts strict SQL Schema (Int roles) to Application Logic (String roles).
 */
class User {
  constructor(data) {
    this._id = data.id;
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
    this.department = data.department;
    this.institute = data.institute;
    this.otp = data.otp;

    // Map Integer Role from DB to String for App
    this.role = User.intRoleToString(data.role);

    this.isVerified = data.is_verified;
    this.emailVerificationToken = data.email_verification_token;
    this.emailVerificationExpiry = data.email_verification_expiry;
    this.resetPasswordToken = data.reset_password_token;
    this.resetPasswordExpiry = data.reset_password_expiry;
    this.createdAt = data.created_at;
  }

  // --- Role Helpers ---
  static stringRoleToInt(roleStr) {
    if (roleStr === 'admin') return 2;
    if (roleStr === 'teacher') return 1;
    return 0; // Default student
  }

  static intRoleToString(roleInt) {
    if (roleInt === 2) return 'admin';
    if (roleInt === 1) return 'teacher';
    return 'student';
  }

  // --- Static Methods ---

  static async findOne(criteria) {
    const keys = Object.keys(criteria);
    const values = Object.values(criteria);

    if (keys.length === 1 && typeof values[0] !== 'object') {
      const query = `SELECT * FROM users WHERE ${keys[0]} = $1 LIMIT 1`;
      const res = await pool.query(query, [values[0]]);
      if (res.rows.length > 0) return new User(res.rows[0]);
      return null;
    }

    if (criteria.resetPasswordToken && criteria.resetPasswordExpiry) {
      const query = `
         SELECT * FROM users 
         WHERE reset_password_token = $1 
         AND reset_password_expiry > NOW() 
         LIMIT 1
       `;
      const res = await pool.query(query, [criteria.resetPasswordToken]);
      if (res.rows.length > 0) return new User(res.rows[0]);
      return null;
    }

    if (criteria.emailVerificationToken && criteria.emailVerificationExpiry) {
      const query = `
          SELECT * FROM users 
          WHERE email_verification_token = $1 
          AND email_verification_expiry > NOW() 
          LIMIT 1
        `;
      const res = await pool.query(query, [criteria.emailVerificationToken]);
      if (res.rows.length > 0) return new User(res.rows[0]);
      return null;
    }

    throw new Error('Unsupported query in User.findOne (generic)');
  }

  static async findById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const res = await pool.query(query, [id]);
    if (res.rows.length > 0) return new User(res.rows[0]);
    return null;
  }

  static async create(data) {
    let password = data.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    // Convert string role to int for DB
    const roleInt = User.stringRoleToInt(data.role);

    const { name, email, isVerified, institute, department, phone } = data;

    const query = `
      INSERT INTO users (name, email, password, role, is_verified, institute, department, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      name,
      email,
      password,
      roleInt,
      isVerified || false,
      institute || "Self-Taught", // Default if missing, though DB requires NOT NULL, controller should handle
      department,
      phone
    ];

    try {
      const res = await pool.query(query, values);
      return new User(res.rows[0]);
    } catch (err) {
      if (err.code === '23505') {
        const error = new Error('Duplicate key');
        error.code = 11000;
        error.keyValue = { email: email };
        throw error;
      }
      throw err;
    }
  }

  // Helper for admin list
  static async findAll(query, skip = 0, limit = 20) {
    let whereClause = '1=1';
    let params = [];

    if (query.role) {
      const roleInt = User.stringRoleToInt(query.role);
      params.push(roleInt);
      whereClause += ` AND role = $${params.length}`;
    }

    if (query.$or) {
      const searchVal = query.$or[0].name.$regex;
      params.push(`%${searchVal}%`);
      whereClause += ` AND (name ILIKE $${params.length} OR email ILIKE $${params.length})`;
    }

    const limitIdx = params.length + 1;
    const offsetIdx = params.length + 2;

    const sql = `
        SELECT * FROM users 
        WHERE ${whereClause} 
        ORDER BY created_at DESC 
        LIMIT $${limitIdx} OFFSET $${offsetIdx}
      `;

    const res = await pool.query(sql, [...params, limit, skip]);
    return res.rows.map(row => new User(row));
  }

  static async aggregate(pipeline) {
    if (pipeline[0] && pipeline[0].$group && pipeline[0].$group._id === '$role') {
      const sql = `SELECT role, count(*) as count FROM users GROUP BY role`;
      const res = await pool.query(sql);
      // Map back to strings for frontend compatibility?
      // "students": count... logic in controller uses this.
      // If I return integer roles, I must update controller to map them.
      // Better to return mapped roles here if possible? 
      // SQL returns rows: [{role: 0, count: 5}, {role: 1, count: 2}]
      // Controller expects: stat._id === 'student'

      return res.rows.map(row => ({
        _id: User.intRoleToString(row.role),
        count: parseInt(row.count)
      }));
    }
    return [];
  }

  static async countDocuments(query) {
    let whereClause = '1=1';
    let params = [];

    if (query.role) {
      const roleInt = User.stringRoleToInt(query.role);
      params.push(roleInt);
      whereClause += ` AND role = $${params.length}`;
    }

    if (query.$or) {
      const searchVal = query.$or[0].name.$regex; // Extract search term
      params.push(`%${searchVal}%`);
      whereClause += ` AND (name ILIKE $${params.length} OR email ILIKE $${params.length})`;
    }

    const res = await pool.query(`SELECT COUNT(*) FROM users WHERE ${whereClause}`, params);
    return parseInt(res.rows[0].count);
  }


  // --- Instance Methods ---

  select(fields) { return this; } // No-op

  async matchPassword(enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
  }

  getSignedJwtToken() {
    return jwt.sign(
      { id: this.id, role: this.role }, // uses getter which returns String
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRE }
    );
  }

  getResetPasswordToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000);

    return resetToken;
  }

  getEmailVerificationToken() {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    this.emailVerificationToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');
    this.emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return verificationToken;
  }

  async save(options) {
    const query = `
        UPDATE users SET
          name = $1,
          password = $2,
          role = $3,
          is_verified = $4,
          email_verification_token = $5,
          email_verification_expiry = $6,
          reset_password_token = $7,
          reset_password_expiry = $8,
          institute = $9,
          department = $10,
          phone = $11,
          otp = $12,
          updated_at = NOW()
        WHERE id = $13
      `;

    // Check if password hashing needed (basic length check)
    let pwd = this.password;
    if (pwd && pwd.length < 50) {
      const salt = await bcrypt.genSalt(10);
      pwd = await bcrypt.hash(pwd, salt);
      this.password = pwd;
    }

    const roleInt = User.stringRoleToInt(this.role);

    const values = [
      this.name,
      pwd,
      roleInt,
      this.isVerified,
      this.emailVerificationToken,
      this.emailVerificationExpiry,
      this.resetPasswordToken,
      this.resetPasswordExpiry,
      this.institute,
      this.department,
      this.phone,
      this.otp,
      this.id
    ];

    await pool.query(query, values);
    return this;
  }

  // Convert to safe JSON object (without password)
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      phone: this.phone,
      department: this.department,
      institute: this.institute,
      isVerified: this.isVerified,
      createdAt: this.createdAt
    };
  }

  async deleteOne() {
    await pool.query('DELETE FROM users WHERE id = $1', [this.id]);
  }
}

export default User;
