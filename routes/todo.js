const express = require("express");
const Todo = require("../models/Todo.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.use((req, res, next) => {
  const token = req.header("x-auth-token");
  console.log(token, "Aakarsh");
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    console.log(decoded, "tanmay");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
});

router.post("/", async (req, res) => {
  try {
    const { text } = req.body; // Ensure 'text' is being extracted from the request body
    if (!text) {
      return res.status(400).send("Text is required");
    }
    const todo = new Todo({
      text,
      userId: req.user.userId, // Assuming todos are linked to a user
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error("Failed to create todo", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  console.log("hiiiii");
  try {
    const todos = await Todo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(400).send("Error fetching todos");
  }
});

router.put("/:id", async (req, res) => {
  const { text, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { text, completed },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(400).send("Error updating todo");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    res.send("Todo deleted");
  } catch (error) {
    res.status(400).send("Error deleting todo");
  }
});

module.exports = router;
