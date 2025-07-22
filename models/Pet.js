import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  type: String, // 'dog', 'cat', 'bird'
  breed: String,
  age: Number,
  image: String,
});

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
