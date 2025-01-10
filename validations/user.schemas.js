import { query, body } from "express-validator"

const userSchemas = { 
    body: [
    body('name')
        .isLength({ min: 2 }).withMessage('Name should be at least 2 characters long.')
        .isLength({ max: 21 }).withMessage('Nameshould be no more than 21 characters long.')
        .optional(),
    body('surname')
        .isLength({ min: 2 }).withMessage('Surname should be at least 2 characters long.')
        .isLength({ max: 21 }).withMessage('Surname should be no more than 21 characters long.')
        .optional(),
    body('bankAcc')
        .isInt({ min: 100000, max: 999999 }).withMessage('Bank account must be a number with 6 digits.')
        .optional(),
    body('VK_ID')
        .isInt().withMessage('Invalid VK ID.')
        .optional(),
    ],
    queries: [
    query('login')
        .isLength({ min: 3 }).withMessage("Login must be at least 3 characters long.")
        .optional(),
    query('name')        
        .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long.")
        .isString().withMessage("Name must be a string")
        .optional(),
    query('surname')
        .isLength({ min: 2 }).withMessage("Surname must be at least 2 characters long.")
        .isString().withMessage("Name must be a string.")
        .optional(),
    query('bankAcc')
        .isInt().withMessage("Bank account must be a number.")
        .optional(),
    ]
}

export default userSchemas