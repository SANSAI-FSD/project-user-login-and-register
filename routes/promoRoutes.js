import express from "express";
import Promo from "../models/Promo.js"; // Ensure .js extension for ES modules

const router = express.Router();

// Get all promos
router.get("/", async (req, res) => {
  try {
    const promos = await Promo.find();
    res.json(promos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a promo
router.post("/", async (req, res) => {
  try {
    const { image, title, description, link } = req.body;
    const newPromo = new Promo({ image, title, description, link });
    await newPromo.save();
    res.status(201).json(newPromo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a promo
router.put("/:id", async (req, res) => {
  try {
    const updatedPromo = await Promo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPromo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a promo
router.delete("/:id", async (req, res) => {
  try {
    await Promo.findByIdAndDelete(req.params.id);
    res.json({ message: "Promo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
