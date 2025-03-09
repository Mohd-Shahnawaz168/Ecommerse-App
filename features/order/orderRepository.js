import orderMOdel from "./orderSchema.js";
import { ObjectId } from "mongodb";

export default class OrderRepository {
  async placeOrder(item) {
    console.log(item);
    await orderMOdel.insertOne(item);
  }

  async getUserOrder(userId) {
    console.log(userId);
    return await orderMOdel.find({ userId: new ObjectId(userId) });
  }

  async doesUserOrderItem(productId, userId) {
    return await orderMOdel.findOne({
      productId: productId,
      userId: userId,
    });
  }
}
