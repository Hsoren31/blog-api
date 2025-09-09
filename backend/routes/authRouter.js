const Router = require("express");
const authRouter = new Router();

const authController = require("../controller/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

module.exports = authRouter;
