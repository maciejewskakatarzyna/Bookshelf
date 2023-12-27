require("dotenv").config();
const mongoose = require("mongoose");
const Papa = require("papaparse");
const fs = require("fs");
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpjboon.mongodb.net/books?retryWrites=true&w=majority`;

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

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

let Book = mongoose.model("Book", bookSchema);

fs.readFile("./books.csv", "utf8", async (err, file) => {
  if (err) {
    console.log(err);
  } else {
    Papa.parse(file, {
      header: true,
      complete: async (result) => {
        for (const book of result.data) {
          let bookModel = new Book(book);
          try {
            await bookModel.save();
            console.log(`"${book.title}" has been saved!`);
          } catch (error) {
            console.log(error);
          }
        }
      },
    });
  }
});
