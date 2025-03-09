import mongoose from "mongoose";
import userModel from "./userSchema.js";

export default class UserRepository {
  constructor() {
    this.collection = "users";
  }
  async signUp(user) {
    //add user data in DB
    return await new userModel(user).save();
  }

  async checkUserByEmail(email) {
    //get userdata from DB
    return await userModel.findOne({ email });
  }

  async getUserById(userId) {
    //get userdata from DB and return only name and email
    return await userModel.findById(userId).select({ name: 1, email: 1 });
  }

  async changePassword(userId, password) {
    //updat password
    return await userModel.findByIdAndUpdate(userId, { password: password });
  }

  async changePasswordByMail(email, password) {
    //find by email and update password
    return await userModel.findOneAndUpdate(
      { email: email },
      { password: password }
    );
  }
}
