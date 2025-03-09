import mongoose from "mongoose";
import validator from "validator";

let userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "name is required"],
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: [true, "email is required"],
    unique: true,
    validate: [validator.isEmail, "Email Id is not valid"],
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, "password is required"],
  },
  role: {
    type: mongoose.Schema.Types.String,
    default: "user",
    enum: ["user", "seller"],
  },
});
let userModel = mongoose.model("user", userSchema);
export default userModel;
