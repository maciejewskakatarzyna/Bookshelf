const mongoose = require("mongoose");

let bookSchema = new mongoose.Schema({
  bookId: String,
  title: String,
  author: String,
  isbn: String,
  isbn13: String,
  myRating: Number,
  averageRating: Number,
  publisher: String,
  numberOfPages: Number,
  yearPublished: Number,
  originalPublicationYear: Number,
  dateRead: Date,
  dateAdded: Date,
  bookshelves: String,
  exclusiveShelf: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
