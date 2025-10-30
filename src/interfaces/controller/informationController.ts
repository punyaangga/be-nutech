  import type { Request, Response } from "express";
  import { BannerUseCase } from "../../usecases/bannerUsecase.js";
  import { successResponse, errorResponse } from "../../utils/response.js";

  export class InformationController {
    static async getBanners(req: Request, res: Response) {
      try {
        const useCase = new BannerUseCase();
        const banners = await useCase.execute();
        return res.status(200).json(successResponse("Banners retrieved successfully", banners));
      } catch (err: any) {
        return res.status(400).json(errorResponse(err.message || "Failed to retrieve banners"));
      }
    }
  }
