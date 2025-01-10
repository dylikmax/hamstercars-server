import express from "express";
import authRouter from "./routers/auth.router.js";
import usersRouter from "./routers/users.router.js";
import carsRouter from "./routers/cars.router.js";
import ordersRouter from "./routers/orders.router.js";

const app = express();

const PORT = 3000;

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/cars", carsRouter);
app.use("/orders", ordersRouter);

app.listen(PORT, () => {});