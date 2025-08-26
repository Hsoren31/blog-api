const db = require("../db/postQueries.js");

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

module.exports = {
  createPost,
  readPost,
  updatePost,
  deletePost,
};
