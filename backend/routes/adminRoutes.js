const express = require("express");
const { getStats, getAllUsers, getWithdrawals, resolveWithdrawal } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// All admin routes require protect + adminOnly
router.use(protect, adminOnly);

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.get("/withdrawals", getWithdrawals);
router.put("/withdrawals/:walletId/:withdrawalId", resolveWithdrawal);

module.exports = router;
