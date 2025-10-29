import { body } from "express-validator";
import { UserRepository } from "../../infrastructure/repositories/userRepository.js";

const userRepo = new UserRepository();

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Parameter email tidak sesuai format")
    .bail()
    .custom(async (email) => {
      const existing = await userRepo.findByEmail(email);
      if (existing) {
        throw new Error("Email sudah terdaftar");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];
