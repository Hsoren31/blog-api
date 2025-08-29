const { Router } = require("express");
const postsRouter = new Router();
const postController = require("../controller/postController");

//post crud operations
postsRouter.post("/", postController.createPost);
postsRouter.get("/:postId", postController.readPost);
postsRouter.put("/:postId", postController.updatePost);
postsRouter.delete("/:postId", postController.deletePost);

postsRouter.get("/", postController.readPosts);

//post comment crud operations
postsRouter.get("/:postId/comments", postController.readPostComments);
postsRouter.post("/:postId/comments", postController.createComment);
postsRouter.put("/:postId/comments/:commentId", postController.updateComment);
postsRouter.delete(
  "/:postId/comments/:commentId",
  postController.deleteComment
);

module.exports = postsRouter;
