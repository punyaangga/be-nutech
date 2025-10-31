  import type { Request, Response } from "express";
  import { BalanceUsecase } from "../../../usecases/transaction/balanceUsecase.js";
  import { successResponse, errorResponse } from "../../../utils/response.js";

  export class BalanceController {
    static async checkBalance(req: Request, res: Response) {
      try {
        const useCase = new BalanceUsecase();
        const balance = await useCase.checkBalance(req.params.userId);
        if (!balance) {
          return res.status(404).json(errorResponse("Kamu belum pernah melakukan top up",null));
        }
        return res.status(200).json(successResponse("Success", balance));
      } catch (err: any) {
        return res.status(400).json(errorResponse(err.message || "Terjadi Kesalahan",null));
      }
    }
  }
