import express from "express";
import { getCart, createCart } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createCart);
router.get("/", getCart);

export default router;
