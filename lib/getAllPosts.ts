import prisma from "./prisma";

export async function getAllPosts() {
  const postFeed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: { name: true },
      },
    },
  });
  const modifiedFeed = postFeed.map((el) => {
    el.updatedAt = Date.parse(el.updatedAt.toString()) as unknown as Date
    el.createdAt = Date.parse(el.createdAt.toString()) as unknown as Date
    return el;
  });
  return modifiedFeed
}
