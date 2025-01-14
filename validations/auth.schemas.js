import { body } from "express-validator";

const authSchemas = {
  registration: [
    body("login")
      .isLength({ min: 3 })
      .withMessage("Login should be at least 3 characters long.")
      .isLength({ max: 50 })
      .withMessage("Login should be no more than 50 characters long."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long."),
    body("name")
      .isLength({ min: 2 })
      .withMessage("Name should be at least 2 characters long.")
      .isLength({ max: 21 })
      .withMessage("Name should be no more than 21 characters long."),
    body("surname")
      .isLength({ min: 2 })
      .withMessage("Surname should be at least 2 characters long.")
      .isLength({ max: 21 })
      .withMessage("Surname should be no more than 21 characters long."),
    body("bankAcc")
      .isInt({ min: 100000, max: 999999 })
      .withMessage("Bank account must be a number with 6 digits."),
  ],
  login: [
    body("login")
      .isLength({ min: 3 })
      .withMessage("Login should be at least 3 characters long.")
      .isLength({ max: 50 })
      .withMessage("Login should be no more than 50 characters long."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long."),
  ],
  changePassword: [
    body("oldPassword")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long."),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long."),
  ],
};

export default authSchemas;
