import { UserInfoRepository } from "../../infrastructure/repositories/member_ship/userInfoRepository.js";
import type { UserInfo } from "../../domain/entities/member_ship/userInfoEntity.js";

export class UserInfoUsecase {
    private userInfoRepo: UserInfoRepository;

    constructor(userInfoRepo?: UserInfoRepository) {
        this.userInfoRepo = userInfoRepo ?? new UserInfoRepository();
    }
    async getUserInfo(userId: string) {
        const userInfo =  await this.userInfoRepo.findByUserId(userId);
        return userInfo;
    }
    async updateUserInfo(userId: string, data: Partial<UserInfo>) {

        const updatedProfile = await this.userInfoRepo.update(userId, data);
        const dataResponse = {
            email: updatedProfile?.email,
            first_name: updatedProfile?.first_name,
            last_name: updatedProfile?.last_name,
            profile_image: updatedProfile?.photo_profile,
        };
        return dataResponse;
    }

    async updateUserPhotoProfile(userId: string, file: any) {
         const ext = (file as any).name.split('.').pop();
                const baseName = (file as any).name.split('/').pop()?.split('.')[0];
                const timestamp = Date.now(); 
                const imageName = `${baseName}_${timestamp}.${ext}`;
                const uploadPath = `public/uploads/${imageName}`;
                await (file as any).mv(uploadPath);
        
                const imageUrl = `/uploads/${imageName}`;

        const updatedProfile = await this.userInfoRepo.update(userId, { photo_profile: imageUrl });
        const dataResponse = {
            email: updatedProfile?.email,
            first_name: updatedProfile?.first_name,
            last_name: updatedProfile?.last_name,
            profile_image: updatedProfile?.photo_profile,
        };
        return dataResponse;
    }
}