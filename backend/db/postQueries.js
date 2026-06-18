import { prisma } from "../lib/prisma.js";

//Posts
async function createPost(
  userId,
  title,
  description,
  body,
  published,
  tagNames
) {
  const { id } = await prisma.profile.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });
  const post = await prisma.post.create({
    data: {
      title,
      description,
      body,
      published,
      author: {
        connect: {
          id,
        },
      },
      tags: {
        connectOrCreate: tagNames.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
    },
    include: {
      tags: true,
    },
  });
  return post;
}

async function readPost(id) {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      comments: true,
      tags: true,
    },
  });
  return post;
}

async function updatePost(
  postId,
  title,
  description,
  body,
  published,
  tagNames
) {
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      description,
      body,
      published,
      tags: {
        deleteMany: {},
        connectOrCreate: tagNames.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
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
      author: {
        select: {
          name: true,
        },
      },
      tags: true,
    },
  });
  return posts;
}

async function readAuthor(authorName) {
  const author = await prisma.profile.findFirst({
    where: {
      users: {
        username: authorName,
      },
    },
    include: {
      posts: {
        where: {
          published: true,
        },
      },
      following: true,
      followedBy: true,
    },
  });
  return author;
}

//Post Comments
async function readPostComments(postId) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentId: null,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      children: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  return comments;
}

async function createComment(postId, userId, message, parentId) {
  const profileId = await prisma.profile.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });
  const comment = await prisma.comment.create({
    data: {
      post: {
        connect: {
          id: postId,
        },
      },
      author: {
        connect: {
          id: profileId.id,
        },
      },
      text: message,
      parent: parentId ? { connect: { id: parentId } } : undefined,
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

async function getPostUserId(postId) {
  const { author } = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      author: {
        select: {
          userId: true,
        },
      },
    },
  });
  return author.userId;
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
  getPostUserId,
};
