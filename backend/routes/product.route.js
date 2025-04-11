import {
  createProduct,
  deleteProduct,
  showProduct,
  UpdateProduct,
} from "../controller/product.controller.js";
import express from "express";

const router = express.Router();

router.get("/", showProduct);

router.put("/:id", UpdateProduct);

router.post("/", createProduct);
//console.log(process.env.MONGO_URI);

router.delete("/:id", deleteProduct);

export default router;
