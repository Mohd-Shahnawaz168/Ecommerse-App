import express from "express";
import { Auth } from "../passwordhashing/Aath.js";

import OrderController from "./orderController.js";
let orderController = new OrderController();

let orderRoter = express.Router();

orderRoter.post("/placeOrder", Auth, orderController.placeOrder);

orderRoter.get("/getUserOrder", Auth, orderController.getUserOrder);

export default orderRoter;
