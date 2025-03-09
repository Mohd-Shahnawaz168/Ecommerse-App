import { ObjectId } from "mongodb";
import productModel from "../products/productSchema.js";
import reviewModel from "./reviewSchema.js";
export default class ReviewRepository {
  async addReview(userId, name, productId, rating, comment) {
    await productModel.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      {
        $pull: { reviews: { userId: userId } }, // Remove the existing review by userId
      }
    );
    //add review to the product
    await productModel.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      {
        $push: {
          reviews: {
            userId: userId,
            name: name,
            rating: rating,
            comment: comment,
          },
        },
      }
    );

    return await reviewModel.findOneAndUpdate(
      {
        productId: productId,
        userId: userId,
      },
      {
        productId: productId,
        userId: userId,
        name: name,
        rating: rating,
        comment: comment,
      },
      { upsert: true, new: true }
    );
  }

  async deleteReview(userId, productId) {
    await productModel.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      {
        $pull: { reviews: { userId: userId } }, // Remove the existing review by userId
      }
    );

    await reviewModel.findOneAndDelete({
      userId: userId,
      productId: productId,
    });
  }
}
