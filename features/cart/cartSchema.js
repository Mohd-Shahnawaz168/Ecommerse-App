import mongoose from "mongoose";

let cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  imageUrl: { type: mongoose.Schema.Types.String },

  productName: { type: mongoose.Schema.Types.String },

  qty: {
    type: mongoose.Schema.Types.Number,
    required: [true, "Please add quantity"],
  },
  price: {
    type: mongoose.Schema.Types.Number,
  },
});

const cartMOdel = mongoose.model("carts", cartSchema);

export default cartMOdel;
