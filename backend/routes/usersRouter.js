const { Router } = require("express");
const usersRouter = new Router();

usersRouter.get("/", (req, res) => res.send("get all users"));
usersRouter.post("/", (req, res) => res.send("create new user?"));
usersRouter.put("/:userId", (req, res) =>
  res.send(`update user ${req.params.userId}`)
);
usersRouter.delete("/:userId", (req, res) =>
  res.send(`delete user ${req.params.userId}`)
);

usersRouter.get("/:userId/posts", (req, res) =>
  res.send(`User ${req.params.userId}'s posts`)
);

module.exports = usersRouter;
