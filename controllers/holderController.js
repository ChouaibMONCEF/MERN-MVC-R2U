const Holder = require("../models/holderModel")
const base = require("./baseController")
const AppError = require("../utils/appError")

const isHolder = async (req, res, next) => {
  try {
    const { wallet } = req.body
    if (!wallet) {
      return next(
        new AppError(404, "Fail", "Please provide prize & wallet"),
        req,
        res,
        next
      )
    }
    const holder = await Holder.findOne({ wallet })

    if (!holder) {
      res.status(201).json({
        Holder: false,
      })
    } else {
      res.status(201).json({
        Holder: true,
      })
    }
  } catch (error) {
    next(error)
  }
}

const newAttempt = async (req, res, next) => {
  try {
    const { wallet } = req.body
    if (!wallet) {
      return next(
        new AppError(404, "Fail", "Please provide prize & wallet"),
        req,
        res,
        next
      )
    }

    const isEqual = await Holder.findOne({ wallet })

    if (isEqual.holds <= isEqual.attempts) {
      return next(
        new AppError(404, "Fail", "You Reached the limit!"),
        req,
        res,
        next
      )
    } else {
      const holder = await Holder.findOneAndUpdate(
        { wallet: wallet },
        { $inc: { attempts: 1 } }
      )

      res.status(200).json({
        status: "success",
        data: {
          holder,
        },
      })
    }
    return
  } catch (error) {
    next(error)
  }
}

const isItEqual = async (req, res, next) => {
  try {
    const { wallet } = req.body
    if (!wallet) {
      return next(
        new AppError(404, "Fail", "Please provide prize & wallet"),
        req,
        res,
        next
      )
    }

    const isEqual = await Holder.findOne({ wallet })

    if (isEqual.holds <= isEqual.attempts) {
      res.status(201).json({
        isEqual: true,
      })
    } else {
      res.status(201).json({
        isEqual: false,
      })
    }
    return
  } catch (error) {
    next(error)
  }
}

exports.isItEqual = isItEqual
exports.isHolder = isHolder
exports.newAttempt = newAttempt
exports.getAllHolders = base.getAll(Holder)
exports.getHolder = base.getOne(Holder)
exports.createHolder = base.createOne(Holder)
exports.updateHolder = base.updateOne(Holder)
exports.deleteHolder = base.deleteOne(Holder)
