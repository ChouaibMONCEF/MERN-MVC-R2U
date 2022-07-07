const { promisify } = require("util")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const AppError = require("../utils/appError")

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return next(
        new AppError(404, "Fail", "Please provide username or password"),
        req,
        res,
        next
      )
    }
    const user = await User.findOne({ username }).select("+password")
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        new AppError(401, "Fail", "Username or password incorrect"),
        req,
        res,
        next
      )
    }
    const token = createToken(user.id)
    user.password = undefined

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    })
  } catch (err) {
    next(err)
  }
}

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })
    const token = createToken(user.id)
    user.passord = undefined
    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    })
  } catch (err) {
    next(err)
  }
}

exports.protect = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
      return next(
        new AppError(401, "Fail", "You are not logged in"),
        req,
        res,
        next
      )
    }
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(decode.id)
    if (!user) {
      return next(
        new AppError(401, "Fail", "This user is no longer exists"),
        req,
        res,
        next
      )
    }
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "Fail", "You are not allowed to do this action"),
        req,
        res,
        next
      )
    }
    next()
  }
}
