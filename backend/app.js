const express = require("express")
const bodyParser = require("body-parser")

const booksRoutes = require("./routes/booksRoutes")

const app = express()

app.use(bodyParser.json())

const port = 4000

app.use("/api/books", booksRoutes)

app.listen(port)
