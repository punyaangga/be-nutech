  import type { Request, Response } from "express";
  import { BannerUseCase } from "../../usecases/bannerUsecase.js";
  import { successResponse, errorResponse } from "../../utils/response.js";

  export class InformationController {
    static async getBanner(req: Request, res: Response) {
      try {
        const useCase = new BannerUseCase();
        const banner = await useCase.execute();
        if (banner.length === 0) {
          return res.status(404).json(errorResponse("Data Banner Tidak Tersedia"));
        }
        return res.status(200).json(successResponse("Success", banner));
      } catch (err: any) {
        return res.status(400).json(errorResponse(err.message || "Terjadi Kesalahan"));
      }
    }
  }
