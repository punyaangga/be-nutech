import type { Request, Response } from "express";
import {UserInfoUsecase} from"../../../usecases/member_ship/userInfoUsecase.js";
import { successResponse, errorResponse } from "../../../utils/response.js";

export class UserInfoController {
    static async getUserInfo(req: Request, res: Response) {
      try {
          const userInfoId = req.auth.id;
          const usecase = new UserInfoUsecase();
          const userInfo =  await usecase.getUserInfo(userInfoId);
          return res.status(200).json(successResponse("Sukses", userInfo));
      } catch (err: any) {
          return res.status(400).json(errorResponse(err.message || "gagal", null));
      }
    }

    static async updateUserInfo(req: Request, res: Response) {
      try{
          const userInfoId = req.auth.id;
          const { first_name, last_name } = req.body;
          const usecase = new UserInfoUsecase();
          const updatedProfile = await usecase.updateUserInfo(userInfoId, { first_name, last_name });
          if(!updatedProfile){
              return res.status(404).json(errorResponse("User not found",null));
          }
          return res.status(200).json(successResponse("Update Profile Berhasil", updatedProfile));
      } catch (err: any) {
          return res.status(400).json(errorResponse(err.message || "Failed to update profile", null));
      }
    }

    static async updateUserPhotoProfile(req: Request, res: Response) {
      try {
        const userInfoId = req.auth.id;
        const file = req.files?.file;

        const useCase = new UserInfoUsecase();
        const result = await useCase.updateUserPhotoProfile(userInfoId, file as any);

        return res.status(200).json(successResponse("Foto profil diperbarui", result));
      } catch (err: any) {
        return res.status(500).json(errorResponse(err.message || "Gagal memperbarui foto profil"));
      }
    }
}