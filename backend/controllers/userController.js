const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// UPDATE PROFILE (NAME + EMAIL)
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Name and email are required" });
    }

    const updatedUser = await userModel.updateUserProfile(
      userId,
      name,
      email
    );

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both passwords required" });
    }

    const user = await userModel.findUserById(userId);

    const fullUser = await userModel.findUserByEmail(user.email);

    const isMatch = await bcrypt.compare(
      oldPassword,
      fullUser.password
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Old password incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await userModel.updateUserPassword(userId, hashed);

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateProfile,
  changePassword,
};
