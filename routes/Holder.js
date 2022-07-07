const express = require("express")
const router = express.Router()
const HolderController = require("../controllers/holderController")
const authController = require("../controllers/authController")


router.post("/isItEqual", function (req, res, next) {
  HolderController.isItEqual(req, res, next)
})

router.post("/newAttempt", function (req, res, next) {
  HolderController.newAttempt(req, res, next)
})

router.post("/isHolder", function (req, res, next) {
  HolderController.isHolder(req, res, next)
})

router
  .route("/:id")
  .patch(HolderController.updateHolder)

router.use(authController.protect)

router.post("/createOne", function (req, res, next) {
  HolderController.createHolder(req, res, next)
})

router.get("/getAll", function (req, res, next) {
  HolderController.getAllHolders(req, res, next)
})




module.exports = router
