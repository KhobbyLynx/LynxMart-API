import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;

import productRoute from "./routes/productRoute.js";
import paymentRoute from "./routes/paymentRoute.js";

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/products", productRoute);
app.use("/api/cart", productRoute);
app.use("/api/wishlist", productRoute);
app.use("/api/paystack", paymentRoute);

app.listen(port, () => {
  connect();
  console.log(`Server running on http://localhost:${port}/api`);
});
