const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const adminRoutes = require("./admin.js");
const bookRoutes = require("./books.js");

// Import DB connection
const db = require("./db.js");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// DB test route
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, results) => {
    if (err) {
      return res.status(500).send("DB error: " + err.message);
    }
    res.send("DB connected: " + JSON.stringify(results));
  });
});

// Use Railway’s dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
