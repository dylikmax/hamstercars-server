import express from "express";
import schemaCheck from "../validations/schema-check.js";
import userSchemas from "../validations/user.schemas.js";
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware.js";
import mysqlProvider from "../providers/mysql.provider.js";
import statuses from "../enums/statuses.enum.js";
import userAccessManager from "../access-managers/user.access-manager.js";
import vkApiProvider from "../providers/vk-api.provider.js";

const usersRouter = express.Router();
const upload = multer();

usersRouter.get(
  "/employees",
  authMiddleware(statuses["Товаровед"]),
  async (req, res) => {
    const employees = await mysqlProvider.filterByLargerStatus(
      statuses["Арендодатель"],
    );

    res.send(employees);
  },
);

usersRouter.get(
  "/me/cars",
  authMiddleware(statuses["Арендодатель"]),
  (req, res) => {
    res.send("my cars");
  },
);

usersRouter.get(
  "/me",
  authMiddleware(statuses["Заблокирован"]),
  async (req, res) => {
    const user = await mysqlProvider.getFullUserInfo(req.user.id);

    res.json(user);
  },
);

usersRouter.patch(
  "/me",
  upload.single(),
  schemaCheck(userSchemas.user),
  authMiddleware(statuses["Заблокирован"]),
  async (req, res) => {
    res.send("patched yourself");
  },
);

usersRouter.get(
  "/:id",
  authMiddleware(statuses["Не авторизован"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const user = await mysqlProvider.getFullUserInfo(id);

      const sentData = userAccessManager(user, req.user.status);
      res.json(sentData);
    } catch (error) {
      if (error.message === "Account with this ID doesn`t exist.") {
        return res.status(404).json();
      }

      res.status(500).json({ error: error.message });
    }
  },
);

usersRouter.get(
  "/:id/cars",
  authMiddleware(statuses["Не авторизован"]),
  (req, res) => {
    res.send("cars by user id");
  },
);

usersRouter.get(
  "/me/orders",
  authMiddleware(statuses["Заблокирован"]),
  (req, res) => {
    res.send("my orders");
  },
);

usersRouter.patch(
  "/me/vk-request-code",
  authMiddleware(statuses["Заблокирован"]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const code = Math.floor(Math.random() * 9000 + 1000);

      const { vkId, isVkConfirmed } =
        await mysqlProvider.getFullUserInfo(userId);

      if (isVkConfirmed) {
        throw new Error("VK is already linked with this account.");
      }

      await mysqlProvider.addVkCode(userId, code);
      await vkApiProvider.sendCode(vkId, code);

      res.json();
    } catch (error) {
      if (
        error.message === "Can't send messages for users without permission"
      ) {
        return res
          .status(403)
          .json({ error: "Messages to user doesn`t allowed." });
      }

      if (error.message === "User with this VK already exist.") {
        return res.status(400).json({ error: error.message });
      }

      if (error.message === "VK is already linked with this account.") {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: error.message });
    }
  },
);

usersRouter.patch(
  "/me/vk-confirm",
  upload.none(),
  schemaCheck(userSchemas.vkAccept),
  authMiddleware(statuses["Заблокирован"]),
  async (req, res) => {
    try {
      const code = req.body.code;
      
      await mysqlProvider.checkVkCode(req.user.id, code);
      res.json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

usersRouter.patch(
  "/me/cars/change-visible-all",
  authMiddleware(statuses["Арендодатель"]),
  (req, res) => {
    res.send("hide/show all my cars");
  },
);

usersRouter.patch(
  "/:id/cars/change-visible-all",
  authMiddleware(statuses["Товаровед"]),
  (req, res) => {
    res.send("hide/show all user`s cars");
  },
);

usersRouter.get(
  "/:id/orders",
  authMiddleware(statuses["Товаровед"]),
  (req, res) => {
    res.send("orders by user id");
  },
);

usersRouter.patch(
  "/:id",
  upload.none(),
  schemaCheck(userSchemas.user),
  authMiddleware(statuses["Заместитель директора"]),
  (req, res) => {
    res.send("patched user");
  },
);

usersRouter.patch(
  "/:id/ban",
  upload.none(),
  schemaCheck(userSchemas.ban),
  authMiddleware(statuses["Заместитель директора"]),
  (req, res) => {
    res.send("ban user");
  },
);

usersRouter.patch(
  "/:id/dismiss",
  authMiddleware(statuses["Заместитель директора"]),
  (req, res) => {
    res.send("dismiss employee");
  },
);

usersRouter.get(
  "/",
  authMiddleware(statuses["Заместитель директора"]),
  (req, res) => {
    res.send("searched user");
  },
);

export default usersRouter;
