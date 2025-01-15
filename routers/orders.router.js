import express from "express";
import multer from "multer";
import schemaCheck from "../validations/schema-check.js";
import orderSchemas from "../validations/order.schemas.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import statuses from "../enums/statuses.enum.js";

const ordersRouter = express.Router();
const upload = multer();

//status 0+
ordersRouter.post(
  "/",
  authMiddleware(statuses["Пользователь"]),
  upload.none(),
  schemaCheck(orderSchemas.addition),
  (req, res) => {
    res.send("add order");
  },
);

ordersRouter.get("/:id", authMiddleware(statuses["Заблокирован"]));

ordersRouter.patch(
  "/:id",
  authMiddleware(statuses["Пользователь"]),
  upload.none(),
  schemaCheck(orderSchemas.changing),
  (req, res) => {
    res.send("edit order");
  },
);

ordersRouter.patch("/:id/pay", authMiddleware(statuses["Пользователь"]));

ordersRouter.patch("/:id/pass", authMiddleware(statuses["Пользователь"]));

ordersRouter.delete("/:id", authMiddleware(statuses["Пользователь"]));

//status 1+
ordersRouter.get("/my-cars-orders", authMiddleware(statuses["Арендодатель"]));

ordersRouter.patch("/:id/finish", authMiddleware(statuses["Арендодатель"]));

//status 2+
ordersRouter.get("/unchecked", authMiddleware(statuses["Товаровед"]));

ordersRouter.get("/unfinished", authMiddleware(statuses["Товаровед"]));

ordersRouter.patch("/:id/accept", authMiddleware(statuses["Товаровед"]));

ordersRouter.patch("/:id/deny", authMiddleware(statuses["Товаровед"]));

//status 3+
ordersRouter.get("/", authMiddleware(statuses["Заместитель директора"]));

export default ordersRouter;
