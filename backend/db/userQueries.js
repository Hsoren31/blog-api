const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

async function createUser(firstName, lastName, email, username, password) {
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
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
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      posts: true,
    },
  });
  return user;
}

async function updateUser({ id, firstName, lastName, email, username }) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      email,
      username,
    },
    include: {
      password: false,
    },
  });
  return user;
}

async function deleteUser(id) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

async function findIfUserExists(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
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
  findIfUserExists,
  findIfUsernameExists,
};
