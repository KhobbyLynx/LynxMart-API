import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: [String],
    required: true,
    validate: [arrayMinLength, "At least one image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function arrayMinLength(val) {
  return val.length >= 1; // Checks if the length of the "images" array is at least 1
}

export default mongoose.model("Cart", cartSchema);
