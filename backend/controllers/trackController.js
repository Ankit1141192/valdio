const Product = require("../models/Product");
const Click = require("../models/Click");

/* ===========================
   TRACK CLICK & REDIRECT
   GET /api/track/:productId
=========================== */
const trackClick = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const affiliateLink = product.fullLink || product.shortLink;
    if (!affiliateLink) {
      res.status(400);
      throw new Error("No affiliate link configured for this product");
    }

    // Log the click
    await Click.create({
      userId: req.user ? req.user.id : null,
      productId: product._id,
      affiliateLink,
      ipAddress: req.ip || "",
      userAgent: req.headers["user-agent"] || ""
    });

    // Redirect to affiliate link
    res.redirect(affiliateLink);
  } catch (error) {
    next(error);
  }
};

module.exports = { trackClick };
