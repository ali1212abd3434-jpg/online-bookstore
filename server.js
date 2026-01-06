const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes (now at root)
const adminRoutes = require("./admin");
const bookRoutes = require("./books");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoutes);

// Default route for health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Use Railway’s dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
