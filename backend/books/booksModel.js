const mongoose = require("mongoose")

const Schema = mongoose.Schema

const authorSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const publisherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: authorSchema,
  description: {
    type: String,
  },
  publisher: publisherSchema,
  year: {
    type: Number,
  },
  pages: {
    type: Number,
  },
  isbn: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  rating: {
    type: Number,
  },
  readingStatus: {
    type: String,
  },
})

module.exports = mongoose.model("Book", bookSchema)
