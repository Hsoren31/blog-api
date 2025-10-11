const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

//Posts
async function createPost(userId, title, description, body, published) {
  const post = await prisma.post.create({
    data: {
      title,
      description,
      body,
      userId,
      published,
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

async function updatePost(postId, title, description, body, published) {
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      description,
      body,
      published,
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

async function readPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return posts;
}

async function readAuthor(authorName) {
  const author = await prisma.user.findFirst({
    where: {
      username: authorName,
    },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      posts: {
        where: {
          published: true,
        },
      },
    },
  });
  console.log(author);
  return author;
}

//Post Comments
async function readPostComments(postId) {
  const comments = prisma.comment.findMany({
    where: {
      postId,
      parentId: null,
    },
    include: {
      children: true,
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  return comments;
}

async function createComment(postId, userId, message, parentId) {
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

async function createChildComment(postId, userId, message, parentId) {
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
      parent: {
        connect: {
          id: parentId,
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
  readPosts,
  readAuthor,
  readPostComments,
  createComment,
  createChildComment,
  updateComment,
  deleteComment,
};
