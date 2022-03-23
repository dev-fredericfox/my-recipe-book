import prisma from "./prisma";

export async function getPost(id: number) {
  const post = await prisma.post.findMany({
    where: { AND: { published: true, id: id } },
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: { name: true },
      },
    },
  });
  const postFormatted = post.map((el) => {
    el.updatedAt = Date.parse(el.updatedAt);
    el.createdAt = Date.parse(el.createdAt);
    return el;
  });
  return postFormatted;
}
