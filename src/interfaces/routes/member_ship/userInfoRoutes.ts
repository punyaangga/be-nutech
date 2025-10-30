import express from "express";
import {PhotoProfileValidator} from "../../validators/member_ship/userInfoValidator.js"
import { validateRequest } from "../../../middlewares/validateRequest.js";  
import { authMiddleware } from "../../../middlewares/authMiddleware.js";
import { UserInfoController } from "../../controller/member_ship/userInfoController.js";

const router = express.Router();

router.get("/profile", authMiddleware,  UserInfoController.getUserInfo);
router.put("/profile/update", authMiddleware, UserInfoController.updateUserInfo);
router.put("/photo/image", authMiddleware, PhotoProfileValidator, validateRequest, UserInfoController.updateUserPhotoProfile);
export default router;
