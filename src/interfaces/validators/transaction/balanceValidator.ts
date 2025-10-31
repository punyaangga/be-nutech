import { body } from "express-validator";

export const topUpBalanceValidator = [
  body("top_up_amount")
    .isNumeric()
    .withMessage("Saldo harus berupa angka")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Saldo harus lebih besar dari 0");
      }
      return true;
    }),
];
  