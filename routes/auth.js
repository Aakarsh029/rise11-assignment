const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Signup route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "your_jwt_secret");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Name" });
    }
    console.log(user)
    // Compare passwords
    const isMatch = await argon2.verify(  user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error",error });
  }
});

module.exports = router;


// // routes/auth.js

// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// // Middleware to parse JSON bodies
// router.use(express.json());

// // Signup route
// router.post("/signup", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ error: "Username and password are required" });
//   }
//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();
//     const token = jwt.sign({ id: newUser._id }, "your_jwt_secret");
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   // Check if username and password are provided
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Please provide username and password" });
//   }

//   try {
//     // Check if user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid Name" });
//     }
//     // console.log(user, "USER");
//     // Compare passwords
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword)
//     console.log(user.password)
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         console.error("Error comparing password:", err);
//       } else if (result) {
//         console.log("Password is correct!");
//       } else {
//         console.log(result,"Password is incorrect.");
//       }
//     });
//     const isMatch = await bcrypt.compare( user.password,password);
//     // console.log(isMatch,"isMatch")
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Password" });
//     }
//     console.log(isMatch, "isMatch");
//     // Generate JWT
//     const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
//       expiresIn: "1h",
//     });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
