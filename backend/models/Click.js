const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    affiliateLink: { type: String, required: true },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    cashbackAwarded: { type: Boolean, default: false },
    cashbackAmount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Click", clickSchema);
