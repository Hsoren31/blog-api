import { Router } from "express";
import * as userController from "../controller/userController.js";
import { verifyToken } from "../controller/authController.js";

const usersRouter = new Router();

//user crud operation routes
usersRouter.post("/", userController.createUser);
usersRouter.get("/:userId", verifyToken, userController.readUser);
usersRouter.put("/:userId", verifyToken, userController.updateUser);
usersRouter.delete("/:userId", verifyToken, userController.deleteUser);

export default usersRouter;
