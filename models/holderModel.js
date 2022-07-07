const mongoose = require("mongoose")

const holderSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: [true, "Please add your wallet adress"],
      unique: true,
    },
    username: {
      type: String,
    },
    holds: {
      type: Number,
      default: 1,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Holder = mongoose.model("holder", holderSchema)

module.exports = Holder