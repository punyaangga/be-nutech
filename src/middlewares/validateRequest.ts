import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.js";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return res.status(400).json(
      errorResponse(firstError.msg || "Validasi gagal", null)
    );
  }

  next();
};
