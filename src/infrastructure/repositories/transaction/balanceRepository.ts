import { pool } from "../../../config/database.js";

export class BalanceRepository {

    async checkBalance(userId: string){
        const query = `SELECT user_balance FROM balance WHERE user_id = $1;`;
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

   async insertBalance(userId: string, balanceData: any) {
    console.log("Inserting balance for userId:", userId, "with data:", balanceData);
    const query = `
           INSERT INTO balance (id,user_id, user_balance)
           VALUES ($1, $2, $3)
           RETURNING user_balance as balance;
       `;
        const values = [balanceData.id, userId, balanceData.user_balance];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async updateBalance(userId: string, amount: number) {
        const query = `
            UPDATE balance
            SET user_balance = $1
            WHERE user_id = $2
            RETURNING user_balance as balance;
        `;
        const values = [amount, userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    
}
