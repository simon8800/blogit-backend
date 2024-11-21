const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data: {
  //     name: "Simon",
  //     email: "simonmeinyc@gmail.com",
  //     posts: {
  //       create: { title: "Hello World" },
  //     },
  //     profile: {
  //       create: { bio: "I'm learning web development!" },
  //     },
  //   },
  // });

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });

  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });

  console.log(post);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
