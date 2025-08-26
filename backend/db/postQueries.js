const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

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

module.exports = {
  createPost,
  readPost,
  updatePost,
  deletePost,
};
