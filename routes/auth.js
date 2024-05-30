// routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, 'secret');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).send('Invalid credentials');
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).send('Invalid credentials');
//         }
//         const token = jwt.sign({ userId: user._id }, 'secretkey');
//         res.json({ token });
//     } catch (error) {
//         res.status(400).send('Error logging in');
//     }
// });
module.exports = router;

// const express = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const router = express.Router();

// router.post('/signup', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = new User({ username, password });
//         await user.save();
//         res.status(201).send('User created');
//     } catch (error) {
//         res.status(400).send('Error creating user');
//     }
// });

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).send('Invalid credentials');
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).send('Invalid credentials');
//         }
//         const token = jwt.sign({ userId: user._id }, 'secretkey');
//         res.json({ token });
//     } catch (error) {
//         res.status(400).send('Error logging in');
//     }
// });

// module.exports = router;
