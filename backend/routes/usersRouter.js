import { Router } from "express";
import * as userController from "../controller/userController.js";
import { verifyToken } from "../controller/authController.js";

const usersRouter = new Router();

//user crud operation routes
usersRouter.get("/:username", verifyToken, userController.readUser);
usersRouter.put("/:userId", verifyToken, userController.updateUser);
usersRouter.delete("/:userId", verifyToken, userController.deleteUser);

usersRouter.post("/:username/follow", verifyToken, userController.followUser);
usersRouter.delete(
  "/:username/follow",
  verifyToken,
  userController.unfollowUser
);

export default usersRouter;
