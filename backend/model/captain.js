const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [3, "Last name must be at least 3 characters long"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    minLength: [5, "Email must be at least 5 characters long"],
  },

  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, "Password must be at least 6 characters long"],
  },

  socketId: {
    type: String,
  },

  // status: if he can ride or not
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  // vehicle information
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [2, "Color must be at least 2 characters long"],
    },

    plate: {
      type: String,
      required: true,
      minLength: [2, "Plate must be at least 2 characters long"],
    },

    capacity: {
      type: Number,
      required: true,
      minLength: [1, "Capacity must be at least 1 characters long"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    lat: {
      type: Number,
    },

    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

// compare the password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// hash the password
captainSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model("Captain", captainSchema);