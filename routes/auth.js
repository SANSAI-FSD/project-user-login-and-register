import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Register
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = await User.findOne({ username });
//     if (existingUser) return res.status(400).json({ error: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashed });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// routes/auth.js
router.post("/register", async (req, res) => {
  try {
    const { username, name, email, password, profilePic } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      name,
      email,
      password: hashed,
      profilePic,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Login
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ error: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//     res.status(200).json({ message: "Login successful", username: user.username });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 'username' can be either actual username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.status(200).json({
      message: "Login successful",
      username: user.username,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
