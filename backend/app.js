require("dotenv").config({ path: "../.env" })
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const booksRoutes = require("./routes/booksRoutes")

const app = express()

app.use(bodyParser.json())

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpjboon.mongodb.net/?retryWrites=true&w=majority`

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB!")
  })
  .catch((error) => {
    console.log("Connection failed!", error)
  })

const port = 4000

app.use("/api/books", booksRoutes)

app.listen(port)
