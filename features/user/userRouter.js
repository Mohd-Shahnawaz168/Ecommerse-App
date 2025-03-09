import express from "express";
import UserController from "./userController.js";
import { Auth } from "../passwordhashing/Aath.js";
let userController = new UserController();

//configure user Router
let userRouter = express.Router();

userRouter.post("/signUp", (req, res) => {
  userController.signUp(req, res);
});

userRouter.post("/signUpOtp", (req, res) => {
  userController.signUpOtp(req, res);
});

userRouter.post("/signIn", (req, res) => {
  userController.signIn(req, res);
});

//loggedIn user change password
userRouter.put("/changePassword", Auth, (req, res) => {
  userController.changPassword(req, res);
});

//forgot password
userRouter.put("/forgetPassword", (req, res) => {
  userController.forgetPassword(req, res);
});

//forgot password OTP
userRouter.put("/forgetPasswordOTP", (req, res) => {
  userController.forgetPasswordOtp(req, res);
});

export default userRouter;
