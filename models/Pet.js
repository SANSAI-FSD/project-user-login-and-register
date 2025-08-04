// import mongoose from "mongoose";

// const petSchema = new mongoose.Schema({
//   name: String,
//   type: String, // 'dog', 'cat', 'bird'
//   breed: String,
//   age: Number,
//   image: String,
// });

// const Pet = mongoose.model("Pet", petSchema);
// export default Pet;

import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: String,
    type: String, // 'dog', 'cat', 'bird'
    breed: String,
    age: Number,
    image: String,
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
