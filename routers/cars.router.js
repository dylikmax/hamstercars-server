import express from "express";
import connection from "../connection/db.js"
const carsRouter = express.Router();

//status 0+
carsRouter.get("/");

carsRouter.get("/:id");

//status 1+
carsRouter.patch("/:id/change-visible");

carsRouter.delete("/:id");

//status 2+
carsRouter.patch("/:id");

carsRouter.post("/");

export default carsRouter;