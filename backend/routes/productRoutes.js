const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ===========================
   PUBLIC / USER (NO AUTH)
=========================== */
router.get("/", getProducts);
router.get("/:id", getProductById);

/* ===========================
   ADMIN ONLY (AUTH REQUIRED)
=========================== */
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
