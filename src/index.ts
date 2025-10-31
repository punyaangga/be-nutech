import express from "express";
import dotenv from "dotenv";
import userRoutes from "./interfaces/routes/member_ship/userRoutes.js";
import userInfoRoutes from "./interfaces/routes/member_ship/userInfoRoutes.js";
import bannerRoutes from "./interfaces/routes/information/bannerRoutes.js";
import ppobRoutes from "./interfaces/routes/information/ppobRoutes.js";
import fileUpload from "express-fileupload";
import { userInfo } from "os";

dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload());

app.use("/", userRoutes, userInfoRoutes, bannerRoutes, ppobRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
