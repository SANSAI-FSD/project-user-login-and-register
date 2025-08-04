import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import petRoutes from "./routes/pets.js";
import adminRoutes from "./routes/admin.js";
import soldPetsRoute from './routes/soldPets.js';
import promoRoutes from "./routes/promoRoutes.js"

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize app first
const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
}));
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://project-pet.netlify.app'],
  credentials: true, // Only if using cookies/auth
}));
// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/admin/soldpets', soldPetsRoute);
app.use("/api/promos", promoRoutes); 


// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("✅ Server running at http://localhost:5000");
      console.log("✅ MongoDB connected");
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
