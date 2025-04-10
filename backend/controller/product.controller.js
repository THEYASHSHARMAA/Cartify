import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const showProduct = async (req, res) => {
  try {
    const Products = await Product.find({});
    res.status(200).json({ success: true, data: Products });
  } catch (error) {
    console.error("error in fetching :", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, message: "product updated" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.image || !product.price) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newProduct = new Product(product); //send to Product function in model

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product delete" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
