const userModel = require("../model/user");
const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const blacklistModel = require("../model/blacklist");

module.exports.registerUser = async (req, res, next) => {
  // error handling for express-validator is done in middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  //convert password to hashed password
  const hashedPassword = await userModel.hashPassword(password);

  // create a new user in database
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  // generate auth token which contains user id
  const token = user.generateAuthToken();

  res.status(201).json({ user, token });
};

module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;

  // find user by email
  const user = await userModel.findOne({ email }).select("+password");

  // check if user exists
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  // compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // generate auth token
  const token = user.generateAuthToken();

  res.cookies("token", token)

  res.status(200).json({ user, token });
}

module.exports.getUserProfile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ user });
}

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  // get token from header or cookie
  const token = req.headers.authorization.split(" ")[1] || req.cookies.token;

  // add token to blacklist
  await blacklistModel.create({ token });

  res.status(200).json({ message: "User logged out successfully" });
}