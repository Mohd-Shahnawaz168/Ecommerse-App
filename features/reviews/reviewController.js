import OrderRepository from "../order/orderRepository.js";
import ReviewRepository from "./reviewRepository.js";
let orderRepository = new OrderRepository();
let reviewRepository = new ReviewRepository();
export default class ReviewController {
  async addReview(req, res) {
    try {
      let userId = req.user._id;
      let name = req.user.name;
      let { productId, rating, comment } = req.body;

      //check if user order this product
      let orderProduct = await orderRepository.doesUserOrderItem(
        productId,
        userId
      );
      console.log(orderProduct);
      if (!orderProduct) {
        return res
          .status(404)
          .send({ success: false, msg: "Please buy this Item" });
      }

      let addComment = await reviewRepository.addReview(
        userId,
        name,
        productId,
        rating,
        comment
      );

      res.status(201).send({
        success: true,
        addComment: addComment,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: true, msg: "Something went wrong" });
    }
  }

  async deleteReview(req, res) {
    try {
      let userId = req.user._id;
      let productId = req.body.productId;
      let deletedReview = await reviewRepository.deleteReview(
        userId,
        productId
      );
      res.send({ success: true, msg: "review deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: true, msg: "Something went wrong" });
    }
  }
}
