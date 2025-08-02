// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const Pet = require("../models/Pet");


import express from "express";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

const router = express.Router();



// const verifyAdmin = (req, res, next) => {
//   const username = req.headers.username;

//   if (!username || !username.endsWith("@admin")) {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   next();
// };



router.get("/users",  async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all pets
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete pet by ID
router.delete("/pets/:id",async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// module.exports = router;
export default router;