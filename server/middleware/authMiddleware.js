import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      res.json({ success: false, message: "Not authenticated" });
    } else {
      const user = await User.findById(userId);
      req.user = user; // attach user to request
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
