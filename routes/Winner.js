const express = require("express")
const router = express.Router()
const WinnerController = require("../controllers/winnerController")
const authController = require("../controllers/authController")

router.post("/createOne", function (req, res, next) {
  WinnerController.createWinner(req, res, next)
})

router.get("/getWinner", function (req, res, next) {
  WinnerController.getWinnerData(req, res, next)
})

router.get("/shouldWin", function (req, res, next) {
  WinnerController.shouldWin(req, res, next)
})

router.use(authController.protect)

router.get("/getAll", function (req, res, next) {
  WinnerController.getAllWinners(req, res, next)
})


router
  .route("/:id")
  .patch(WinnerController.updateWinner)
  .delete(WinnerController.deleteWinner)

module.exports = router
