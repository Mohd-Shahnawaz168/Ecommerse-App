import OrderRepository from "./orderRepository.js";
import CartRepository from "../cart/cartRepo.js";
import ProductRepository from "../products/productRepo.js";
let cartRepository = new CartRepository();
let productRepository = new ProductRepository();
let orderRepository = new OrderRepository();
export default class OrderController {
  async placeOrder(req, res) {
    try {
      let cartItemId = req.body.cartItemId;
      console.log(cartItemId);
      let item = await cartRepository.getCartItemByIdfromCart(cartItemId);

      let updatedItem = { ...item }; // Or Object.assign({}, item) to avoid deep cloning

      updatedItem.totalPrice = updatedItem.qty * updatedItem.price;
      console.log(updatedItem);
      await orderRepository.placeOrder(updatedItem);
      await productRepository.updateproductQty(
        updatedItem.productId,
        updatedItem.qty
      );

      await cartRepository.deleteItemFromCart(cartItemId);
      res.status(200).send({ success: true, msg: "Order Placed" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, msg: "Something went wrong" });
    }
  }

  async getUserOrder(req, res) {
    try {
      let userId = req.user._id;
      let userOrder = await orderRepository.getUserOrder(userId);
      // console.log(userOrder);
      res.status(200).send({ success: true, order: userOrder });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, msg: "Something went wrong" });
    }
  }
}
