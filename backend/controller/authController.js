import "@dotenvx/dotenvx/config";
import jwt from "jsonwebtoken";
import passport from "passport";
import { prisma } from "../lib/prisma.js";

import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

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
    const info = { id: user.id, username: user.username };
    jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
      res.json({
        user: info,
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

export { getLogin, postLogin, verifyToken };
