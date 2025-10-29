// src/interfaces/routes/userRoutes.ts
import express from "express";
import { UserController } from "../controller/userController.js";
import { registerValidator, loginValidator } from "../validators/userValidator.js";
import { validateRequest } from "../../middlewares/validateRequest.js";  
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/register", authMiddleware, registerValidator, validateRequest, UserController.register);
router.post("/register", registerValidator, validateRequest, UserController.register);
router.post("/login", loginValidator, validateRequest, UserController.login);

export default router;
