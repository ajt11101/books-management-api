const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Books=require("../models/bookmodel");


//Route 1:For fetching all books using GET "/api/book/fetchallbooks"
router.get("/fetchallbooks", async (req, res) => {
  try {
    const books = await Books.find({});
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//Route 2:For adding the book using POST "/api/book/addbook"
router.post(
  "/addbook",
  [
    body("title", "Enter a valid title.").isLength({ min: 3 }),
    body("author", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("summary", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, author, summary } = req.body;
      //If there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const addedbook = new Books({
        title: title,
        author: author,
        summary: summary,
      });
      const savedAddedbook = await addedbook.save();
      res.json(savedAddedbook);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//Route 3:Search for a specific book by its id using GET "/api/book/specificbook/:id"
router.get("/specificbook/:id", async (req, res) => {
  try {
    let book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Not Found");
    }
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//Route 4:Search a specific book by its id and update its details PUT "/api/book/updatebook/:id"
router.put("/updatebook/:id", async (req, res) => {
  const { title, author, summary } = req.body;
  try {
    //create a new book object
    const newBooks = {};
    if (title) {
      newBooks.title = title;
    }
    if (author) {
      newBooks.author = author;
    }
    if (summary) {
      newBooks.summary = summary;
    }

    //Finding the book to be updated and update it
    let book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Not Found");
    }
    book = await Books.findByIdAndUpdate(
      req.params.id,
      { $set: newBooks },
      { new: true }
    );
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//Route 5:For deleting a book with given id DELETE "/api/book/deletebook/:id"
router.delete("/deletebook/:id", async (req, res) => {
  try {
    //Finding the book to delete and delete it
    let book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Not Found");
    }

    book = await Books.findByIdAndDelete(req.params.id);
    res.send({ Sucess: "Book has been deleted", book: book });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;


