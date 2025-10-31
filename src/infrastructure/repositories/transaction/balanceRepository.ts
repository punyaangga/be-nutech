import { pool } from "../../../config/database.js";

export class BalanceRepository {

    async checkBalance(userId: string){
        const query = `SELECT id, user_balance FROM balance WHERE user_id = $1;`;
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    
}
