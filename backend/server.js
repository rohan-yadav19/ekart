import express from "express";
import dotenv from "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import cloudinary from "./utils/cloudinary.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/test-cloudinary", (req, res) => {
  console.log("Testing Cloudinary connection...");
  cloudinary.api.ping((error, result) => {
    if (error) {
      console.error("Cloudinary connection failed:", error);
      return res.status(500).json({ message: "Cloudinary connection failed" });
    }
    console.log("Cloudinary connection successful:", result);
    res.json({ message: "Cloudinary is working!" });
  });
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
