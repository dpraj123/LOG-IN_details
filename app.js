import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = process.env.PORT ;
const DATABASE_URL = process.env.DATABASE_URL;

import cors from "cors";
// this for connect connectDB.js file  that in config
import connectDB from "./config/connectDB.js";
// connect routes.js file-----
import userRoutes from "./routes/routes.js";

//cors
app.use(cors());

// database connection---here we passing database url as a parameter ---that call connectDB functiion-----
connectDB(DATABASE_URL);

// json
app.use(express.json());

//load routes
app.use("/api/user", userRoutes);
// server listen on port
app.listen(port, () => {
  try {
    console.log(`server listen at http://localhost:${port}`);
  } catch (err) {
    console.log(err);
  }
});
