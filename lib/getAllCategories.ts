import prisma from "./prisma";

export async function getAllCategories() {
  try {
    const postFeed = await prisma.category.findMany({});
    const modifiedFeed = postFeed.map((el) => {
      el.updatedAt = Date.parse(el.updatedAt.toString()) as unknown as Date;
      el.createdAt = Date.parse(el.createdAt.toString()) as unknown as Date;
      return el;
    });
    return modifiedFeed;
  } catch (error) {
    console.log("Database connection error");
  } finally {
    await prisma.$disconnect();
  }
}
