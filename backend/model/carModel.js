const mongoose = require("mongoose");
const User = require("./userModel");

const carSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: String,
      enum: ["safari", "punch", "nexon", "altroz", "alto", "harrior"],
      required: true,
    },
    registration: {  // Fixed the spelling of "registration"
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "close", "pending"],
      default: "open",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Fixed the incorrect option name
  }
);

module.exports = mongoose.model("Car", carSchema);
