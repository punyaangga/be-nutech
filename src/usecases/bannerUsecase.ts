import { BannerRepository } from "../infrastructure/repositories/bannerRepository.js";
import type { Banner } from "../domain/entities/bannerEntity.js";

export class BannerUseCase {
    private bannerRepository: BannerRepository;
    constructor(bannerRepository?: BannerRepository) {
        this.bannerRepository = bannerRepository ?? new BannerRepository();
    }
    async execute(){
        const banners: Banner[] = await this.bannerRepository.getAllBanner();
        return banners;
    }
}