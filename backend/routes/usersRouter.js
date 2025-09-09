const { Router } = require("express");
const usersRouter = new Router();
const userController = require("../controller/userController");
const verifyToken = require("../controller/authController").verifyToken;
//user crud operation routes
usersRouter.post("/", userController.createUser);
usersRouter.get("/:userId", verifyToken, userController.readUser);
usersRouter.put("/:userId", verifyToken, userController.updateUser);
usersRouter.delete("/:userId", verifyToken, userController.deleteUser);

module.exports = usersRouter;
