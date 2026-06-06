const Category = require("../models/Category");

/* ===========================
   GET ALL CATEGORIES (Public)
   GET /api/categories
=========================== */
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   CREATE CATEGORY (Admin)
   POST /api/categories
=========================== */
const createCategory = async (req, res, next) => {
  try {
    const { name, icon, description } = req.body;
    const category = await Category.create({ name, icon, description });
    res.status(201).json({ success: true, message: "Category created", data: category });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/* ===========================
   UPDATE CATEGORY (Admin)
   PUT /api/categories/:id
=========================== */
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json({ success: true, message: "Category updated", data: category });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   DELETE CATEGORY (Admin)
   DELETE /api/categories/:id
=========================== */
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
