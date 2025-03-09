import cartMOdel from "./cartSchema.js";
export default class CartRepository {
  async addToCart(userId, productId, qty, price, imageUrl, productName) {
    return await cartMOdel.insertOne({
      userId,
      productId,
      qty,
      price,
      imageUrl,
      productName,
    });
  }

  async increaseCartQty(productId, qty) {
    // return await cartMOdel.findOneAndUpdate(
    //   { productId: productId },
    //   {
    //     $inc: {
    //       qty: qty,
    //     },
    //   }
    // );

    let doc = await cartMOdel.findOne({ productId: productId });
    if (doc) {
      doc.qty += qty; // or use doc.$inc({ qty: qty }) for more atomic updates
      await doc.save();
    } else {
      return false;
    }
  }

  async getCartItemById(cartItemId) {
    return await cartMOdel.findById(cartItemId);
  }

  async getCartItemByIdfromCart(cartItemId) {
    return await cartMOdel
      .findById(cartItemId)
      .select({ _id: 0, __v: 0 })
      .lean();
  }

  async getCartItemByProductId(productId) {
    return await cartMOdel.findOne({ productId: productId });
  }

  async getUserCartItem(userId) {
    return await cartMOdel.find({ userId: userId });
  }

  async deleteItemFromCart(cartItemId) {
    return await cartMOdel.deleteOne({ _id: cartItemId });
  }

  async updateQty(cartItemId, qty) {
    let doc = await cartMOdel.findById(cartItemId);
    if (doc) {
      doc.qty += qty; // or use doc.$inc({ qty: qty }) for more atomic updates
      await doc.save();

      let updatedDoc = await cartMOdel.findById(cartItemId);
      if (updatedDoc.qty <= 0) {
        await cartMOdel.findByIdAndDelete(cartItemId);
      }
      return;
    } else {
      return false;
    }
  }
}
