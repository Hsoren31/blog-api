import { Router } from "express";
const authRouter = new Router();

import * as authController from "../controller/authController.js";

authRouter.post("/signup", authController.signup);
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

export default authRouter;
