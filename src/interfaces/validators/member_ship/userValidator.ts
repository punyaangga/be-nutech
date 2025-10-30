import { body } from "express-validator";
import { UserRepository } from "../../../infrastructure/repositories/member_ship/userRepository.js";
import { comparePassword } from "../../../utils/password.js";

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

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Parameter email tidak sesuai format")
    .bail()
    .custom(async (email, { req }) => {
      const user = await userRepo.findByEmail(email);
      if (!user) {
        throw new Error("Email atau password salah");
      }

      const password = req.body.password;
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        throw new Error("Email atau password salah");
      }
      req.user = user;
      return true;
    }),

];
