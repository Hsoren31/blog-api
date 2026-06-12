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

export { createUser, readUser, updateUser, deleteUser, findIfUsernameExists };
