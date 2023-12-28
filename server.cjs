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

app.get("/books/read", async (req, res) => {
  const books = await Book.find({ exclusiveShelf: "read" });
  res.json(books);
});

app.get("/books/to-read", async (req, res) => {
  const books = await Book.find({ exclusiveShelf: "to-read" });
  res.json(books);
});

app.get("/books/currently-reading", async (req, res) => {
  const books = await Book.find({ exclusiveShelf: "currently-reading" });
  res.json(books);
});

app.get("/books/random", async (req, res) => {
  const book = await Book.aggregate([
    { $match: { exclusiveShelf: "to-read" } },
    { $sample: { size: 1 } },
  ]);
  res.json(book[0]);
});

app.patch("/books/:id", async (req, res) => {
  const id = req.params.id;
  const newShelf = req.body.shelf;

  try {
    const updatedBook = await Book.updateOne(
      { _id: id },
      { exclusiveShelf: newShelf },
    );
    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);
    res.json(book);
  } catch (err) {
    res.status(404).json({ message: `No book with id: ${id}` });
    console.error(err);
  }
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000"),
);
