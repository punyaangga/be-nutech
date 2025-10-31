import express from "express";
import { BalanceController } from "../../controller/transaction/balanceController.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";
import { topUpBalanceValidator } from "../../validators/transaction/balanceValidator.js";
import { validateRequest } from "../../../middlewares/validateRequest.js";

const router = express.Router();

router.get("/balance", authMiddleware, BalanceController.checkBalance);
router.post("/topup", authMiddleware, topUpBalanceValidator,validateRequest, BalanceController.topUpBalance);
export default router;
