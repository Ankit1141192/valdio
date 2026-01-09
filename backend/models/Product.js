const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },

    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    discountRate: { type: Number },

    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    ratingText: String,
    reviewText: String,

    shortLink: String,
    fullLink: String,

    image: { type: String, required: true },
    description: String,

    features: { type: [String], default: [] },
    colors: { type: [colorSchema], default: [] },
    customerReviews: { type: [reviewSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
