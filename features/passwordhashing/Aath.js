import jwt from "jsonwebtoken";
import UserRepository from "../user/userRepo.js";
let userRepository = new UserRepository();

async function Auth(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(400)
        .send({ success: false, msg: "Please Login first" });
    }

    let payload = jwt.verify(token, process.env.JWT_SECRET);

    let user = await userRepository.getUserById(payload.userId);
    if (user) {
      req.user = user;
      next();
    } else {
      res
        .status(400)
        .send({ success: false, msg: "User not found. Please login again" });
    }
  } catch (err) {
    console.log(err);
    if (err.name == "JsonWebTokenError") {
      res
        .status(400)
        .send({ success: false, msg: "Invalid token. Please login again" });
    } else if (err.name == "TokenExpiredError") {
      res
        .status(400)
        .send({ success: false, msg: "Token expired. Please login again" });
    } else {
      res.status(500).send({
        success: false,
        msg: "Something went wrong. Please try again later",
      });
    }
  }
}

function AuthByRole(req, res, next) {}

export { Auth, AuthByRole };
