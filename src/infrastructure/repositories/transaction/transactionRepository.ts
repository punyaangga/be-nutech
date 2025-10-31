import { pool } from "../../../config/database.js";

export class TransactionRepository {
    
    async insertTransaction(userId: string, transactionData: any) {
        const query = `
           INSERT INTO transaction (id,user_id, amount, ppob_id, transaction_type, transaction_number, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *;
       `;
       const values = [transactionData.id, userId, transactionData.amount, transactionData.ppob_id ?? null, transactionData.transaction_type, transactionData.transaction_number, transactionData.created_at];
       const result = await pool.query(query, values);
       return result.rows[0];
    }

    async detailTransaction(transactionId:string){
        const query = ` select * from transaction as a left join ppob as b ON a.ppob_id = b.id where a.id=$1`;
        const values = [transactionId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getTransactionHistory(userId: string, offset: number, limit: number) {
        const query = `SELECT * FROM transaction as a left join ppob as b ON a.ppob_id = b.id where a.user_id=$1;`;
        const values = [userId];
        const result = await pool.query(query, values);
        const transactions = result.rows.slice(offset, offset + limit);
        const total = result.rows.length;
        return { transactions, total };
    }

    
}
