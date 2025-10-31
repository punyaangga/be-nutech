import express from "express";
import { BalanceController } from "../../controller/transaction/balanceController.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/balance", authMiddleware, BalanceController.checkBalance);
export default router;
