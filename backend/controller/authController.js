import "@dotenvx/dotenvx/config";
import jwt from "jsonwebtoken";
import passport from "passport";
import { prisma } from "../lib/prisma.js";
import * as db from "../db/userQueries.js";
import { Strategy as LocalStrategy } from "passport-local";
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

const signup = [
  validateUser,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const { name, username } = req.body;
      await db.createUser(name, username, hashedPassword);
      res.redirect("/auth/login");
    } catch (error) {
      console.error(error);
      res.json({ error: "Something went wrong. Try again." });
    }
  },
];

//Passport's Local Strategy to authenticate users
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

async function getLogin(req, res) {
  res.send("Login");
}

async function postLogin(req, res) {
  passport.authenticate("local", (err, user, options) => {
    if (!user) {
      res.status(400).json({ message: options.message });
    }
    user = { id: user.id, username: user.username };
    jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
      res.json({
        token,
      });
    });
  })(req, res);
}

async function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

async function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

export { signup, getLogin, postLogin, verifyToken, logout };
