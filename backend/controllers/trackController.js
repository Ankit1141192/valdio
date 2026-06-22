const Product = require("../models/Product");
const Click = require("../models/Click");
const Wallet = require("../models/Wallet");
const mongoose = require("mongoose");

/* ===========================
   TRACK CLICK & REDIRECT
   GET /api/track/:productId
=========================== */
const trackClick = async (req, res, next) => {
  try {
    let product = null;
    let affiliateLink = "";
    let productName = "Product";
    let productPrice = 500;

    // Check if it is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(req.params.productId)) {
      product = await Product.findById(req.params.productId);
    }

    if (product) {
      affiliateLink = product.fullLink || product.shortLink;
      productName = product.name;
      productPrice = product.discountPrice || product.price;
    } else {
      // Fallback: search in static Product.json
      try {
        const staticProducts = require("../../frontend/src/config/Product.json");
        const foundStatic = staticProducts.find(p => p.id === req.params.productId);
        if (foundStatic) {
          affiliateLink = foundStatic.fullLink || foundStatic.shortLink;
          productName = foundStatic.name;
          productPrice = foundStatic.discountPrice || foundStatic.price;
        }
      } catch (err) {
        console.error("Failed to load static product file", err);
      }
    }

    if (!affiliateLink) {
      res.status(400);
      throw new Error("No affiliate link configured for this product");
    }

    const cashbackAmount = Math.round(productPrice * 0.05); // 5% cashback

    // Log the click
    await Click.create({
      userId: req.user ? req.user.id : null,
      productId: product ? product._id : new mongoose.Types.ObjectId(),
      affiliateLink,
      ipAddress: req.ip || "",
      userAgent: req.headers["user-agent"] || "",
      cashbackAwarded: !!req.user,
      cashbackAmount: req.user ? cashbackAmount : 0
    });

    // Award cashback to user's wallet if user is logged in
    if (req.user) {
      let wallet = await Wallet.findOne({ userId: req.user.id });
      if (!wallet) {
        wallet = await Wallet.create({ userId: req.user.id });
      }
      wallet.balance += cashbackAmount;
      wallet.totalEarned += cashbackAmount;
      wallet.transactions.push({
        type: "credit",
        amount: cashbackAmount,
        description: `Cashback earned from purchasing ${productName}`
      });
      await wallet.save();
    }

    // Redirect to affiliate link
    res.redirect(affiliateLink);
  } catch (error) {
    next(error);
  }
};

module.exports = { trackClick };
