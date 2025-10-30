import express from "express";
import { InformationController } from "../controller/informationController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/banner", authMiddleware, InformationController.getBanner);


export default router;
