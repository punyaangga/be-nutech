import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRED_TOKEN = process.env.EXPIRED_TOKEN;

if (!SECRET_KEY) {
  throw new Error("Missing JWT_SECRET in .env");
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRED_TOKEN });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, SECRET_KEY);
}
