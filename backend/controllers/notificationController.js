const notificationModel = require("../models/notificationModel");

const getMyNotifications = async (req, res) => {
  try {
    const user_id = req.user.id;
    const notifications =
      await notificationModel.getUserNotifications(user_id);
    res.json(notifications);
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyNotifications,
};
