const express = require("express");
const router = express.Router();

const { getMyNotifications } =
  require("../controllers/notificationController");

const authenticate =
  require("../middleware/authMiddleware");

router.get(
  "/my",
  authenticate,
  getMyNotifications
);

module.exports = router;
