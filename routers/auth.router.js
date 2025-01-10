import express from "express";
import connection from "../connection/db.js";
import schemaCheck from "../validations/schema-check.js";
import authSchemas from "../validations/auth.schemas.js";
import multer from "multer";

const authRouter = express.Router();
const upload = multer();

authRouter.post("/register", upload.none(), schemaCheck(authSchemas.registration), (req, res) => {
    res.send("registered");
});

authRouter.post("/login", upload.none(), schemaCheck(authSchemas.login), (req, res) => {
    res.send("logined")
});

authRouter.patch("/change-password", upload.none(), schemaCheck(authSchemas.changePassword), (req, res) => {
    res.send("password changed")
});

authRouter.post("/logout");

export default authRouter;