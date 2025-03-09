import mongoose from "mongoose";

let orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },

  productName: {
    type: mongoose.Schema.Types.String,
  },

  qty: {
    type: mongoose.Schema.Types.Number,
  },

  price: {
    type: mongoose.Schema.Types.Number,
  },
  totalPrice: {
    type: mongoose.Schema.Types.Number,
  },
  orderAt: {
    type: mongoose.Schema.Types.Date,

    default: Date.now(),
  },
});

let orderMOdel = mongoose.model("orders", orderSchema);

export default orderMOdel;
