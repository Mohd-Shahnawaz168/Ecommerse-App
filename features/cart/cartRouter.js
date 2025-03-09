import express from "express";
import CartController from "./cartController.js";
import { Auth } from "../passwordhashing/Aath.js";

let cartController = new CartController();
let cartRouter = express.Router();

cartRouter.post("/addToCart", Auth, cartController.addToCart);

cartRouter.get("/getCartItemById", Auth, cartController.getCartItemById);

cartRouter.get("/getUserCartItem", Auth, cartController.getUserCartItem);

cartRouter.delete(
  "/deleteItemFromCart/:cartItemId",
  Auth,
  cartController.deleteItemFromCart
);

cartRouter.put("/updateQty", Auth, cartController.updateQty);

export default cartRouter;
