import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger.js";
import userRoutes from "./interfaces/routes/member_ship/userRoutes.js";
import userInfoRoutes from "./interfaces/routes/member_ship/userInfoRoutes.js";
import bannerRoutes from "./interfaces/routes/information/bannerRoutes.js";
import balanceRoutes from "./interfaces/routes/transaction/balanceRoutes.js";
import transactionRoutes from "./interfaces/routes/transaction/transactionRoutes.js";
import ppobRoutes from "./interfaces/routes/information/ppobRoutes.js";
import fileUpload from "express-fileupload";
import { userInfo } from "os";

dotenv.config();

const app = express();

setupSwagger(app);
app.use(express.json());
app.use(fileUpload());

app.use("/", userRoutes, userInfoRoutes, bannerRoutes, ppobRoutes, balanceRoutes, transactionRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
