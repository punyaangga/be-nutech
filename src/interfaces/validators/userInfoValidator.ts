import { body } from "express-validator";

export const PhotoProfileValidator = [
  body("file")
    .custom((value, { req }) => {
      const file = req.files?.file;
      if (!file) {
        throw new Error("File foto tidak ditemukan");
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes((file as any).mimetype)) {
        throw new Error("Format Image tidak sesuai");
      }

      return true;
    }),
];
