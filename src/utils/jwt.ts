import jwt from "jsonwebtoken";

const SECRET_KEY: jwt.Secret = process.env.JWT_SECRET_KEY || "default_secret";
const EXPIRED_TOKEN = process.env.JWT_EXPIRED_TIME || "12h";

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY tidak ditemukan di environment variable!");
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRED_TOKEN,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  try {
    return jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
  } catch (error) {
    throw new Error("Token tidak valid atau sudah kedaluwarsa");
  }
}
