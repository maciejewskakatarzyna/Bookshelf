require("dotenv").config({ path: "../.env" })
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const booksRoutes = require("./routes/booksRoutes")

const app = express()

app.use(bodyParser.json())

app.use("/api/books", booksRoutes)

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpjboon.mongodb.net/books?retryWrites=true&w=majority`
const port = 4000

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port)
    console.log("Connected to MongoDB!")
  })
  .catch((error) => {
    console.log("Connection failed!", error)
  })
