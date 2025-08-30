require("@dotenvx/dotenvx").config();
const express = require("express");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bodyParser = require("body-parser");

//routers
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

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
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.get("/login", (req, res) => {
  res.send("Login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => res.send("hello world"));

app.listen(3000, console.log("listening..."));
