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
  ],
  ban: [
    body("banReason")
      .isLength({ max: 100 })
      .withMessage("Ban reason must be shorter than 100 characters long.")
  ],
  vkAccept: [
    body("code")
      .isInt({ min: 1000, max: 9999 })
      .withMessage("Accept code should be a four-digit number."),
  ],
};

export default userSchemas;
