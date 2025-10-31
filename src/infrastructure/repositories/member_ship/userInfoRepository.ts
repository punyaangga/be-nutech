import { pool } from "../../../config/database.js";
import type { UserInfo } from "../../../domain/entities/member_ship/userInfoEntity.js";
export class UserInfoRepository {
  async findByUserId(userId: string) {
    const query = `SELECT u.email, ui.first_name, ui.last_name, ui.photo_profile
                   FROM user_info ui
                   JOIN users u ON u.id = ui.user_id
                   WHERE ui.user_id = $1;`;
    const values = [userId];
    const result = await pool.query(query,values);
    return result.rows[0];
  }
  async create(userInfo: UserInfo, client?: any) {
    const db = client || pool;
    const query = `
      INSERT INTO user_info (id, user_id, first_name, last_name, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      userInfo.id,
      userInfo.user_id,
      userInfo.first_name,
      userInfo.last_name,
      userInfo.created_at,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async update(userId: string, data: Partial<UserInfo>) {
    console.log("Updating profile for userId:", userId, "with data:", data);
    const query = `
    WITH updated AS (
      UPDATE user_info 
      SET 
      first_name = COALESCE($1, first_name),
      last_name = COALESCE($2, last_name),
      photo_profile = COALESCE($3, photo_profile)
      WHERE user_id = $4
      RETURNING user_id, first_name, last_name, photo_profile
    )
    SELECT 
      u.email,
      updated.first_name,
      updated.last_name,
      updated.photo_profile
      FROM updated
      JOIN "users" u ON u.id = updated.user_id;
  `;
    const values = [
      data.first_name,
      data.last_name,
      data.photo_profile,
      userId,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}