const captainModel = require("../model/captain");
const { validationResult } = require("express-validator");
const captainService = require("../services/captainService");

module.exports.registerCaptain = async (req, res, next) => {
  // error handling for express-validator is done in middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  // if captain is already exits
  const isCaptainAlreadyExits = await captainModel.findOne({ email });
  if (isCaptainAlreadyExits) {
    return res.status(400).json({ message: "Captain is already exits" });
  }

  //convert password to hashed password
  // const hashedPassword = await captainModel.hashPassword(password);
  const hashedPassword = await captainModel.hashPassword(password);

  // create a new user in database
  const captain = await captainService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  // generate auth token which contains user id
  const token = captain.generateAuthToken();

  res.status(201).json({ captain, token });
};
