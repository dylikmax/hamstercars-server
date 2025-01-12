import express from "express";
import schemaCheck from "../validations/schema-check.js";
import userSchemas from "../validations/user.schemas.js";
import multer from "multer";

const usersRouter = express.Router();
const upload = multer();

//status 2+
usersRouter.get("/employees", (req, res) => {
  res.send("searched employees");
});

// status 0+
usersRouter.get("/me", (req, res) => {
  res.send("get me");
});

usersRouter.patch(
  "/me",
  upload.single(),
  schemaCheck(userSchemas.user),
  (req, res) => {
    res.send("patched yourself");
  },
);

usersRouter.get("/:id", (req, res) => {
  res.send("user by id");
});

usersRouter.get("/:id/cars", (req, res) => {
  res.send("cars by user id");
});

usersRouter.get("/me/orders", (req, res) => {
  res.send("my orders");
});

usersRouter.patch("/me/vk-request-code", (req, res) => {
  res.send("requesting vk");
});

usersRouter.patch("/me/vk-try-confirm", (req, res) => {
  res.send("confirm vk");
});


//status 1+
usersRouter.get("/me/cars", (req, res) => {
  res.send("my cars");
});

usersRouter.patch("/me/cars/change-visible-all", (req, res) => {
  res.send("hide/show all my cars");
});

//status 2+
usersRouter.patch("/:id/cars/change-visible-all", (req, res) => {
  res.send("hide/show all user`s cars");
});

usersRouter.get("/:id/orders", (req, res) => {
  res.send("orders by user id");
});

//status 3+
usersRouter.patch(
  "/:id",
  upload.none(),
  schemaCheck(userSchemas.user),
  (req, res) => {
    res.send("patched user");
  },
);

usersRouter.patch(
  "/:id/ban",
  upload.none(),
  schemaCheck(userSchemas.ban),
  (req, res) => {
    res.send("ban user");
  },
);

usersRouter.patch("/:id/dismiss", (req, res) => {
  res.send("dismiss employee");
});

usersRouter.get("/", (req, res) => {
  res.send("searched user");
});

export default usersRouter;
