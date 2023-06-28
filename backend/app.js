const express = require("express")
const bodyParser = require("body-parser")

const booksRoutes = require("./routes/books-routes")

const app = express()

app.use(bodyParser.json())

const port = 4000

app.use("/api/books", booksRoutes)

app.listen(port)
