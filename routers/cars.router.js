import express from "express";
import connection from "../connection/db.js";
import multer from "multer";
import schemaCheck from "../validations/schema-check.js";
import carSchemas from "../validations/car.schemas.js";

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
carsRouter.patch("/:id/change-visible", (req, res) => {
  res.send("changing visible");
});

carsRouter.delete("/:id", (req, res) => {
  res.send("deleting car");
});

//status 2+
carsRouter.patch(
  "/:id",
  upload.array(),
  schemaCheck(carSchemas.changing),
  (req, res) => {
    res.send("changing car");
  },
);

carsRouter.post(
  "/",
  upload.array(),
  schemaCheck(carSchemas.addition),
  (req, res) => {
    res.send("addition car");
  },
);

export default carsRouter;
