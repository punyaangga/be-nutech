import express from "express";
import { BannerController } from "../../controller/information/bannerController.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/banner", authMiddleware, BannerController.getBanner);


export default router;
