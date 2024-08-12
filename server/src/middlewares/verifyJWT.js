import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json(new ApiError(401, "", "Token is Required"));
  }
  const decodeToken = jwt.verify(token, process.env.JWT_SECERT_KEY);

  req.user = decodeToken.id;
    next();
};
export { verifyJWT };
