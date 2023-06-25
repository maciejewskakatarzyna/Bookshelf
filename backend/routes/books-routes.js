const express = require("express")

const router = express.Router()

router.get("/", (req, res, next) => {
  console.log("GET request in Books")
  res.json({ message: "GET request in Books" })
})

module.exports = router
