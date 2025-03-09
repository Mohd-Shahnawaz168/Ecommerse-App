import "./dotenv.js";
import express from "express";
import cors from "cors";
import userRouter from "./features/user/userRouter.js";
import connectToMongoose from "./features/config/mongooseConfig.js";
import productRouter from "./features/products/productRouter.js";
import cartRouter from "./features/cart/cartRouter.js";
import orderRoter from "./features/order/orderRouter.js";
import reviewRouter from "./features/reviews/reviewRouter.js";
import path from "path";

// Serve static files from the "public" folder

//create server
let server = express();

//server file statically
let imgPath = path.join("features", "uploads", "images");

server.use("/features/uploads/images", express.static(path.join(imgPath)));

//config cors policy
server.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

//use express to parse body
server.use(express.json());

//configure routes
//user router
server.use("/ecom/api/user", userRouter);

//product router
server.use("/ecom/api/product", productRouter);

//cartRouter
server.use("/ecom/api/cart", cartRouter);

//orderRouter
server.use("/ecom/api/order", orderRoter);

//reviewRouter
server.use("/ecom/api/review", reviewRouter);

server.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404) {
    res.status(404).send("Not Found");
  } else {
    res.status(400).send("An error occurred: " + err.message);
  }
});

server.use(function (req, res, next) {
  res.status(404).send("Page not found please use correct URL");
});

server.listen(3200, () => {
  console.log("server is lstening at port 3200");
  connectToMongoose();
});
