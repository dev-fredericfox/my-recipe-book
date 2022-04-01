import prisma from "./prisma";

export async function getUser(email: string | null | undefined) {
  const user = await prisma.user.findMany({
    where: { email: email }
  });
  const userFormatted = user.map((el) => {
    el.updatedAt = Date.parse(el.updatedAt.toString()) as unknown as Date
    el.createdAt = Date.parse(el.createdAt.toString()) as unknown as Date
    return el;
  });
  return userFormatted;
}
