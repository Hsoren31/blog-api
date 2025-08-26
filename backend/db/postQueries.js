const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

//Posts
async function createPost(userId, title, body) {
  const post = await prisma.post.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return post;
}

async function readPost(id) {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
  });
  return post;
}

async function updatePost(postId, title, body) {
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      body,
    },
  });
  return post;
}

async function deletePost(postId) {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
}

//Post Comments
async function readPostComments(postId) {
  const comments = prisma.comment.findMany({
    where: {
      postId,
    },
  });
  return comments;
}

async function createComment(postId, userId, message) {
  const comment = await prisma.comment.create({
    data: {
      message,
      author: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });
  return comment;
}

async function updateComment(commentId, message) {
  const comment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      message,
    },
  });
  return comment;
}

async function deleteComment(commentId) {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
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
