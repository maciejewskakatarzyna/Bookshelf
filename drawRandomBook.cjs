require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./bookSchema.cjs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpjboon.mongodb.net/books?retryWrites=true&w=majority`;

mongoose
  .connect(dbUri)
  .then(async () => {
    console.log("Connected to MongoDB!");

    // Function to draw a book and handle user input for drawing another book
    const drawBook = async () => {
      Book.aggregate([
        { $match: { exclusiveShelf: "to-read" } },
        { $sample: { size: 1 } },
      ]).then((book) => {
        console.log(`${book[0].title}`);
        rl.question("\nDo you want to draw another book? (Y/n) ", (answer) => {
          if (answer.toLowerCase() === "y" || answer === "") {
            drawBook();
          } else {
            console.log("Goodbye!");
            rl.close();
            mongoose.connection.close();
          }
        });
      });
    };

    // Initial call to start drawing books
    drawBook();
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });
