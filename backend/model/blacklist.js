const e = require("express");

const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // token will be removed after 24 hours
  },
});

module.exports = mongoose.model("Blacklist", blacklistSchema);