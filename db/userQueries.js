const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
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

module.exports = { findById, create, update, deleteById };
