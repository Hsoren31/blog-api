import { prisma } from "../lib/prisma.js";

async function createUser(name, username, password) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
    include: {
      password: false,
    },
  });
  const profile = await prisma.profile.create({
    data: {
      name,
      users: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      users: {
        select: {
          username: true,
        },
      },
    },
  });
  return profile;
}

async function readUser(username) {
  const user = await prisma.profile.findFirst({
    where: {
      users: {
        username,
      },
    },
    include: {
      users: {
        select: {
          username: true,
        },
      },
    },
  });
  return user;
}

async function updateUser({ id, name, username }) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      username,
    },
    include: {
      password: false,
    },
  });
  return user;
}

async function deleteUser(id) {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function findIfUsernameExists(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
}

async function followUser(followerId, followingUsername) {
  const followingId = await prisma.profile.findFirst({
    where: {
      users: {
        username: followingUsername,
      },
    },
    select: {
      id: true,
    },
  });
  const followedById = await prisma.profile.findFirst({
    where: {
      users: {
        id: followerId,
      },
    },
    select: {
      id: true,
    },
  });
  return await prisma.follows.create({
    data: {
      followedBy: {
        connect: { id: followedById.id },
      },
      following: {
        connect: { id: followingId.id },
      },
    },
  });
}

async function unfollowUser(followerUserId, followingUsername) {
  const followedById = await prisma.profile.findFirst({
    where: {
      userId: followerUserId,
    },
    select: {
      id: true,
    },
  });
  const followingId = await prisma.profile.findFirst({
    where: {
      users: {
        username: followingUsername,
      },
    },
    select: {
      id: true,
    },
  });
  return await prisma.follows.delete({
    where: {
      followedById_followingId: {
        followedById: followedById.id,
        followingId: followingId.id,
      },
    },
  });
}

async function checkFollowsConnection(followedByUserId, followingUsername) {
  const followedById = await prisma.profile.findFirst({
    where: {
      userId: followedByUserId,
    },
    select: {
      id: true,
    },
  });
  const followingId = await prisma.profile.findFirst({
    where: {
      users: {
        username: followingUsername,
      },
    },
    select: {
      id: true,
    },
  });
  return await prisma.follows.findFirst({
    where: {
      followedById: followedById.id,
      followingId: followingId.id,
    },
  });
}

export {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  findIfUsernameExists,
  followUser,
  unfollowUser,
  checkFollowsConnection,
};
