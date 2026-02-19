import "@dotenvx/dotenvx/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//routers
import postsRouter from "./routes/postsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import authRouter from "./routes/authRouter.js";

import { verifyToken } from "./controller/authController.js";

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.get("/", verifyToken, (req, res) => res.json({ message: "hello world" }));

app.listen(3000, console.log("listening..."));
