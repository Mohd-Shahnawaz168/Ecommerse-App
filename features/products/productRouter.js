import express from "express";
import ProductController from "./productController.js";
import upload from "../multer/fileUploadMulter.js";
let productController = new ProductController();
import { Auth } from "../passwordhashing/Aath.js";

let productRouter = express.Router();

productRouter.post(
  "/addProduct",
  upload.single("imageUrl"),
  Auth,
  productController.addProduct
);

productRouter.get("/getAllProduct", productController.getAllProduct);

productRouter.delete(
  "/deleteProduct/:productId",
  Auth,
  productController.deleteProduct
);

productRouter.get(
  "/getProductById/:productId",
  productController.getProductById
);

productRouter.put(
  "/updateProduct",
  upload.single("imageUrl"),

  productController.updateProduct
);

export default productRouter;
