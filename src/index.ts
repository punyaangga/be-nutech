import express from "express";
import dotenv from "dotenv";
import userRoutes from "./interfaces/routes/userRoutes.js";
import informationRoutes from "./interfaces/routes/informationRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload());

app.use("/api/users", userRoutes);
app.use("/api/information", informationRoutes);

// health check
app.get("/health", (_, res) => res.send("ok"));

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
