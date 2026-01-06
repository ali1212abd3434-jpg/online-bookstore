const express = require("express");
const router = express.Router();
const db = require("../db"); // ✅ fixed path
const jwt = require("jsonwebtoken");
const adminAuth = require("../middleware/adminAuth"); // ✅ fixed path

// =========================
// ADMIN LOGIN
// =========================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM admins WHERE username = ?", [username], (err, results) => {
    if (err) {
      console.error("LOGIN SQL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    if (!results || results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const admin = results[0];

    // plaintext password check (matches your DB)
    if (password !== admin.password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // create JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({ message: "Login successful", token });
  });
});

// =========================
// ADMIN: READ ALL BOOKS (protected)
// =========================
router.get("/books", adminAuth, (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      console.error("GET BOOKS SQL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// =========================
// ADMIN: CREATE BOOK (protected)
// =========================
router.post("/books", adminAuth, (req, res) => {
  const { title, author, price, image, description } = req.body;

  const sql =
    "INSERT INTO books (title, author, price, image, description) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [title, author, price, image, description], (err, result) => {
    if (err) {
      console.error("CREATE BOOK SQL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Book created", bookId: result.insertId });
  });
});

// =========================
// ADMIN: UPDATE BOOK (protected)
// =========================
router.put("/books/:id", adminAuth, (req, res) => {
  const { id } = req.params;
  const { title, author, price, image, description } = req.body;

  const sql = `
    UPDATE books
    SET title = ?, author = ?, price = ?, image = ?, description = ?
    WHERE id = ?
  `;

  db.query(sql, [title, author, price, image, description, id], (err, result) => {
    if (err) {
      console.error("UPDATE BOOK SQL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book updated" });
  });
});

// =========================
// ADMIN: DELETE BOOK (protected)
// =========================
router.delete("/books/:id", adminAuth, (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("DELETE BOOK SQL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  });
});

module.exports = router;
