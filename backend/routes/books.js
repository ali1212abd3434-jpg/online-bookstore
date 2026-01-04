const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all books
router.get("/", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

// GET book by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(results[0]);
  });
});

module.exports = router;
