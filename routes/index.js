const express = require("express")

const { getHomePage, getUserById, update, submit } = require("../controller")

const router = express.Router()

router.get("/", getHomePage)

router.get("/:userId", getUserById)

router.post("/update", update)

router.post("/submit", submit)

module.exports = router
