
// import express from "express";
// import User from "../models/User.js";
// import Pet from "../models/Pet.js";

// const router = express.Router();

// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/users/:id", async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/pets", async (req, res) => {
//   try {
//     const pets = await Pet.find({});
//     res.json(pets);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/pets/:id", async (req, res) => {
//   try {
//     await Pet.findByIdAndDelete(req.params.id);
//     res.json({ message: "Pet deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;



import express from "express";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import SoldPet from "../models/SoldPet.js";

const router = express.Router();

// 🚀 Admin Stats Endpoint
router.get("/stats", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalUsers = await User.countDocuments();
    const todayUsers = await User.countDocuments({ createdAt: { $gte: today } });

    const totalPets = await Pet.countDocuments();
    const todayPets = await Pet.countDocuments({ createdAt: { $gte: today } });

    const totalSoldPets = await SoldPet.countDocuments();
    const todaySoldPets = await SoldPet.countDocuments({ soldAt: { $gte: today } });

    res.json({
      totalUsers,
      todayUsers,
      totalPets,
      todayPets,
      totalSoldPets,
      todaySoldPets,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
});

// 🧑 Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ❌ Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🐶 Get all pets
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ❌ Delete pet
router.delete("/pets/:id", async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
