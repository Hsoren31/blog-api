const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createUser(name, username, password) {
  const user = await prisma.user.create({
    data: {
      name,
      username,
      password,
    },
    include: {
      password: false,
    },
  });
  return user;
}

async function readUser(id) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      username: true,
      posts: true,
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

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  findIfUsernameExists,
};
