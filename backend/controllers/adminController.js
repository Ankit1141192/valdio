const User = require("../models/User");
const Product = require("../models/Product");
const Click = require("../models/Click");
const Wallet = require("../models/Wallet");

/* ===========================
   ADMIN STATS
   GET /api/admin/stats
=========================== */
const getStats = async (req, res, next) => {
  try {
    const [totalProducts, totalUsers, totalClicks, pendingWithdrawals] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ role: "user" }),
      Click.countDocuments(),
      Wallet.aggregate([
        { $unwind: "$withdrawals" },
        { $match: { "withdrawals.status": "pending" } },
        { $count: "count" }
      ])
    ]);

    // Total cashback awarded
    const revenueAgg = await Click.aggregate([
      { $group: { _id: null, total: { $sum: "$cashbackAmount" } } }
    ]);
    const totalCashback = revenueAgg[0]?.total || 0;

    res.json({
      success: true,
      data: {
        totalProducts,
        totalUsers,
        totalClicks,
        pendingWithdrawals: pendingWithdrawals[0]?.count || 0,
        totalCashback
      }
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   GET ALL USERS (Admin)
   GET /api/admin/users
=========================== */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
    // Attach wallet balances
    const userIds = users.map((u) => u._id);
    const wallets = await Wallet.find({ userId: { $in: userIds } });
    const walletMap = {};
    wallets.forEach((w) => { walletMap[w.userId.toString()] = w.balance; });

    const data = users.map((u) => ({
      ...u.toObject(),
      walletBalance: walletMap[u._id.toString()] || 0
    }));

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   GET PENDING WITHDRAWALS (Admin)
   GET /api/admin/withdrawals
=========================== */
const getWithdrawals = async (req, res, next) => {
  try {
    const wallets = await Wallet.find({ "withdrawals.status": "pending" }).populate("userId", "name email");
    const pending = [];
    wallets.forEach((wallet) => {
      wallet.withdrawals.forEach((w) => {
        if (w.status === "pending") {
          pending.push({
            walletId: wallet._id,
            withdrawalId: w._id,
            user: wallet.userId,
            amount: w.amount,
            upiId: w.upiId,
            requestedAt: w.requestedAt
          });
        }
      });
    });
    res.json({ success: true, count: pending.length, data: pending });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   APPROVE / REJECT WITHDRAWAL (Admin)
   PUT /api/admin/withdrawals/:walletId/:withdrawalId
=========================== */
const resolveWithdrawal = async (req, res, next) => {
  try {
    const { walletId, withdrawalId } = req.params;
    const { action } = req.body; // "approve" or "reject"

    if (!["approve", "reject"].includes(action)) {
      res.status(400);
      throw new Error("Action must be 'approve' or 'reject'");
    }

    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      res.status(404);
      throw new Error("Wallet not found");
    }

    const withdrawal = wallet.withdrawals.id(withdrawalId);
    if (!withdrawal) {
      res.status(404);
      throw new Error("Withdrawal not found");
    }

    if (withdrawal.status !== "pending") {
      res.status(400);
      throw new Error("Withdrawal already resolved");
    }

    const status = action === "approve" ? "approved" : "rejected";
    withdrawal.status = status;
    withdrawal.resolvedAt = new Date();

    // If rejected — refund the balance
    if (action === "reject") {
      wallet.balance += withdrawal.amount;
      wallet.transactions.push({
        type: "credit",
        amount: withdrawal.amount,
        description: `Withdrawal of ₹${withdrawal.amount} was rejected — refunded`
      });
    } else {
      wallet.totalWithdrawn += withdrawal.amount;
      wallet.transactions.push({
        type: "approved",
        amount: withdrawal.amount,
        description: `Withdrawal of ₹${withdrawal.amount} approved`
      });
    }

    await wallet.save();
    res.json({ success: true, message: `Withdrawal ${status}`, data: wallet });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats, getAllUsers, getWithdrawals, resolveWithdrawal };
