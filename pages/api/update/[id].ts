import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getUser } from "../../../lib/getUser";
import { revalidateNow } from "../../../lib/revalidateHelper";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const postId = parseInt(req.query.id as string);

  let userTemp;
  if (session) {
    try {
      let user = await getUser(session?.user?.email);
      userTemp = user;
      if (!user[0].authorizedToPublish) {
        throw 402;
      } else {
        const data = Object.assign(req.body);
        const connectCategory = { connect: { name: req.body.category } };
        data.category ? (data.category = connectCategory) : null;
        const result = await prisma.post.update({
          where: { id: postId },
          data: data,
        });
        console.log(postId)
        let revalidationIndex = await revalidateNow(`/`);
        let revalidation = await revalidateNow(`/post/${postId}`);
        res.status(200).json(result);
      }
    } catch (error) {
      if (error === 402) {
        res.status(200).json({
          error: `You do not have the permission to update recipes.`,
        });
      } else {
        res.status(500).send({
          message: "Database error",
        });
      }
    }
  }

  if (!session) {
    res.status(403).send({
      message: `You need to be logged in to perform this action.`,
    });
  }
}
