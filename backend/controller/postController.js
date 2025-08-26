const db = require("../db/postQueries.js");

//CRUD Post
async function readPost(req, res) {
  try {
    const { postId } = req.params;
    const post = await db.readPost(postId);
    res.json({ post });
  } catch (error) {
    res.json({ error: "Could not find post." });
  }
}

async function createPost(req, res) {
  try {
    const { userId, title, body } = req.body;
    const post = await db.createPost(userId, title, body);
    res.json({ post });
  } catch (error) {
    res.json({ error: "Could not create Post." });
  }
}

async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { title, body } = req.body;
    const post = await db.updatePost(postId, title, body);
    res.json({ post });
  } catch (error) {
    res.json({ error: "Could not find post to update" });
  }
}

async function deletePost(req, res) {
  try {
    const { postId } = req.params;
    await db.deletePost(postId);
    res.json({ message: "Post delete successfully." });
  } catch (error) {
    res.json({ message: "Could not find post to delete." });
  }
}

//CRUD comments
async function readPostComments(req, res) {
  try {
    const { postId } = req.params;
    const comments = await db.readPostComments(postId);
    res.json({ comments });
  } catch (error) {
    res.json({ message: "Could not get comments" });
  }
}

async function createComment(req, res) {
  try {
    const { postId, userId, message } = req.body;
    const comment = await db.createComment(postId, userId, message);
    res.json({ comment });
  } catch (error) {
    res.json({ message: "Could not create comment." });
  }
}

async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { message } = req.body;
    const comment = await db.updateComment(commentId, message);
    res.json({ comment });
  } catch (error) {
    res.json({ message: "Could not find comment to update" });
  }
}

async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    await db.deleteComment(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ message: "Could not find comment to delete." });
  }
}

module.exports = {
  createPost,
  readPost,
  updatePost,
  deletePost,
  readPostComments,
  createComment,
  updateComment,
  deleteComment,
};
