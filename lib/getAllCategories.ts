import prisma from "./prisma";

export async function getAllCategories() {
  const postFeed = await prisma.category.findMany({});
  const modifiedFeed = postFeed.map((el) => {
    el.updatedAt = Date.parse(el.updatedAt);
    el.createdAt = Date.parse(el.createdAt);
    return el;
  });
  return modifiedFeed;
}
