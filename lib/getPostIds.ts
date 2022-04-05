import prisma from "./prisma";

export async function getAllPostIds() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
    });
    const postIds = posts.map((el) => `/post/${el.id.toString()}`);
    return postIds;
  } catch (error) {
    console.log("Database connection error");
  } finally {
    await prisma.$disconnect();
  }
}
