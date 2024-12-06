const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getHandleFromEmail = (email) => email.split('@')[0];

const findById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      published: true,
      author: {
        select: {
          id: true,
          email: true
        }
      }
    },
  });

  if (post) {
    return {
      ...post,
      author: {
        ...post.author,
        handle: getHandleFromEmail(post.author.email)
      }
    };
  }
  return post;
};

const findByAuthorId = async (authorId) => {
  const posts = await prisma.post.findMany({
    where: { authorId },
    orderBy: {
      updatedAt: 'desc'
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      published: true,
      author: {
        select: {
          id: true,
          email: true
        }
      }
    }
  });

  return posts.map(post => ({
    ...post,
    author: {
      ...post.author,
      handle: getHandleFromEmail(post.author.email)
    }
  }));
};

const getLatestPosts = async (limit = 10) => {
  // Ensure limit is a number and is positive
  const take = Math.max(1, parseInt(limit) || 10);
  
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      publishedAt: {
        not: null
      }
    },
    orderBy: {
      publishedAt: 'desc'
    },
    take,
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      author: {
        select: {
          email: true
        }
      }
    }
  });

  return posts.map(post => ({
    ...post,
    author: {
      handle: getHandleFromEmail(post.author.email)
    }
  }));
};

const create = async ({ title, content, authorId, published }) => {
  const createdPost = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { id: authorId } },
      published: published || false,
      publishedAt: published ? new Date() : null
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      published: true,
      author: {
        select: {
          email: true
        }
      }
    }
  });

  return {
    ...createdPost,
    author: {
      handle: getHandleFromEmail(createdPost.author.email)
    }
  };
};

const update = async (id, { title, content }) => {
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(content && { content }),
      updatedAt: new Date()
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      published: true,
      author: {
        select: {
          email: true
        }
      }
    }
  });

  return {
    ...updatedPost,
    author: {
      ...updatedPost.author,
      handle: getHandleFromEmail(updatedPost.author.email)
    }
  };
};

const togglePublish = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id },
    select: { published: true }
  });

  const now = new Date();
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      published: !post.published,
      publishedAt: !post.published ? now : null,
      updatedAt: now
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      published: true,
      author: {
        select: {
          id: true,
          email: true
        }
      }
    }
  });

  return {
    ...updatedPost,
    author: {
      ...updatedPost.author,
      handle: getHandleFromEmail(updatedPost.author.email)
    }
  };
};

const deleteById = async (id) => {
  const deletedPost = await prisma.post.delete({
    where: { id: id },
  });
  return deletedPost;
};

module.exports = { findById, findByAuthorId, create, update, deleteById, getLatestPosts, togglePublish };
