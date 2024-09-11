const { mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Car",
    },
    note: {
      type: String,
      required: true,
    },
    isStaff: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
