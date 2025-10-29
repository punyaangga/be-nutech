// src/app.ts
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./interfaces/routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

// health check
app.get("/health", (_, res) => res.send("ok"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
