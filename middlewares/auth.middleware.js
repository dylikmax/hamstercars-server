import jwt from "jsonwebtoken";
import { REFRESH_SECRET_KEY } from "../secret-keys";

const authMiddleware = (req, res, next) => {
  console.log(req.cookies);
  next();
};

export default authMiddleware;

const token = jwt.sign({ id: "65535", st: "44" }, REFRESH_SECRET_KEY);
console.log(token, token.length);