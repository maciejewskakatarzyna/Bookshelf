require("dotenv").config();
const mongoose = require("mongoose");
const Papa = require("papaparse");
const fs = require("fs");
const Book = require("./bookSchema.cjs");

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpjboon.mongodb.net/books?retryWrites=true&w=majority`;

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

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
