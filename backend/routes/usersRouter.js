import { Router } from "express";
import * as userController from "../controller/userController.js";
import verifyToken from "../middleware/auth/verifyToken.js";
import validateProfile from "../middleware/user/validateProfile.js";

const usersRouter = new Router();

//user crud operation routes
usersRouter.get("/:username", verifyToken, userController.readUser);
usersRouter.put(
  "/:username",
  verifyToken,
  validateProfile,
  userController.updateProfile
);
usersRouter.delete("/:username", verifyToken, userController.deleteUser);

usersRouter.post("/:username/follow", verifyToken, userController.followUser);
usersRouter.delete(
  "/:username/follow",
  verifyToken,
  userController.unfollowUser
);

export default usersRouter;
