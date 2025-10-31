import { pool } from "../../../config/database.js";

export class TransactionRepository {

    async insertTransaction(userId: string, transactionData: any) {
    const query = `
           INSERT INTO transaction (id,user_id, amount, ppob_id, transaction_type, created_at)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING *;
       `;
       const values = [transactionData.id, userId, transactionData.amount, transactionData.ppob_id ?? null, transactionData.transaction_type, transactionData.created_at];
       const result = await pool.query(query, values);
       return result.rows[0];
    }

    
}
