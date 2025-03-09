import mongoose from "mongoose";
let mongoUrl = process.env.MONGOOSE_URL;
async function connectToMongoose() {
  await mongoose.connect(mongoUrl);
  console.log("mongodb is connected with mongoose");
}

export default connectToMongoose;
