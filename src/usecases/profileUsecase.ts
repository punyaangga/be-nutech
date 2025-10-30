import { UserInfoRepository } from "../infrastructure/repositories/userInfoRepository.js";
import { pool } from "../config/database.js";
import type { UserInfo } from "../domain/entities/userInfoEntity.js";

export class ProfileUsecase {
    private userInfoRepo: UserInfoRepository;

    constructor(userInfoRepo?: UserInfoRepository) {
        this.userInfoRepo = userInfoRepo ?? new UserInfoRepository();
    }

    async updateProfile(userId: string, data: Partial<UserInfo>) {
        
        const updatedProfile = await this.userInfoRepo.updateProfile(userId, data);
        const dataResponse = {
            email: updatedProfile?.email,
            first_name: updatedProfile?.first_name,
            last_name: updatedProfile?.last_name,
            profile_image: updatedProfile?.photo_profile,
        };
        return dataResponse;
    }

    async updateProfileImage(userId: string, imageUrl: string) {
        const updatedProfile = await this.userInfoRepo.updateProfile(userId, { photo_profile: imageUrl });
        const dataResponse = {
            email: updatedProfile?.email,
            first_name: updatedProfile?.first_name,
            last_name: updatedProfile?.last_name,
            profile_image: updatedProfile?.photo_profile,
        };
        return dataResponse;
    }
}