require("dotenv").config({ path: "../.env" })
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { createBooksRouter } = require("./books/booksRoutes")
const { createBooksControllers } = require("./books/booksControllers")
const Book = require("./books/booksModel")

function createApp(bookModel, controllersCreator, routerCreator) {
  const app = express()

  const corsOptions = {
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://bookshelf-km.netlify.app/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    preflightContinue: false,
    allowedHeaders: ["Content-Type", "Authorization"],
  }

  app.use(cors(corsOptions))

  app.use(bodyParser.json())

  const booksControllers = controllersCreator(bookModel)
  const booksRouter = routerCreator(booksControllers)
  app.use("/api/books", booksRouter)

  app.get("/", (req, res) => {
    res.send("Hello, world!")
  })

  return app
}

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpjboon.mongodb.net/books?retryWrites=true&w=majority`
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = process.env.PORT || 4000
    const app = createApp(Book, createBooksControllers, createBooksRouter)
    app.listen(port)
    console.log("Connected to MongoDB!")
  })
  .catch((error) => {
    console.log("Connection failed!", error)
  })
