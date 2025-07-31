// import express from "express";
// import Pet from "../models/Pet.js";

// const router = express.Router();

// // Get all pets
// router.get("/", async (req, res) => {
//   const pets = await Pet.find();
//   res.json(pets);
// });

// // Get pet by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const pet = await Pet.findById(req.params.id);
//     if (!pet) return res.status(404).json({ message: "Pet not found" });
//     res.json(pet);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add new pet (admin usage)
// router.post("/", async (req, res) => {
//   try {
//     const newPet = new Pet(req.body);
//     await newPet.save();
//     res.status(201).json(newPet);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// export default router;

import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js'; // Cloudinary config
import Pet from '../models/Pet.js';

const router = express.Router();
const upload = multer({ storage });

// POST: Add a new pet with image
router.post('/add-pet', upload.single('image'), async (req, res) => {
  try {
    const { name, type, breed, age } = req.body;

    const newPet = new Pet({
      name,
      type,
      breed,
      age,
      image: req.file.path, // Cloudinary URL
    });

    await newPet.save();
    res.status(201).json({ message: 'Pet added successfully', pet: newPet });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add pet', error: err.message });
  }
});

// ✅ GET: Fetch all pets
router.get('/all-pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pets', error: err.message });
  }
});

export default router;
