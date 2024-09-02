import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("Server is Running...");
});
