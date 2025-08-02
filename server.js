import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import petRoutes from "./routes/pets.js"
import adminRoutes from "./routes/admin.js";
// const adminRoutes = require('./routes/admin');

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  
}));
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes)
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("✅ Server running at http://localhost:5000"));console.log("MongoDB conneted")
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
