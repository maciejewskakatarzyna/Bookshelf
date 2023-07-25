const express = require("express")

function createBooksRouter(booksControllers) {
  const router = express.Router()

  router.get("/", booksControllers.filterBooksByParams)
  router.get("/", booksControllers.getAllBooks)
  router.get("/:bid", booksControllers.getBooksById)
  router.get("/author/:aid", booksControllers.getBooksByAuthorId)
  router.get("/publisher/:pid", booksControllers.getBooksByPublisherId)
  router.get("/category/:category", booksControllers.getBooksByCategory)
  router.get("/rating/:rating", booksControllers.getBooksByRating)
  router.get(
    "/reading-status/:status",
    booksControllers.getBooksByReadingStatus,
  )
  router.post("/", booksControllers.createBook)
  router.patch("/:bid", booksControllers.updateBook)
  router.delete("/:bid", booksControllers.deleteBook)

  return router
}

module.exports = { createBooksRouter }
