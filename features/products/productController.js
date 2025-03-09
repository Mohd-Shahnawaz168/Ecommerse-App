import ProductRepository from "./productRepo.js";
import path from "path";
import fs from "fs";

let productRepository = new ProductRepository();
export default class ProductController {
  async addProduct(req, res) {
    try {
      let { name, category, price, stock, description } = req.body;
      const imageUrl = req.file ? req.file.filename : null;

      let addingproduct = await productRepository.addProduct(
        name,
        category,
        price,
        stock,
        description,
        imageUrl
      );

      if (addingproduct) {
        res
          .status(201)
          .send({ success: true, msg: "Product Added succesfully" });
      } else {
        res.status(500).send({
          success: false,
          msg: "something went wrong please try again",
        });
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

  async getAllProduct(req, res) {
    try {
      let product = await productRepository.getAllProduct();
      res.status(200).send({ success: true, product });
    } catch (err) {
      res.status(500).send({ success: false, msg: "Something went wrong" });
    }
  }

  async deleteProduct(req, res) {
    try {
      let productId = req.params.productId;

      let product = await productRepository.getProductById(productId);

      let deletedProduct = await productRepository.deleteProduct(productId);

      if (deletedProduct.deletedCount === 1) {
        let imageurl = product.imageUrl;

        let imagePath = path.join("features", "uploads", "images", imageurl);
        fs.unlink(imagePath, (err) => {});
        res
          .status(200)
          .send({ success: true, msg: "item deleted Successfully" });
      } else {
        res.status(400).send({ success: false, msg: "Fail to delete Items" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }

  async getProductById(req, res) {
    try {
      let productId = req.params.productId;

      let product = await productRepository.getProductById(productId);
      if (product) {
        res.status(200).send({ success: true, product: product });
      } else {
        res.status(400).send({ success: false, msg: "product does not exist" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }

  async updateProduct(req, res) {
    try {
      let { productId, name, category, price, stock, description } = req.body;
      let imageUrl = req.file.filename;

      let updateProduct = await productRepository.updateProduct(
        productId,
        name,
        category,
        price,
        stock,
        description,
        imageUrl
      );

      if (updateProduct) {
        res
          .status(200)
          .send({ success: true, msg: "product updated Successfully" });
      } else {
        res.status(404).send({ success: false, msg: "product not Found" });
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
