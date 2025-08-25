const express = require("express");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => res.send("hello world"));

app.listen(3000, console.log("listening..."));
