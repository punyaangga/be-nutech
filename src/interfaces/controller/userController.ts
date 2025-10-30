  // src/interfaces/controllers/UserController.ts
  import type { Request, Response } from "express";
  import { validationResult } from "express-validator";
  import { RegisterUserUseCase } from "../../usecases/registerUsecase.js";
  import {ProfileUsecase} from"../../usecases/profileUsecase.js";
  import { LoginUserUseCase } from "../../usecases/loginUsecase.js";
  import { successResponse, errorResponse } from "../../utils/response.js";

  export class UserController {
    static async register(req: Request, res: Response) {
      try {
        const useCase = new RegisterUserUseCase();
        const createdUser = await useCase.execute(
          {
            email: req.body.email,
            password: req.body.password,
          },
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
          }
        );
        return res.status(201).json(successResponse("Registrasi berhasil", null));
      } catch (err: any) {
        return res.status(400).json(errorResponse(err.message || "Terjadi kesalahan"));
      }
    }

    static async login(req: Request, res: Response) {
      try {
        const { email, password } = req.body;
        const useCase = new LoginUserUseCase();
        const result = await useCase.execute(email, password);

        return res.status(200).json(successResponse("Login Sukses", result));
      } catch (err: any) {
        return res.status(400).json(errorResponse(err.message || "Login gagal"));
      }
    }

    static async profile(req: Request, res: Response) {
      try{
          const userInfoId = req.auth.id;
          const { first_name, last_name } = req.body;
          const updateProfileUseCase = new ProfileUsecase();
          const updatedProfile = await updateProfileUseCase.updateProfile(userInfoId, { first_name, last_name });
          if(!updatedProfile){
              return res.status(404).json(errorResponse("User not found",null));
          }
          return res.status(200).json(successResponse("Update Profile Berhasil", updatedProfile));
      } catch (err: any) {
          return res.status(400).json(errorResponse(err.message || "Failed to update profile", null));
      }
    }

    static async updateProfileImage(req: Request, res: Response) {
      try {
        const userInfoId = req.auth.id;
        const file = req.files?.file; 


        const useCase = new ProfileUsecase();
        const result = await useCase.updateProfileImage(userInfoId, file as any);

        return res.status(200).json(successResponse("Foto profil diperbarui", result));
      } catch (err: any) {
        return res.status(500).json(errorResponse(err.message || "Gagal memperbarui foto profil"));
      }
    }
  }
