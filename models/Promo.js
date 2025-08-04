// models/Promo.js
import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  link: String,
});

const Promo = mongoose.model("Promo", promoSchema);
export default Promo;
