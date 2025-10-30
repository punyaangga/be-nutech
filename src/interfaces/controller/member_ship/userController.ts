  import type { Request, Response } from "express";
  import { UserUsecase } from "../../../usecases/member_ship/userUsecase.js";
  import { LoginUserUseCase } from "../../../usecases/member_ship/loginUsecase.js";
  import { successResponse, errorResponse } from "../../../utils/response.js";

  export class UserController {
    static async register(req: Request, res: Response) {
      try {
        const useCase = new UserUsecase();
        const createdUser = await useCase.register(
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

    
  }
