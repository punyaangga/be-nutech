  import type { Request, Response } from "express";
  import { BalanceUsecase } from "../../../usecases/transaction/balanceUsecase.js";
  import { successResponse, errorResponse } from "../../../utils/response.js";

  export class BalanceController {
    static async checkBalance(req: Request, res: Response) {
      try {
        const useCase = new BalanceUsecase();
        const userId = req.auth.id;
        const balance = await useCase.checkBalance(userId);
        if (!balance) {
          return res.status(404).json(errorResponse("Kamu belum pernah melakukan top up",null));
        }
        return res.status(200).json(successResponse("Success", balance));
      } catch (err: any) {
        return res.status(400).json(errorResponse(err.message || "Terjadi Kesalahan",null));
      }
    }
  static async topUpBalance(req: Request, res: Response) {
      try {
        const useCase = new BalanceUsecase();
        const topUpAmount = req.body.top_up_amount;
        const userId = req.auth.id;
        

        const updatedBalance = await useCase.topUpBalance(userId, topUpAmount);
        return res.status(200).json(successResponse("Top Up Berhasil", updatedBalance));
      } catch (err: any) {
        return res.status(400).json(errorResponse(err.message || "Terjadi Kesalahan",null));
      }
  }
}
