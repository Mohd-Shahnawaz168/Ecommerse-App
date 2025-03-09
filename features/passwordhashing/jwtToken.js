import jwt from "jsonwebtoken";

function getJWTToken(userId) {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
}

export default getJWTToken;
