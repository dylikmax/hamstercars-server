import express from "express";
import authRouter from "./routers/auth.router.js";
import usersRouter from "./routers/users.router.js";
import carsRouter from "./routers/cars.router.js";
import ordersRouter from "./routers/orders.router.js";
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.static('public'));

const PORT = 3000;

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/cars", carsRouter);
app.use("/orders", ordersRouter);

app.listen(PORT, () => {});

// const token = jwt.sign({ foo: 'bar' }, 'piska', { expiresIn: '2s' });
// console.log(token);
// const decoded = jwt.verify(token, 'piska');
// console.log(decoded);

