import prisma from "./prisma";

export async function getAllPostIds () {
    const posts = await prisma.post.findMany({
        where: { published: true }
    })
    const postIds = posts.map(el => `/post/${el.id.toString()}`)
    return postIds
}