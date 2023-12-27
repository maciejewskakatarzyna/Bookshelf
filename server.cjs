require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./bookSchema.cjs");
const app = express();

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpjboon.mongodb.net/books?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

mongoose
  .connect(dbUri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.log("Connection failed!", error));

app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
