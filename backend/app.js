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

app.use(
  cors({
    origin: [
      process.env.BLOG_URL,
      process.env.AUTHOR_URL,
      "http://localhost:5173/",
      "http://localhost:5174/",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.get("/api/", verifyToken, (req, res) =>
  res.json({ message: "hello world" })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`App listening on port ${PORT}`));
