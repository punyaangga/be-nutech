  import type { Request, Response } from "express";
  import { PpobUseCase } from "../../../usecases/information/ppobUsecase.js";
  import { successResponse, errorResponse } from "../../../utils/response.js";

  export class PpobController {
    static async getPpob(req: Request, res: Response) {
      try {
        const useCase = new PpobUseCase();
        const ppob = await useCase.execute();
        if (ppob.length === 0) {
          return res.status(404).json(errorResponse("Data Ppob Tidak Tersedia"));
        }
        return res.status(200).json(successResponse("Success", ppob));
      } catch (err: any) {
        return res.status(400).json(errorResponse(err.message || "Terjadi Kesalahan"));
      }
    }
  }
