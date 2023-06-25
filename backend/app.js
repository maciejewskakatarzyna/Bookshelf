const express = require("express")

const booksRoutes = require("./routes/books-routes")

const app = express()
const port = 4000

app.use(booksRoutes)

app.listen(port)
