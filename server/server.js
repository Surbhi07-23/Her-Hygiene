import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import auth from "./middleware/auth.js";

import authRoutes from "./routes/Auth.js";
import periodRoutes from "./routes/period.js";
import storeRoutes from "./routes/storeRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/period", periodRoutes);

app.use("/api/stores", storeRoutes);

app.get("/api/protected", auth, (req, res) => {

  res.json({
    message: "Protected data",
    user: req.user
  });

});

app.get("/", (req, res) => {

  res.send("app is running");

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `server is running on port ${PORT}`
  );

});