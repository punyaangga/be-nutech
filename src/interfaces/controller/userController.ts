  // src/interfaces/controllers/UserController.ts
  import type { Request, Response } from "express";
  import { validationResult } from "express-validator";
  import { RegisterUserUseCase } from "../../usecases/registerUsecase.js";
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
  }
