import express from "express";
import { UserController } from "../../controller/member_ship/userController.js";
import { registerValidator, loginValidator } from "../../validators/member_ship/userValidator.js";
import { validateRequest } from "../../../middlewares/validateRequest.js";  

const router = express.Router();

router.post("/registration", registerValidator, validateRequest, UserController.register);
router.post("/login", loginValidator, validateRequest, UserController.login);
export default router;
