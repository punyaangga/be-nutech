  import type { Request, Response } from "express";
  import { TransactionUsecase } from "../../../usecases/transaction/transactionusecase.js";
  import { successResponse, errorResponse } from "../../../utils/response.js";

  export class TransactionController {
    
    static async createTransaction(req: Request, res: Response) {
        try {
            const useCase = new TransactionUsecase();
            const userId = req.auth.id;
            const service_code = req.body.service_code;
            const transaction = await useCase.createTransaction(userId, service_code);
            return res.status(200).json(successResponse("Transaksi Berhasil", transaction));
        } catch (err: any) {
            return res.status(400).json(errorResponse(err.message || "Terjadi Kesalahan",null));
        }
    }
}
