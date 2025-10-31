import { BalanceRepository } from "../../infrastructure/repositories/transaction/balanceRepository.js";
import { TransactionRepository } from "../../infrastructure/repositories/transaction/transactionRepository.js";
import { v4 as uuidv4 } from "uuid";
import type { Balance } from "../../domain/entities/transaction/balanceEntity.js";
import { pool } from "../../config/database.js";

export class BalanceUsecase {
    private balanceRepository: BalanceRepository;
    private transactionRepository: TransactionRepository;
    
    constructor(balanceRepository?: BalanceRepository, transactionRepository?: TransactionRepository) {
        this.balanceRepository = balanceRepository ?? new BalanceRepository();
        this.transactionRepository = transactionRepository ?? new TransactionRepository();
    }
    async checkBalance(userId: string){
        const balance = await this.balanceRepository.checkBalance(userId);
        const balanceResponse = {
            balance: balance.user_balance,
        }
        return balanceResponse;
    }
    async topUpBalance(userId: string, top_up_amount: number) {
        const client = await pool.connect();
        try{
            await client.query('BEGIN');
             const existingBalance = await this.balanceRepository.checkBalance(userId);
            const balanceData: Balance = {
                id: uuidv4(),
                user_id: userId,
                user_balance: top_up_amount,
                created_at: new Date(),
            };
            if (!existingBalance) {
                const newBalance = await this.balanceRepository.insertBalance(userId, balanceData);
                await this.transactionRepository.insertTransaction(userId, {
                    id: uuidv4(),
                    amount: top_up_amount,
                    ppob_id: null,
                    transaction_type: 'TOPUP',
                    created_at: new Date(),
                });
                return newBalance;
            }
            const totalBalance = existingBalance.user_balance + top_up_amount;
            const updatedBalance = await this.balanceRepository.updateBalance(userId, totalBalance);
            await this.transactionRepository.insertTransaction(userId, {
                id: uuidv4(),
                amount: top_up_amount,
                ppob_id: null,
                transaction_type: 'TOPUP',
                created_at: new Date(),
            });
            await client.query('COMMIT');
            return updatedBalance;
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        }
        finally {
            client.release();
        }     
       
    }
}