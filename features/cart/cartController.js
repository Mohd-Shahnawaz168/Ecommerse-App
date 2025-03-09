import CartRepository from "./cartRepo.js";
import ProductRepository from "../products/productRepo.js";

let cartRepository = new CartRepository();
let productRepository = new ProductRepository();

export default class CartController {
  async addToCart(req, res) {
    try {
      let userId = req.user._id;
      let { productId, qty, price, imageUrl, productName } = req.body;

      let product = await productRepository.getProductById(productId);
      if (product) {
        //check if product is alraedy in cart if yes then increase qty

        let checkItemAvailabalityInCart =
          await cartRepository.getCartItemByProductId(productId);

        if (checkItemAvailabalityInCart) {
          await cartRepository.increaseCartQty(productId, qty);
        } else {
          await cartRepository.addToCart(
            userId,
            productId,
            qty,
            price,
            imageUrl,
            productName
          );
        }
        res.status(201).send({ success: true, msg: "Item add to cart" });
      } else {
        res.status(404).send({ success: false, msg: "Item not found" });
      }
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError") {
        res
          .status(400)
          .send({ success: false, msg: Object.values(err.errors)[0].message });
      } else {
        res.status(500).send({
          success: false,
          msg: "Something went wrong please try again later",
        });
      }
    }
  }

  async getCartItemById(req, res) {
    try {
      let cartItemId = req.params;
      let item = await cartRepository.getCartItemById(cartItemId);

      if (item) {
        res.status(200).send({ success: true, item: item });
      } else {
        res.status(404).send({ success: false, msg: "Item not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }

  async getUserCartItem(req, res) {
    try {
      let userId = req.user._id;
      let item = await cartRepository.getUserCartItem(userId);
      res.status(200).send({ success: true, item: item });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }

  async deleteItemFromCart(req, res) {
    try {
      let cartItemId = req.params.cartItemId;
      let product = await cartRepository.deleteItemFromCart(cartItemId);
      res.status(200).send({ success: true, msg: "Item deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }

  async updateQty(req, res) {
    try {
      let { cartItemId, qty } = req.body;
      let cartItem = await cartRepository.getCartItemById(cartItemId);
      if (cartItem) {
        await cartRepository.updateQty(cartItemId, qty);
        res.status(200).send({ success: true, msg: "Quantity updated" });
      } else {
        res.status(404).send({ success: true, msg: "Item not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }
}
