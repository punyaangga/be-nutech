// src/interfaces/routes/userRoutes.ts
import express from "express";
import { UserController } from "../controller/userController.js";
import { registerValidator } from "../validators/userValidator.js";
import { validateRequest } from "../../middlewares/validateRequest.js";  

const router = express.Router();

router.post("/register", registerValidator, validateRequest, UserController.register);

export default router;
