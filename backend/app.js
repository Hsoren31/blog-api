const express = require("express");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const app = express();

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => res.send("hello world"));

app.listen(3000, console.log("listening..."));
