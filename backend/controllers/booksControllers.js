const uuid = require("uuid/v4")

const HttpError = require("../models/http-error")

let DUMMY_BOOKS = [
  {
    id: "b1",
    title: "Harry Potter i Kamień Filozoficzny",
    author: {
      id: "a1",
      firstName: "J.K.",
      lastName: "Rowling",
    },
    description:
      "Pierwsza część przygód młodego czarodzieja Harry'ego Pottera.",
    publisher: {
      id: "p1",
      name: "Media Rodzina",
    },
    year: 2016,
    pages: 328,
    isbn: "9788377580738",
    category: "Fantasy",
    cover: "",
    //TODO add cover as URL or file upload
    rating: 5,
    readingStatus: "read",
  },
]

const filterBooksByParams = (req, res, next) => {
  const queryParams = req.query

  const filteredBooks = DUMMY_BOOKS.filter((b) => {
    let isValid = true
    for (key in queryParams) {
      isValid = isValid && b[key] == queryParams[key]
    }
    return isValid
  })

  res.json({ books: filteredBooks })
}

const getAllBooks = (req, res, next) => {
  res.json({ books: DUMMY_BOOKS })
}

const getBooksById = (req, res, next) => {
  const bookId = req.params.bid

  const book = DUMMY_BOOKS.find((b) => {
    return b.id === bookId
  })

  if (!book) {
    throw new HttpError("Could not find a book for the provided id.", 404)
  }

  res.json({ book })
}

const getBooksByAuthorId = (req, res, next) => {
  const authorId = req.params.aid

  const books = DUMMY_BOOKS.filter((b) => {
    return b.author.id === authorId
  })

  if (books.length === 0) {
    throw new HttpError(
      "Could not find a book for the provided author id.",
      404,
    )
  }

  res.json({ books })
}

const getBooksByPublisherId = (req, res, next) => {
  const publisherId = req.params.pid

  const books = DUMMY_BOOKS.filter((b) => {
    return b.publisher.id === publisherId
  })

  if (books.length === 0) {
    throw new HttpError(
      "Could not find a book for the provided publisher id.",
      404,
    )
  }

  res.json({ books })
}

const getBooksByCategory = (req, res, next) => {
  const category = req.params.category

  const books = DUMMY_BOOKS.filter((b) => {
    return b.category.toLowerCase() === category.toLowerCase()
  })

  if (books.length === 0) {
    throw new HttpError("Could not find a book for the provided category.", 404)
  }

  res.json({ books })
}

const getBooksByRating = (req, res, next) => {
  const rating = req.params.rating

  const books = DUMMY_BOOKS.filter((b) => {
    return b.rating.toString() === rating.toString()
  })

  if (books.length === 0) {
    throw new HttpError("Could not find a book for the provided rating.", 404)
  }

  res.json({ books })
}

const getBooksByReadingStatus = (req, res, next) => {
  const status = req.params.status

  const books = DUMMY_BOOKS.filter((b) => {
    return b.readingStatus.toLowerCase() === status.toLowerCase()
  })

  if (books.length === 0) {
    throw new HttpError(
      "Could not find a book for the provided reading status.",
      404,
    )
  }

  res.json({ books })
}

const createBook = (req, res, next) => {
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
  const createdBook = {
    id: uuid(),
    title,
    author,
    description,
    publisher,
    year,
    pages,
    isbn,
    category,
    cover,
  }

  DUMMY_BOOKS.push(createdBook)
  res.status(201).json({ book: createdBook })
}

const updateBook = (req, res, next) => {
  const bookId = req.params.bid

  let updatedBook = {}

  for (let key of [
    "title",
    "author",
    "description",
    "publisher",
    "year",
    "pages",
    "isbn",
    "category",
    "cover",
  ]) {
    if (req.body[key] !== undefined) {
      updatedBook[key] = req.body[key]
    }
  }

  const bookIndex = DUMMY_BOOKS.findIndex((b) => {
    return b.id === bookId
  })

  DUMMY_BOOKS[bookIndex] = { ...DUMMY_BOOKS[bookIndex], ...updatedBook }

  res.status(200).json({ book: DUMMY_BOOKS[bookIndex] })
}

const deleteBook = (req, res, next) => {
  const bookId = req.params.bid

  DUMMY_BOOKS = DUMMY_BOOKS.filter((b) => {
    return b.id !== bookId
  })

  res.status(200).json({ message: "Book deleted" })
}

exports.filterBooksByParams = filterBooksByParams
exports.getAllBooks = getAllBooks
exports.getBooksById = getBooksById
exports.getBooksByAuthorId = getBooksByAuthorId
exports.getBooksByPublisherId = getBooksByPublisherId
exports.getBooksByCategory = getBooksByCategory
exports.getBooksByRating = getBooksByRating
exports.getBooksByReadingStatus = getBooksByReadingStatus
exports.createBook = createBook
exports.updateBook = updateBook
exports.deleteBook = deleteBook
