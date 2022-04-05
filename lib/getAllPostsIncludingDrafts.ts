import prisma from "./prisma";

export async function getAllPostsIncludingDrafts() {
  try {
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
