import express from "express";
import connection from "../connection/db.js";
const authRouter = express.Router();

authRouter.post("/register");

authRouter.post("/login");

authRouter.patch("/change-password");

authRouter.post("/logout");

export default authRouter;