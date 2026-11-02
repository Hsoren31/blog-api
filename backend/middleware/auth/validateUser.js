import { body, validationResult } from "express-validator";
import * as db from "../../db/userQueries.js";

const validation = [
  body("name")
    .trim()
    .optional({ values: "falsy" })
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must only contain letters."),
  body("username")
    .notEmpty()
    .withMessage("Username must not be empty.")
    .custom((value) => !/\s/.test(value))
    .withMessage("Username cannot contain spaces")
    .isLength({ min: 8, max: 15 })
    .withMessage("Username must be between 8 and 15 characters")
    .custom(async (value) => {
      const existingUser = await db.findIfUsernameExists(value);
      if (existingUser) {
        throw new Error("Username already in use.");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password can not be empty")
    .custom((value) => !/\s/.test(value))
    .withMessage("Password cannot contain spaces")
    .isLength({ min: 8, max: 25 })
    .withMessage("Password must be between 8 and 25 characters")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage("Password must contain one Uppercase Letter and one Number."),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match."),
];

const validateUser = [
  validation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
];

export { validateUser };
