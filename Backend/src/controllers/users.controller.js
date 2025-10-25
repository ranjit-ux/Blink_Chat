// src/controllers/users.controller.js
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    // Exclude the logged-in user
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
