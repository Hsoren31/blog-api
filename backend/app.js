require("@dotenvx/dotenvx").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//routers
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");

const verifyToken = require("./controller/authController").verifyToken;

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.get("/", verifyToken, (req, res) => res.json({ message: "hello world" }));

app.listen(3000, console.log("listening..."));
