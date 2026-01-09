const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController.js");

const router = express.Router();

router.post("/", createProduct);        // Admin
router.get("/", getProducts);           // User
router.get("/:id", getProductById);     // User
router.put("/:id", updateProduct);      // Admin
router.delete("/:id", deleteProduct);   // Admin

module.exports = router;
