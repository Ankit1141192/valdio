const express = require("express");
const { getMyWallet, requestWithdrawal, getTransactions } = require("../controllers/walletController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getMyWallet);
router.get("/transactions", protect, getTransactions);
router.post("/withdraw", protect, requestWithdrawal);

module.exports = router;
