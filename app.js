const express = require("express")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const cors = require("cors")
const userRoutes = require("./routes/user")
const globalErrHandler = require("./controllers/errorController")
const AppError = require("./utils/appError")
const app = express()

// nodejs package to enable cors, its a middleware actually for now in development it accepts all it can specified later before production
app.use(cors())

// this one icludes 15 middlewares
app.use(helmet())

// rate limiter package to limit the requests coming to avoid spam and DOS attack
const limiter = rateLimit({
  max: 900,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again later",
})

app.use("/api", limiter)

// limit for the request size
app.use(
  express.json({
    limit: "15kb",
  })
)

// To sanitize the request body params headers and query
app.use(mongoSanitize())

//  to filter input from users to prevent XSS attacks
app.use(xss())

// middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp())

app.use("/api/users", userRoutes)

app.use("*", (req, res, next) => {
  const err = new AppError(404, "Fail", "Undefined route")
  next(err, req, res, next)
})

app.use(globalErrHandler)

module.exports = app
