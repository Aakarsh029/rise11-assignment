const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth.js");
const todoRoutes = require("./routes/todo.js");

const app = express();
app.use(cors());
app.use(express.json()); // Use body-parser to parse JSON bodies

mongoose
  .connect("mongodb://localhost:27017/todo-app")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/", (req, res) => { 
  res.send("Hello, world!");
});