import mongoose from 'mongoose';

const SoldPetSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  category: String,
  description: String,
  imageUrl: String,
  soldAt: {
    type: Date,
    default: Date.now,
  },
});

const SoldPet = mongoose.model('SoldPet', SoldPetSchema);
export default SoldPet;
