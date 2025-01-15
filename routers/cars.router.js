import express from "express";
import multer from "multer";
import schemaCheck from "../validations/schema-check.js";
import carSchemas from "../validations/car.schemas.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import statuses from "../enums/statuses.enum.js";

const carsRouter = express.Router();
const upload = multer();

//status 0+
carsRouter.get("/", (req, res) => {
  res.send("getting cars");
});

carsRouter.get("/:id", (req, res) => {
  res.send("getting car");
});

//status 1+
carsRouter.patch(
  "/:id/change-visible",
  authMiddleware(statuses["Арендодатель"]),
  (req, res) => {
    res.send("changing visible");
  },
);

carsRouter.delete(
  "/:id",
  authMiddleware(statuses["Арендодатель"]),
  (req, res) => {
    res.send("deleting car");
  },
);

//status 2+
carsRouter.patch(
  "/:id",
  authMiddleware(statuses["Товаровед"]),
  schemaCheck(carSchemas.changing),
  upload.array(),
  (req, res) => {
    res.send("changing car");
  },
);

carsRouter.post(
  "/",
  authMiddleware(statuses["Товаровед"]),
  schemaCheck(carSchemas.addition),
  upload.array(),
  (req, res) => {
    res.send("addition car");
  },
);

export default carsRouter;
