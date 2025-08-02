import express from 'express';
import SoldPet from '../models/SoldPet.js';

const router = express.Router();

// POST: Add sold pet
router.post('/', async (req, res) => {
  try {
    const newSoldPet = new SoldPet(req.body);
    await newSoldPet.save();
    res.status(201).json({ message: 'Pet marked as sold', pet: newSoldPet });
  } catch (err) {
    console.error('Error saving sold pet:', err);
    res.status(500).json({ message: 'Failed to save sold pet' });
  }
});

// GET: All sold pets
router.get('/', async (req, res) => {
  try {
    const soldPets = await SoldPet.find().sort({ soldAt: -1 });
    res.json(soldPets);
  } catch (err) {
    console.error('Error fetching sold pets:', err);
    res.status(500).json({ message: 'Failed to fetch sold pets' });
  }
});

export default router;
