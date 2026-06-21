const express = require("express");
const { trackClick } = require("../controllers/trackController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Optional auth — logged-in users get cashback, guests still tracked
const optionalAuth = (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    token = auth.split(" ")[1];
  } else if (req.query.token) {
    token = req.query.token;
  }

  if (token) {
    const jwt = require("jsonwebtoken");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, role }
    } catch (_) {
      // invalid token — treat as guest
    }
  }
  next();
};

router.get("/:productId", optionalAuth, trackClick);

module.exports = router;
