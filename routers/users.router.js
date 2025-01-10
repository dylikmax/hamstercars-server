import express from "express";
import connection from "../connection/db.js"
import schemaCheck from "../validations/schema-check.js";
import userSchemas from "../validations/user.schemas.js";
import multer from "multer";

const usersRouter = express.Router();
const upload = multer();

// status 0+
usersRouter.get("/me", upload.none());

usersRouter.patch("/me", upload.single(), schemaCheck(userSchemas.body), (req, res) => {
    res.send("patched yourself")
});

usersRouter.get("/:id", upload.none());

usersRouter.get("/:id/cars");

usersRouter.get("/me/orders");

//status 1+
usersRouter.get("/me/cars");

usersRouter.patch("/me/cars/change-visible-all");

//status 2+
usersRouter.get("/employees", upload.none(), schemaCheck(userSchemas.queries), (req, res) => {
    res.send("searched employees")
});

usersRouter.patch("/:id/cars/change-visible-all");

usersRouter.get("/:id/orders")

//status 3+
usersRouter.patch("/:id", upload.none(), schemaCheck(userSchemas.body), (req, res) => {
    res.send("patched user")
});

usersRouter.patch("/:id/ban");

usersRouter.patch("/:id/dismiss");

usersRouter.get("/", upload.none(), schemaCheck(userSchemas.queries), (req, res) => {
    res.send("searched user")
});

export default usersRouter;