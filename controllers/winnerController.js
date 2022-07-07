const Winner = require("../models/winnerModel")
const Holder = require("../models/holderModel")
const base = require("./baseController")
const AppError = require("../utils/appError")

const createWinner = async (req, res, next) => {
  try {
    const { wallet, prize } = req.body

    if (!wallet || !prize) {
      return next(
        new AppError(404, "Fail", "Please provide prize & wallet"),
        req,
        res,
        next
      )
    }

    switch (prize) {
      case "f3fe6145c731ee6bb660601cacd2dfc6":
        realPrize = 0.01
        break
      case "c6d468d89971addea787c8729f127516":
        realPrize = 0.02
        break
      case "22cfd4d2a592283ce8af54e8965efed8":
        realPrize = 0.05
        break
      case "b9e913445a143993d9ce1d6f266965cd":
        realPrize = 0.2
        break
      default:
        realPrize = 0
        break
    }

    const holder = await Holder.findOne({ wallet })

    if (!holder) {
      return next(new AppError(404, "Fail", "Not Holder"), req, res, next)
    } else {
      const doc = await Winner.create({
        prize: realPrize,
        wallet: holder._id,
      })
      res.status(201).json({
        status: "success",
        data: {
          doc,
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

const getAllWinners = async (req, res, next) => {
  try {
    const doc = await Winner.find().populate("wallet")
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    })
  } catch (error) {
    next(error)
  }
}

const shouldWin = async (req, res, next) => {
  try {
    let today = new Date()
    today.setDate(today.getDate() - 1)

    
    const winner = await Winner.find({
      createdAt: { $gte: today },
    })

    console.log(winner.length)
    if (winner.length <= 4){
      res.status(201).json({
        shouldWin: true,
      })
    }else{
      res.status(201).json({
        shouldWin: false,
      })
    }
  } catch (error) {
    next(error)
  }
}

exports.shouldWin = shouldWin
exports.getAllWinners = getAllWinners
exports.getWinner = base.getOne(Winner)
exports.createWinner = createWinner
exports.updateWinner = base.updateOne(Winner)
exports.deleteWinner = base.deleteOne(Winner)