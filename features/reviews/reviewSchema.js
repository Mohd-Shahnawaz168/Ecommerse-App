import mongoose from "mongoose";

let reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
    ref: "users",
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

let reviewModel = mongoose.model("reviews", reviewSchema);

export default reviewModel;
