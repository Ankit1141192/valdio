const Product = require("../models/Product.js");

/* ===========================
   CREATE PRODUCT (Admin)
   POST /api/products
=========================== */
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/* ===========================
   GET ALL PRODUCTS
   GET /api/products
=========================== */
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   GET SINGLE PRODUCT
   GET /api/products/:id
=========================== */
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   UPDATE PRODUCT (Admin)
   PUT /api/products/:id
=========================== */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   DELETE PRODUCT (Admin)
   DELETE /api/products/:id
=========================== */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
