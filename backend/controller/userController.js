const db = require("../db/userQueries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name must not be empty")
    .isAlpha()
    .withMessage("First name must only contain alphabet letters.")
    .isLength({ min: 1, max: 20 })
    .withMessage("First name must be between 1 and 20 characters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name must not be empty")
    .isAlpha()
    .withMessage("Last name must only contain alphabet letters.")
    .isLength({ min: 1, max: 20 })
    .withMessage("Last name must be between 1 and 20 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can not be empty.")
    .isEmail()
    .withMessage("Must be a valid Email"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username must not be empty.")
    .isLength({ min: 8, max: 15 })
    .withMessage("Username must be between 8 and 15 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password can not be empty")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be between 8 and 15 characters")
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

createUser = [
  validateUser,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const { firstName, lastName, email, username } = req.body;
      // check if user exists in the database
      const userExists = await db.findIfUserExists(email);
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
      // check if username is taken
      const usernameExists = await db.findIfUsernameExists(username);
      if (usernameExists) {
        return res.status(400).json({ error: "Username is already taken." });
      }
      const user = await db.createUser(
        firstName,
        lastName,
        email,
        username,
        hashedPassword
      );
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

async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const { userData } = req.body;
    // check if new email exists in the database
    const userExists = await db.findIfUserExists(userData.email);
    if (userExists && userData.emailChange) {
      return res.status(400).json({ error: "User already exists" });
    }
    // check if new username is taken
    const usernameExists = await db.findIfUsernameExists(userData.username);
    if (usernameExists && userData.usernameChange) {
      return res.status(400).json({ error: "Username is already taken." });
    }
    const user = await db.updateUser({
      id: userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
    });
    res.json({ user });
  } catch (error) {
    res.json({ error: "Could not find user to be updated." });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    await db.deleteUser(userId);
    res.json({ message: "Deleted user successfully." });
  } catch (error) {
    res.json({ error: "Could not find user to delete" });
  }
}

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
