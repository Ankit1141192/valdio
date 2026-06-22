const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["credit", "debit", "pending", "approved", "rejected"], required: true },
  amount: { type: Number, required: true },
  description: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

const withdrawSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  upiId: { type: String, default: "" },
  requestedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }
});

const walletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    balance: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
    totalWithdrawn: { type: Number, default: 0 },
    transactions: { type: [transactionSchema], default: [] },
    withdrawals: { type: [withdrawSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
