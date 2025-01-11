import express from "express";
import connection from "../connection/db.js"
import multer from "multer";
import schemaCheck from "../validations/schema-check.js";
import orderSchemas from "../validations/order.schemas.js";

const ordersRouter = express.Router();
const upload = multer();

//status 0+
ordersRouter.post("/", upload.none(), schemaCheck(orderSchemas.addition), (req, res) => {
    res.send("add order")
});

ordersRouter.get("/:id");

ordersRouter.patch(
  "/:id",
  upload.none(),
  schemaCheck(orderSchemas.changing),
  (req, res) => {
    res.send("edit order");
  },
);

ordersRouter.patch("/:id/pay");

ordersRouter.patch("/:id/pass");

ordersRouter.delete("/:id");

//status 1+
ordersRouter.get("/my-cars-orders");

ordersRouter.patch("/:id/finish");

//status 2+
ordersRouter.get("/unchecked");

ordersRouter.get("/unfinished");

ordersRouter.patch("/:id/accept");

ordersRouter.patch("/:id/deny");

//status 3+
ordersRouter.get("/");

export default ordersRouter;