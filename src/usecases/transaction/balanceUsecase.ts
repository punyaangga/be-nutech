import { BalanceRepository } from "../../infrastructure/repositories/transaction/balanceRepository.js";
import type { Ppob } from "../../domain/entities/information/ppobEntity.js";

export class BalanceUsecase {
    private balanceRepository: BalanceRepository;
    constructor(balanceRepository?: BalanceRepository) {
        this.balanceRepository = balanceRepository ?? new BalanceRepository();
    }
    async checkBalance(userId: string){
        const balance = await this.balanceRepository.checkBalance(userId);
        return balance;
    }
}