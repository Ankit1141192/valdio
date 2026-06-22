const Wallet = require("../models/Wallet");

/* ===========================
   GET MY WALLET
   GET /api/wallet
=========================== */
const getMyWallet = async (req, res, next) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user.id });
    }
    res.json({ success: true, data: wallet });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   REQUEST WITHDRAWAL
   POST /api/wallet/withdraw
=========================== */
const requestWithdrawal = async (req, res, next) => {
  try {
    const { amount, upiId } = req.body;

    if (!amount || amount < 100) {
      res.status(400);
      throw new Error("Minimum withdrawal amount is ₹100");
    }

    let wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) {
      res.status(404);
      throw new Error("Wallet not found");
    }

    if (wallet.balance < amount) {
      res.status(400);
      throw new Error("Insufficient wallet balance");
    }

    // Deduct from balance + add pending withdrawal
    wallet.balance -= amount;
    wallet.withdrawals.push({ amount, upiId, status: "pending" });
    wallet.transactions.push({
      type: "pending",
      amount,
      description: `Withdrawal request of ₹${amount} to UPI: ${upiId}`
    });

    await wallet.save();
    res.json({ success: true, message: "Withdrawal request submitted", data: wallet });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   GET TRANSACTION HISTORY
   GET /api/wallet/transactions
=========================== */
const getTransactions = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) {
      return res.json({ success: true, data: [] });
    }
    res.json({ success: true, data: wallet.transactions.reverse() });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyWallet, requestWithdrawal, getTransactions };
