const { Router } = require("express");
const postsRouter = new Router();

postsRouter.get("/", (req, res) => res.send("get all posts"));
postsRouter.post("/", (req, res) => res.json(req.body));
postsRouter.put("/:postId", (req, res) =>
  res.send(`update ${req.params.postId} post`)
);
postsRouter.delete("/:postId", (req, res) =>
  res.send(`delete ${req.params.postId} post`)
);

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
