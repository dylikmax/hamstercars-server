import jwt from "jsonwebtoken";
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } from "../secret-keys.js";
import mysqlProvider from "../providers/mysql.provider.js";
import authProvider from "../providers/auth.provider.js";
import cookieProvider from "../providers/cookie.provider.js";
import statuses from "../enums/statuses.enum.js";

const authMiddleware = (requiredLevel) => async (req, res, next) => {
  const { accessToken, refreshToken } = cookieProvider.getTokens(req);
  req.user = {};

  try {
    const { id, st } = jwt.verify(accessToken, ACCESS_SECRET_KEY);

    req.user = {};
    req.user.id = id;
    req.user.status = st;

    if (requiredLevel > st) {
      return res.status(403).json();
    }
  } catch (error) {
    const isValidToken = await mysqlProvider.isValidToken(refreshToken);

    if (!isValidToken) {
      req.user.id = null;
      req.user.status = statuses["Не авторизован"];

      if (requiredLevel === statuses["Не авторизован"]) {
        return next();
      }
      return res.status(403).json();
    }

    const newTokens = await authProvider.refreshTokens(refreshToken);

    const { id, st } = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

    if (requiredLevel > st) {
      return res.status(403).json();
    }

    req.user.id = id;
    req.user.status = st;

    cookieProvider.setTokens(res, newTokens);
  }

  next();
};

export default authMiddleware;
