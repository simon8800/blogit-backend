const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
    },
  });
  return post;
};

const create = async ({ title, content, authorEmail }) => {
  const createdPost = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  return createdPost;
};

const update = async (id, title, content) => {
  const updatedPost = await prisma.post.update({
    where: { id: id },
    data: {
      title,
      content,
    },
  });
  return updatedPost;
};

const deleteById = async (id) => {
  const deletedPost = await prisma.post.delete({
    where: { id: id },
  });
  return deletedPost;
};

module.exports = { findById, create, update, deleteById };
