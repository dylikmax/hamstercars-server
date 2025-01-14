import express from "express";
import multer from "multer";
import schemaCheck from "../validations/schema-check.js";
import orderSchemas from "../validations/order.schemas.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const ordersRouter = express.Router();
const upload = multer();

//status 0+
ordersRouter.post(
  "/",
  authMiddleware,
  upload.none(),
  schemaCheck(orderSchemas.addition),
  (req, res) => {
    res.send("add order");
  },
);

ordersRouter.get("/:id", authMiddleware);

ordersRouter.patch(
  "/:id",
  authMiddleware,
  upload.none(),
  schemaCheck(orderSchemas.changing),
  (req, res) => {
    res.send("edit order");
  },
);

ordersRouter.patch("/:id/pay", authMiddleware);

ordersRouter.patch("/:id/pass", authMiddleware);

ordersRouter.delete("/:id", authMiddleware);

//status 1+
ordersRouter.get("/my-cars-orders", authMiddleware);

ordersRouter.patch("/:id/finish", authMiddleware);

//status 2+
ordersRouter.get("/unchecked", authMiddleware);

ordersRouter.get("/unfinished", authMiddleware);

ordersRouter.patch("/:id/accept", authMiddleware);

ordersRouter.patch("/:id/deny", authMiddleware);

//status 3+
ordersRouter.get("/", authMiddleware);

export default ordersRouter;
