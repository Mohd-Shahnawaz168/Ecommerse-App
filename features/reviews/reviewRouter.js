import express from "express";
import { Auth } from "../passwordhashing/Aath.js";
import ReviewController from "./reviewController.js";
let reviewController = new ReviewController();

let reviewRouter = express.Router();

reviewRouter.post("/addReview", Auth, reviewController.addReview);

reviewRouter.delete("/deleteReview", Auth, reviewController.deleteReview);

export default reviewRouter;
