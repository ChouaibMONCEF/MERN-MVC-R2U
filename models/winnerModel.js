const mongoose = require("mongoose")

const winnerSchema = new mongoose.Schema(
  {
    prize: {
      type: String,
      required: [true, "Prize is required"],
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "holder",
      required: [true, "wallet is required"],
    },
  },
  { timestamps: true }
)

const Winner = mongoose.model("winner", winnerSchema)

module.exports = Winner
