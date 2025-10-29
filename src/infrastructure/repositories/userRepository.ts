import { pool } from "../../config/database.js";
import type { User } from "../../domain/entities/userEntity.js";
export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query("SELECT id, email, password, created_at FROM users WHERE email = $1", [email]);
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
