import { body } from "express-validator";

const carSchemas = {
  addition: [
    body("brand")
      .isLength({ min: 1 })
      .withMessage("Brand name must be at least 1 character long."),
    body("model")
      .isLength({ min: 1 })
      .withMessage("Model name must be at least 1 character long."),
    body("pledge")
      .isInt({ min: 0 })
      .withMessage("Pledge value must be positive."),
    body("firstStage")
      .isIn(["Скорость", "Баланс", "Управление"])
      .withMessage("Invalid stage type.")
      .optional(),
    body("secondStage")
      .isIn(["Скорость", "Баланс", "Управление"])
      .withMessage("Invalid stage type.")
      .optional(),
    body("thirdStage")
      .isIn(["Скорость", "Баланс", "Управление"])
      .withMessage("Invalid stage type.")
      .optional(),
    body("fourthStage")
      .isIn(["Скорость", "Баланс", "Управление"])
      .withMessage("Invalid stage type.")
      .optional(),
    body("maxSpeed").isInt().withMessage("Max speed value must be an integer."),
    body("timeTo100")
      .isFloat()
      .withMessage("Acceleration time value must be a number.")
      .optional(),
    body("timeToMax")
      .isFloat()
      .withMessage("Acceleration time value must be a number."),
    body("ownerId").isInt().withMessage("Owner ID must be an integer."),
  ],
  changing: [
    body("pledge")
      .isInt({ min: 0 })
      .withMessage("Pledge value must be positive.")
      .optional(),
    body("firstStage")
      .isIn(["Скорость", "Баланс", "Управление"])
      .withMessage("Invalid stage type.")
      .optional(),
    body("secondStage")
      .isIn(["Скорость", "Баланс", "Управление"])
      .withMessage("Invalid stage type.")
      .optional(),
    body("thirdStage")
      .isIn(["Скорость", "Баланс", "Управление"])
      .withMessage("Invalid stage type.")
      .optional(),
    body("fourthStage")
      .isIn(["Скорость", "Баланс", "Управление"])
      .withMessage("Invalid stage type.")
      .optional(),
    body("maxSpeed")
      .isInt()
      .withMessage("Max speed value must be an integer.")
      .optional(),
    body("timeTo100")
      .isFloat()
      .withMessage("Acceleration time value must be a number.")
      .optional(),
    body("timeToMax")
      .isFloat()
      .withMessage("Acceleration time value must be a number.")
      .optional(),
    body("ownerId")
      .isInt()
      .withMessage("Owner ID must be an integer.")
      .optional(),
  ]
};

export default carSchemas;
