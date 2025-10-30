import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      auth?: JwtPayload | { id: string; email?: string } | any;
    }
  }
}

export {}; 