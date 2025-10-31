import { BalanceRepository } from "../../infrastructure/repositories/transaction/balanceRepository.js";
import { TransactionRepository } from "../../infrastructure/repositories/transaction/transactionRepository.js";
import { PpobRepository } from  "../../infrastructure/repositories/information/ppobRepository.js";
import { v4 as uuidv4 } from "uuid";
import type { Transaction } from "../../domain/entities/transaction/transactionEntity.js";
import { pool } from "../../config/database.js";
import e from "express";
import { errorResponse } from "../../utils/response.js";
import { error } from "console";

export class TransactionUsecase {
    private balanceRepository: BalanceRepository;
    private transactionRepository: TransactionRepository;
    private ppobRepository: PpobRepository;

    constructor(balanceRepository?: BalanceRepository, transactionRepository?: TransactionRepository, ppobRepository?: PpobRepository) {
        this.balanceRepository = balanceRepository ?? new BalanceRepository();
        this.transactionRepository = transactionRepository ?? new TransactionRepository();
        this.ppobRepository = ppobRepository ?? new PpobRepository();
    }
    async checkBalance(userId: string){
        const balance = await this.balanceRepository.checkBalance(userId);
        const balanceResponse = {
            balance: balance.user_balance,
        }
        return balanceResponse;
    }

    async createTransaction(userId: string, service_code: string) {
        const existingBalance = await this.balanceRepository.checkBalance(userId);
        const ppobData = await this.ppobRepository.getPpobByCode(service_code);
        const now = new Date();
        if(existingBalance.user_balance < ppobData.service_tarif){
            throw new Error("Saldo Tidak Mencukupi");
        }else{
            try {
                await pool.query('BEGIN');
                const newBalance = existingBalance.user_balance - ppobData.service_tarif;
                await this.balanceRepository.updateBalance(userId, newBalance);
                const transaction_number = `INV-${now.getTime()}`;
                const dataTransaction: Transaction = {
                    id: uuidv4(),
                    user_id: userId,
                    amount: ppobData.service_tarif,
                    ppob_id: ppobData.id,
                    transaction_type: 'PAYMENT',
                    transaction_number:transaction_number,
                    created_at:new Date,
                };
                const transaction = await this.transactionRepository.insertTransaction(userId, dataTransaction);
                const detailTransaction = await this.transactionRepository.detailTransaction(dataTransaction.id);
                await pool.query('COMMIT');    
                
                return { 
                    invoice_number: transaction.transaction_number,
                    service_code : ppobData.service_code,
                    service_name : ppobData.service_name,
                    transaction_type : transaction.transaction_type,
                    total_amount : transaction.amount,
                    created_on : transaction.created_at,
                };
            } catch (error) {
                await pool.query('ROLLBACK');
                throw new Error ("Terjadi kesalahan saat memproses transaksi");
            }
        }
        
    }

    async getTransactionHistory(userId: string, offset: number, limit: number) {
        const { transactions, total } = await this.transactionRepository.getTransactionHistory(userId, offset, limit);
        return {
            offset,
            limit,
            records: transactions.map(tx => ({
            invoice_number: tx.transaction_number,
            transaction_type: tx.transaction_type,
            description: tx.description,
            total_amount: tx.amount,
            created_on: tx.created_at,
            })),
        };
    }

                
}