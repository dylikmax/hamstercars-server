import { validationResult } from "express-validator";

const schemaCheck = (schema) => [
  schema,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export default schemaCheck;
