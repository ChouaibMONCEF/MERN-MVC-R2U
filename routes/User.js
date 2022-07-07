const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.post("/login", function (req, res, next) {
  authController.login(req, res, next)
})

router.post("/register", function (req, res, next) {
  authController.signup(req, res, next)
})

module.exports = router