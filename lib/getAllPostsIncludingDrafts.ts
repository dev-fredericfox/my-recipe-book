import prisma from "./prisma";

export async function getAllPostsIncludingDrafts() {
  const postFeed = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: { name: true, categoryEmoji: true },
      },
    },
  });
  const modifiedFeed = postFeed.map((el) => {
    el.updatedAt = Date.parse(el.updatedAt);
    el.createdAt = Date.parse(el.createdAt);
    return el;
  });
  return modifiedFeed
}
