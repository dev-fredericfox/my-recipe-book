import prisma from "./prisma";

export async function getAllCategories() {
  const postFeed = await prisma.category.findMany({});
  const modifiedFeed = postFeed.map((el) => {
    console.log(el.updatedAt);
    console.log(typeof el.updatedAt);
    // el.updatedAt = Date.parse(el.updatedAt);
    // el.createdAt = Date.parse(el.createdAt);
    el.updatedAt = Date.parse(el.updatedAt.toString()) as unknown as Date
    el.createdAt = Date.parse(el.createdAt.toString()) as unknown as Date
    return el;
  });
  return modifiedFeed;
}
