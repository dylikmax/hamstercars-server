import express from "express";
import schemaCheck from "../validations/schema-check.js";
import userSchemas from "../validations/user.schemas.js";
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware.js";

const usersRouter = express.Router();
const upload = multer();

//status 2+
usersRouter.get("/employees", authMiddleware, (req, res) => {
  res.send("searched employees");
});

// status 0+
usersRouter.get("/me", authMiddleware, (req, res) => {
  console.log(req.user);

  res.send("get me");
});

usersRouter.patch(
  "/me",
  upload.single(),
  schemaCheck(userSchemas.user),
  authMiddleware,
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

usersRouter.get("/me/orders", authMiddleware, (req, res) => {
  res.send("my orders");
});

usersRouter.patch("/me/vk-request-code", authMiddleware, (req, res) => {
  res.send("requesting vk");
});

usersRouter.patch("/me/vk-try-confirm", authMiddleware, (req, res) => {
  res.send("confirm vk");
});

//status 1+
usersRouter.get("/me/cars", authMiddleware, (req, res) => {
  res.send("my cars");
});

usersRouter.patch("/me/cars/change-visible-all", authMiddleware, (req, res) => {
  res.send("hide/show all my cars");
});

//status 2+
usersRouter.patch(
  "/:id/cars/change-visible-all",
  authMiddleware,
  (req, res) => {
    res.send("hide/show all user`s cars");
  },
);

usersRouter.get("/:id/orders", authMiddleware, (req, res) => {
  res.send("orders by user id");
});

//status 3+
usersRouter.patch(
  "/:id",
  upload.none(),
  schemaCheck(userSchemas.user),
  authMiddleware,
  (req, res) => {
    res.send("patched user");
  },
);

usersRouter.patch(
  "/:id/ban",
  upload.none(),
  schemaCheck(userSchemas.ban),
  authMiddleware,
  (req, res) => {
    res.send("ban user");
  },
);

usersRouter.patch("/:id/dismiss", authMiddleware, (req, res) => {
  res.send("dismiss employee");
});

usersRouter.get("/", authMiddleware, (req, res) => {
  res.send("searched user");
});

export default usersRouter;
