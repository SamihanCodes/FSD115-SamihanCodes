const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

const {
  updateProfile,
  changePassword,
} = require("../controllers/userController");

// UPDATE PROFILE 
router.put(
  "/profile",
  authenticate,
  updateProfile
);

// CHANGE PASSWORD
router.put(
  "/password",
  authenticate,
  changePassword
);

module.exports = router;
