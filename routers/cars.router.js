import express from "express";
import multer from "multer";
import schemaCheck from "../validations/schema-check.js";
import carSchemas from "../validations/car.schemas.js";
import authMiddleware from "../middlewares/auth.middleware.js";

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
carsRouter.patch("/:id/change-visible", authMiddleware, (req, res) => {
  res.send("changing visible");
});

carsRouter.delete("/:id", authMiddleware, (req, res) => {
  res.send("deleting car");
});

//status 2+
carsRouter.patch(
  "/:id",
  authMiddleware,
  schemaCheck(carSchemas.changing),
  upload.array(),
  (req, res) => {
    res.send("changing car");
  },
);

carsRouter.post(
  "/",
  authMiddleware,
  schemaCheck(carSchemas.addition),
  upload.array(),
  (req, res) => {
    res.send("addition car");
  },
);

export default carsRouter;
