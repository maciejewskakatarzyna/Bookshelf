const uuid = require("uuid")

const HttpError = require("../helpers/httpError")

function createBooksControllers(Book) {
  const filterBooksByParams = async (req, res, next) => {
    const queryParams = req.query
    const filteredBooks = await Book.find(queryParams)
    res.json({ books: filteredBooks })
  }

  const getAllBooks = async (req, res, next) => {
    const allBooks = await Book.find({})
    res.json({ books: allBooks })
  }

  const getBooksById = async (req, res, next) => {
    const bookId = req.params.bid
    const book = await Book.findById(bookId)
    if (!book) {
      throw new HttpError("Could not find a book for the provided id.", 404)
    }
    res.json({ book })
  }

  const getBooksByAuthorId = async (req, res, next) => {
    const authorId = req.params.aid
    const books = await Book.find({ "author.id": authorId })
    if (!books || books.length === 0) {
      throw new HttpError(
        "Could not find a book for the provided author id.",
        404,
      )
    }
    res.json({ books })
  }

  const getBooksByPublisherId = async (req, res, next) => {
    const publisherId = req.params.pid
    const books = await Book.find({ "publisher.id": publisherId })
    if (!books || books.length === 0) {
      throw new HttpError(
        "Could not find a book for the provided publisher id.",
        404,
      )
    }
    res.json({ books })
  }

  const getBooksByCategory = async (req, res, next) => {
    const category = req.params.category
    const books = await Book.find({ category: new RegExp(category, "i") })
    if (!books || books.length === 0) {
      throw new HttpError(
        "Could not find a book for the provided category.",
        404,
      )
    }
    res.json({ books })
  }

  const getBooksByRating = async (req, res, next) => {
    const rating = req.params.rating
    const books = await Book.find({ rating: rating })
    if (!books || books.length === 0) {
      throw new HttpError("Could not find a book for the provided rating.", 404)
    }
    res.json({ books })
  }

  const getBooksByReadingStatus = async (req, res, next) => {
    const status = req.params.status
    const books = await Book.find({ readingStatus: new RegExp(status, "i") })
    if (!books || books.length === 0) {
      throw new HttpError(
        "Could not find a book for the provided reading status.",
        404,
      )
    }
    res.json({ books })
  }

  const createBook = async (req, res, next) => {
    const {
      title,
      author,
      description,
      publisher,
      year,
      pages,
      isbn,
      category,
      cover,
    } = req.body

    const createdBook = new Book({
      title,
      author,
      description,
      publisher,
      year,
      pages,
      isbn,
      category,
      cover,
    })

    await createdBook.save()
    res.status(201).json({ book: createdBook })
  }

  const updateBook = async (req, res, next) => {
    const bookId = req.params.bid
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    })
    if (!updatedBook) {
      throw new HttpError("Error updating book.", 404)
    }
    res.status(200).json({ book: updatedBook })
  }

  const deleteBook = async (req, res, next) => {
    const bookId = req.params.bid
    await Book.findByIdAndRemove(bookId)
    res.status(200).json({ message: "Book deleted" })
  }

  return {
    filterBooksByParams,
    getAllBooks,
    getBooksById,
    getBooksByAuthorId,
    getBooksByPublisherId,
    getBooksByCategory,
    getBooksByRating,
    getBooksByReadingStatus,
    createBook,
    updateBook,
    deleteBook,
  }
}

module.exports = { createBooksControllers }
