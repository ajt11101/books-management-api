const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
  {
    title: { type: "String", required: true },
    author: { type: "String"},
    summary: { type: "String"},
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;