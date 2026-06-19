import * as db from "../db/postQueries.js";

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
    const { title, description, body, published, tags } = req.body;
    const id = req.user.id;
    if (!id) {
      return res.status(401).json({ error: "Authorization failed." });
    }
    const post = await db.createPost(
      id,
      title,
      description,
      body,
      published,
      tags
    );
    res.json({ post });
  } catch (error) {
    console.log(error);
    res.json({ error: "Could not create Post." });
  }
}

async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { title, description, body, published, tags } = req.body;

    // Check if post exists
    const postExists = await db.readPost(postId);
    if (!postExists) {
      return res.status(404).json({ error: "Cannot find post." });
    }

    // Check if user is author of post
    const userId = await db.getPostUserId(postId);
    if (req.user.id !== userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to change this post." });
    }

    const post = await db.updatePost(
      postId,
      title,
      description,
      body,
      published,
      tags
    );
    res.json({ post });
  } catch (error) {
    console.error(error);
    res.json({ error: "Something unexpected occured." });
  }
}

async function deletePost(req, res) {
  try {
    const { postId } = req.params;

    //Check if post exists
    const postExists = await db.readPost(postId);
    if (!postExists) {
      return res.status(404).json({ error: "Could not find post to delete." });
    }

    // Check if user is author of post
    const authorId = await db.getPostUserId(postId);
    if (req.user.id !== authorId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete post." });
    }

    await db.deletePost(postId);
    res.json({ message: "Post delete successfully." });
  } catch (error) {
    res.json({ message: "Could not find post to delete." });
  }
}

async function readPosts(req, res) {
  try {
    const posts = await db.readPosts();
    res.json({ posts });
  } catch (error) {
    res.json({ message: "Could not retrieve posts. Try again." });
  }
}

async function readAuthor(req, res) {
  try {
    const { authorName } = req.params;
    const author = await db.readAuthor(authorName);
    if (!author) {
      return res.status(404).json({ error: "Could not find Author." });
    }
    res.json({ author });
  } catch (err) {
    res.json({ message: "Could not retrieve Author. Try Again." });
  }
}

//CRUD comments
async function readPostComments(req, res) {
  try {
    const { postId } = req.params;
    const post = await db.readPost(postId);
    if (!post) {
      return res.status(404).json({ error: "Could not find Post." });
    }
    const comments = await db.readPostComments(postId);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something unexpected occured." });
  }
}

async function createComment(req, res) {
  try {
    const { postId } = req.params;
    const { message, parentId } = req.body;
    const post = await db.readPost(postId);
    if (!post) {
      return res
        .status(404)
        .json({ error: "Could not find Post to comment on." });
    }
    const comment = await db.createComment(
      postId,
      req.user.id,
      message,
      parentId
    );
    res.json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something unexpected occured." });
  }
}

async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { message } = req.body;
    const commentExists = await db.readComment(commentId);
    if (!commentExists) {
      return res.status(404).json({ error: "Could not find comment." });
    }
    const comment = await db.updateComment(commentId, message);
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something unexpected occured." });
  }
}

async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    const commentExists = await db.readComment(commentId);
    if (!commentExists) {
      return res.status(404).json({ error: "Could not find comment." });
    }
    await db.deleteComment(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something unexpected occured." });
  }
}

export {
  createPost,
  readPost,
  updatePost,
  deletePost,
  readPosts,
  readAuthor,
  readPostComments,
  createComment,
  updateComment,
  deleteComment,
};
