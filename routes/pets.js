import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

// Get all pets
router.get("/", async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

// Get pet by ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new pet (admin usage)
router.post("/", async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
