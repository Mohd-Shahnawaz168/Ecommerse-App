import productModel from "./productSchema.js";
import { ObjectId } from "mongodb";

export default class ProductRepository {
  async addProduct(name, category, price, stock, description, imageUrl) {
    //Add product in DB
    console.log(imageUrl);
    return await productModel.insertOne({
      name,
      category,
      price,
      stock,
      description,
      imageUrl,
    });
  }

  async getAllProduct() {
    return await productModel.find();
  }

  async deleteProduct(productId) {
    return await productModel.deleteOne({ _id: new ObjectId(productId) });
  }

  async getProductById(productId) {
    return await productModel.findById(productId);
  }

  async updateProduct(
    productId,
    name,
    category,
    price,
    stock,
    description,
    imageUrl
  ) {
    return await productModel.findByIdAndUpdate(productId, {
      name,
      category,
      price,
      stock,
      description,
      imageUrl,
    });
  }

  async updateproductQty(productId, qty) {
    console.log(productId, qty);
    await productModel.findByIdAndUpdate(productId, {
      $inc: { stock: -qty },
    });

    let product = await productModel.findById(productId);
    if (product.stock <= 0) {
      await productModel.deleteOne({ _id: productId });
    }
    return;
  }
}
