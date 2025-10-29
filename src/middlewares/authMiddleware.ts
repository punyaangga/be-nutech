import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { errorResponse } from "../utils/response.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Ambil header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(errorResponse("Username atau password salah"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // Simpan hasil decode token ke request agar bisa dipakai controller
    (req as any).user = decoded;

    next();
  } catch (err) {
    return res.status(401).json(errorResponse("Token tidak valid atau sudah kedaluwarsa"));
  }
}
