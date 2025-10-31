import { BalanceRepository } from "../../infrastructure/repositories/transaction/balanceRepository.js";
import { v4 as uuidv4 } from "uuid";
import type { Balance } from "../../domain/entities/transaction/balanceEntity.js";

export class BalanceUsecase {
    private balanceRepository: BalanceRepository;
    constructor(balanceRepository?: BalanceRepository) {
        this.balanceRepository = balanceRepository ?? new BalanceRepository();
    }
    async checkBalance(userId: string){
        const balance = await this.balanceRepository.checkBalance(userId);
        const balanceResponse = {
            balance: balance.user_balance,
        }
        return balanceResponse;
    }
    async topUpBalance(userId: string, top_up_amount: number) {
        const existingBalance = await this.balanceRepository.checkBalance(userId);
        const balanceData: Balance = {
        id: uuidv4(),
        user_id: userId,
        user_balance: top_up_amount,
        created_at: new Date(),
      };
        if (!existingBalance) {
            const newBalance = await this.balanceRepository.insertBalance(userId, balanceData);
            return newBalance;
        }
        const totalBalance = existingBalance.user_balance + top_up_amount;
        const updatedBalance = await this.balanceRepository.updateBalance(userId, totalBalance);
        return updatedBalance;
    }
}