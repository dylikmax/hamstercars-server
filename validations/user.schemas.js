import { body } from "express-validator";

const userSchemas = {
  user: [
    body("name")
      .isLength({ min: 2 })
      .withMessage("Name should be at least 2 characters long.")
      .isLength({ max: 21 })
      .withMessage("Nameshould be no more than 21 characters long.")
      .optional(),
    body("surname")
      .isLength({ min: 2 })
      .withMessage("Surname should be at least 2 characters long.")
      .isLength({ max: 21 })
      .withMessage("Surname should be no more than 21 characters long.")
      .optional(),
    body("bankAcc")
      .isInt({ min: 100000, max: 999999 })
      .withMessage("Bank account must be a number with 6 digits.")
      .optional(),
    body("VK_ID").isInt().withMessage("Invalid VK ID.").optional(),
  ],
  ban: [
    body("banPeriod")
      .isInt({ min: 1 })
      .withMessage("Ban period should be larger than one day."),
    body("banReason")
      .isLength({ max: 100 })
      .withMessage("Ban reason must be shorter than 100 characters long."),
  ],
};

export default userSchemas;
