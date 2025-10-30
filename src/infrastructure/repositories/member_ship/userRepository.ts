import { pool } from "../../../config/database.js";
import type { User } from "../../../domain/entities/member_ship/userEntity.js";
export class UserRepository {
  async findByEmail(email: string) {
    const query = `SELECT * FROM users WHERE email = $1 LIMIT 1;`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async create(user: User, client?: any) {
    const db = client || pool;
    const query = `
      INSERT INTO users (id, email, password, created_at)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const values = [user.id, user.email, user.password, user.created_at];
    const result = await db.query(query, values);
    return result.rows[0];
  }
  

}
