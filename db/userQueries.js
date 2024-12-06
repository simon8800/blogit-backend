const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getHandleFromEmail = (email) => email.split('@')[0];

const findById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true
    }
  });

  if (user) {
    return {
      ...user,
      handle: getHandleFromEmail(user.email)
    };
  }
  return user;
};

const findByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user;
};

const findByEmailBasicInfo = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      email: true,
      id: true,
    },
  });
  return user;
};

const create = async ({ email, name, hash }) => {
  const createdUser = await prisma.user.create({
    data: {
      email,
      name,
      hash,
    },
    select: {
      email: true,
      name: true,
    },
  });
  return createdUser;
};

const update = async (id, name) => {
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      name: name,
    },
  });
  return updatedUser;
};

const deleteById = async (id) => {
  const deletedUser = await prisma.user.delete({
    where: { id: id },
  });
  return deletedUser;
};

module.exports = {
  findById,
  findByEmail,
  findByEmailBasicInfo,
  create,
  update,
  deleteById,
};
