import express from "express";
import schemaCheck from "../validations/schema-check.js";
import userSchemas from "../validations/user.schemas.js";
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware.js";
import mysqlProvider from "../providers/mysql.provider.js";
import statuses from "../enums/statuses.enum.js";

const usersRouter = express.Router();
const upload = multer();

usersRouter.get(
  "/employees",
  authMiddleware(statuses["Товаровед"]),
  (req, res) => {
    res.send("searched employees");
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
    const id = req.params.id;
    const user = await mysqlProvider.getFullUserInfo(id);

    
    res.json(user);
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
  authMiddleware(statuses["Пользователь"]),
  (req, res) => {
    res.send("requesting vk");
  },
);

usersRouter.patch(
  "/me/vk-try-confirm",
  authMiddleware(statuses["Пользователь"]),
  (req, res) => {
    res.send("confirm vk");
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
