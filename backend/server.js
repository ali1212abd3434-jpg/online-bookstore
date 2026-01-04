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

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});