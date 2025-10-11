import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import {connectDB} from "./lib/db.js"
// Load .env explicitly from Backend root
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send("Blink Backend API is running Successfully!")
})

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
