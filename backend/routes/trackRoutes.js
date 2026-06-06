const express = require("express");
const { trackClick } = require("../controllers/trackController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Optional auth — logged-in users get cashback, guests still tracked
const optionalAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    const jwt = require("jsonwebtoken");
    try {
      const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
      req.user = decoded;
    } catch (_) {
      // invalid token — treat as guest
    }
  }
  next();
};

router.get("/:productId", optionalAuth, trackClick);

module.exports = router;
