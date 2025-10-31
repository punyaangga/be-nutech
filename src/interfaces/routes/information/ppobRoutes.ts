import express from "express";
import { PpobController } from "../../controller/information/ppobController.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/services", authMiddleware, PpobController.getPpob);


export default router;
