const Product =  require("../models/Product.js");

// CREATE (Admin)
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL (User)
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// READ ONE (User)
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product
    ? res.json(product)
    : res.status(404).json({ message: "Product not found" });
};

// UPDATE (Admin)
const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE (Admin)
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

module.exports = {
  createProduct, getProducts, getProductById,
  updateProduct, deleteProduct
}
