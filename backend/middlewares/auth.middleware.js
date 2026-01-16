const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistModel = require("../model/blacklist");

// Middleware to authenticate user using JWT
module.exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  // check if token is blacklisted
  const isBlacklisted = await blacklistModel.findOne({ token });
  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Token has been revoked. Please log in again." });
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
