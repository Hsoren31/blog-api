import * as db from "../db/userQueries.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const validateUser = [
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

const createUser = [
  validateUser,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const { name, username } = req.body;
      const user = await db.createUser(name, username, hashedPassword);
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.json({ error: "Something went wrong. Try again." });
    }
  },
];

async function readUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await db.readUser(userId);
    if (!user) {
      res.status(400).json({ error: "Could not find user." });
    }
    res.json({ user });
  } catch (error) {
    res.json({ error: "Something went wrong. Try again." });
  }
}

const updateUser = [
  body("name")
    .trim()
    .optional({ values: "falsy" })
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must only contain letters."),
  body("username")
    .optional({ values: "falsy" })
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
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { userId } = req.params;
      const { name, username } = req.body;
      const user = await db.updateUser({
        id: userId,
        name,
        username,
      });
      res.json({ user });
    } catch (error) {
      res.json({ error: "Could not find user to be updated." });
    }
  },
];

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await db.deleteUser(userId);
    res.json({ message: "Deleted user successfully." });
  } catch (error) {
    res.json({ error: "Could not find user to delete" });
  }
}

export { createUser, readUser, updateUser, deleteUser };
