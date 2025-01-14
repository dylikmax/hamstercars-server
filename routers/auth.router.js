import express from "express";
import schemaCheck from "../validations/schema-check.js";
import authSchemas from "../validations/auth.schemas.js";
import multer from "multer";
import vkApiProvider from "../providers/vk-api.provider.js";
import mysqlProvider from "../providers/mysql.provider.js";
import authProvider from "../providers/auth.provider.js";
import cookieProvider from "../providers/cookie.provider.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();
const upload = multer();

authRouter.post(
  "/register",
  upload.none(),
  schemaCheck(authSchemas.registration),
  async (req, res) => {
    try {
      const user = req.body;

      const realVkId = await vkApiProvider.getRealId(user.VK_ID);
      const isVkUnique = await mysqlProvider.isUniqueVkId(realVkId);

      if (!isVkUnique) {
        throw new Error("User with this VK is already exist.");
      }

      const result = await mysqlProvider.addUser({
        ...user,
        VK_ID: realVkId,
      });

      const userId = result[0].insertId;
      const tokens = await authProvider.createTokens(userId, 0);

      cookieProvider.setTokens(res, tokens);

      res.json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

authRouter.post(
  "/login",
  upload.none(),
  schemaCheck(authSchemas.login),
  async (req, res) => {
    try {
      const { login, password } = req.body;

      const user = await mysqlProvider.authenticateUser(login, password);
      const tokens = await authProvider.createTokens(user.id, user.status);

      cookieProvider.setTokens(res, tokens);

      res.json();
    } catch (error) {
      if (error.message === "Wrong password.") {
        return res.status(400).json({ error: error.message });
      }
      res.status(404).json({ error: error.message });
    }
  },
);

authRouter.patch(
  "/change-password",
  upload.none(),
  schemaCheck(authSchemas.changePassword),
  authMiddleware,
  async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;

      await mysqlProvider.changePassword(req.user.id, oldPassword, newPassword);
      res.json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

authRouter.post("/logout", authMiddleware, async (req, res) => {
  await mysqlProvider.deleteToken(req.cookies.refresh_token);
  cookieProvider.deleteTokens(res);
  res.json();
});

export default authRouter;
