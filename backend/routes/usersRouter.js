const { Router } = require("express");
const usersRouter = new Router();
const userController = require("../controller/userController");

//user crud operation routes
usersRouter.post("/", userController.createUser);
usersRouter.get("/:userId", userController.readUser);
usersRouter.put("/:userId", userController.updateUser);
usersRouter.delete("/:userId", userController.deleteUser);

module.exports = usersRouter;
