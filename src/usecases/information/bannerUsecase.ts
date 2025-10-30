import { BannerRepository } from "../../infrastructure/repositories/information/bannerRepository.js";
import type { Banner } from "../../domain/entities/information/bannerEntity.js";

export class BannerUseCase {
    private bannerRepository: BannerRepository;
    constructor(bannerRepository?: BannerRepository) {
        this.bannerRepository = bannerRepository ?? new BannerRepository();
    }
    async execute(){
        
        const banners = await this.bannerRepository.getAllBanner();
        
        
        return banners;
    }
}