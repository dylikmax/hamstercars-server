import express from "express";
import connection from "../connection/db.js"
const usersRouter = express.Router();

// status 0+
usersRouter.get("/me");

usersRouter.patch("/me");

usersRouter.get("/:id");

usersRouter.get("/:id/cars");

usersRouter.get("/me/orders");

//status 1+
usersRouter.get("/me/cars");

usersRouter.patch("/me/cars/change-visible-all");

//status 2+
usersRouter.get("/employees");

usersRouter.patch("/:id/cars/change-visible-all");

usersRouter.get("/:id/orders")

//status 3+
usersRouter.patch("/:id");

usersRouter.patch("/:id/ban");

usersRouter.patch("/:id/dismiss");

usersRouter.get("/");

export default usersRouter;