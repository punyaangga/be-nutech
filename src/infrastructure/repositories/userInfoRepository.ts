import { pool } from "../../config/database.js";
import type { UserInfo } from "../../domain/entities/userInfoEntity.js";
export class UserInfoRepository {
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
}