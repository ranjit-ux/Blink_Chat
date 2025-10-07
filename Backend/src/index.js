import dotenv from "dotenv";
import path from "path";

import {connectDB} from "./lib/db.js"
// Load .env explicitly from Backend root
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());


app.use("/auth", authRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
