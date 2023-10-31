const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Books=require("../models/bookmodel");



//Router1:For fetching all books
router.get("/fetchallbooks", async (req, res) => {
  try {
    const books = await Books.find({});
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Router2:For adding the book.
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


//Router 3:Search for a specific book by its id.


module.exports = router;


