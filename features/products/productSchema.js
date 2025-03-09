import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "product name is required"],
  },
  category: {
    type: mongoose.Schema.Types.String,
    enum: [
      "Mobile",
      "Electronics",
      "Clothing",
      "Furniture",
      "Shoes",
      "Electrical Appliances",
    ],
    required: [true, "product category is required"],
  },
  imageUrl: {
    type: mongoose.Schema.Types.String,
    required: [true, "product image is required"],
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: [true, "product Price is required"],
  },
  stock: {
    type: Number,
    required: [true, "product stock is mandatory"],
    maxLength: [5, "stock can be maximum 5 digits"],
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: [true, "product description is required"],
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        type: String,
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
    },
  ],
});

let productModel = mongoose.model("products", productSchema);

export default productModel;
