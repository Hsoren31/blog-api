const { Router } = require("express");
const postsRouter = new Router();
const postController = require("../controller/postController");

//post crud operations
postsRouter.post("/", postController.createPost);
postsRouter.get("/:postId", postController.readPost);
postsRouter.put("/:postId", postController.updatePost);
postsRouter.delete("/:postId", postController.deletePost);

//post comment crud operations
postsRouter.get("/:postId/comments", (req, res) =>
  res.send("get all post comments")
);
postsRouter.post("/:postId/comments", (req, res) =>
  res.send("create new comment on a post")
);
postsRouter.put("/:postId/comments/:commentId", (req, res) =>
  res.send(`update ${req.params.postId} post comment ${req.params.commentId}`)
);
postsRouter.delete("/:postId/comments/:commentId", (req, res) =>
  res.send(`delete ${req.params.postId} post comment ${req.params.commentId}`)
);

module.exports = postsRouter;
