import express from "express";
import connection from "../connection/db.js"
const ordersRouter = express.Router();

//status 0+
ordersRouter.post("/");

ordersRouter.get("/:id");

ordersRouter.patch("/:id");

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