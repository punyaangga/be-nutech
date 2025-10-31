import { PpobRepository } from "../../infrastructure/repositories/information/ppobRepository.js";
import type { Ppob } from "../../domain/entities/information/ppobEntity.js";

export class PpobUseCase {
    private ppobRepository: PpobRepository;
    constructor(ppobRepository?: PpobRepository) {
        this.ppobRepository = ppobRepository ?? new PpobRepository();
    }
    async execute(){
        const ppobs = await this.ppobRepository.getAllPpob();
        return ppobs;
    }
}