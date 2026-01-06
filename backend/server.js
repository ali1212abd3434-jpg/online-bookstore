const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bookRoutes = require("./routes/books");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000; // 👈 use Railway’s port if available
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // 👈 backticks for template string
});
