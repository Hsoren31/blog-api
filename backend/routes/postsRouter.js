const { Router } = require("express");
const postsRouter = new Router();
const postController = require("../controller/postController");
const verifyToken = require("../controller/authController").verifyToken;
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

module.exports = postsRouter;
