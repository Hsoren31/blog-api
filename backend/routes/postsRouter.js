import { Router } from "express";
import * as postController from "../controller/postController.js";
import { verifyToken } from "../controller/authController.js";
const postsRouter = new Router();

//post crud operations
postsRouter.post("/", verifyToken, postController.createPost);
postsRouter.get("/:postId", verifyToken, postController.readPost);
postsRouter.put("/:postId", verifyToken, postController.updatePost);
postsRouter.delete("/:postId", verifyToken, postController.deletePost);

postsRouter.get("/", postController.readPosts);
postsRouter.get("/author/:authorName", verifyToken, postController.readAuthor);
//post comment crud operations
postsRouter.get("/:postId/comments", postController.readPostComments);
postsRouter.post(
  "/:postId/comments",
  verifyToken,
  postController.createComment
);
postsRouter.put(
  "/:postId/comments/:commentId",
  verifyToken,
  postController.updateComment
);
postsRouter.delete(
  "/:postId/comments/:commentId",
  verifyToken,
  postController.deleteComment
);

export default postsRouter;
