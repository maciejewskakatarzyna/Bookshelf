const express = require("express")

const router = express.Router()

router.get("/", bookControllers.filterBooksByParams)
router.get("/", bookControllers.getAllBooks)
router.get("/:bid", bookControllers.getBooksById)
router.get("/author/:aid", bookControllers.getBooksByAuthorId)
router.get("/publisher/:pid", bookControllers.getBooksByPublisherId)
router.get("/category/:category", bookControllers.getBooksByCategory)
router.get("/rating/:rating", bookControllers.getBooksByRating)
router.get("/reading-status/:status", bookControllers.getBooksByReadingStatus)
router.post("/", bookControllers.createBook)
router.patch("/:bid", bookControllers.updateBook)
router.delete("/:bid", bookControllers.deleteBook)

module.exports = router
