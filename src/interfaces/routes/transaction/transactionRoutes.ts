import express from "express";
import { TransactionController } from "../../controller/transaction/transactionController.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/transaction", authMiddleware, TransactionController.createTransaction);
export default router;
