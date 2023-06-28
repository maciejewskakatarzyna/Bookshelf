const express = require("express")

const router = express.Router()

const DUMMY_BOOKS = [
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
  },
]

//GET all books
router.get("/", (req, res, next) => {
  res.json({ books: DUMMY_BOOKS })
})

//GET book by book id
router.get("/:bid", (req, res, next) => {
  const bookId = req.params.bid

  const book = DUMMY_BOOKS.find((b) => {
    return b.id === bookId
  })

  res.json({ book })
})

//GET all books by author id
router.get("/author/:aid", (req, res, next) => {
  const authorId = req.params.aid

  const books = DUMMY_BOOKS.filter((b) => {
    return b.author.id === authorId
  })

  res.json({ books })
})

//GET all books by publisher id
router.get("/publisher/:pid", (req, res, next) => {
  const publisherId = req.params.pid

  const books = DUMMY_BOOKS.filter((b) => {
    return b.publisher.id === publisherId
  })

  res.json({ books })
})

//POST new book
router.post("/", (req, res, next) => {
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
})

module.exports = router
