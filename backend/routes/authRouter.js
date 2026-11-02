import { Router } from "express";
const authRouter = new Router();
import { validateUser } from "../middleware/auth/validateUser.js";

import * as authController from "../controller/authController.js";

authRouter.post("/signup", validateUser, authController.signup);
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

export default authRouter;
