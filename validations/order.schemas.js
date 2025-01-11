import { body } from "express-validator";

const orderSchemas = {
  addition: [
    body("customerId").isInt().withMessage("Customer id must be an integer."),
    body("carId").isInt().withMessage("Car id must be an integer."),
    body("duration").isFloat().withMessage("Rent duration must be an integer."),
    body("promocode").optional(),
  ],
  changing: [
    body("duration")
      .isFloat()
      .withMessage("Rent duration must be an integer.")
      .optional(),
    body("promocode").optional(),
  ],
};

export default orderSchemas;
