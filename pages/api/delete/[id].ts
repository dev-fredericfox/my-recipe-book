import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const postId = parseInt(req.query.id as string);

  if (session) {
    // Author has bug, but why?
    // const author = { connect: { email: session?.user?.email } };
    try {
      console.log("postId")
      console.log(postId)
      console.log("Trying...");
      const result = await prisma.post.delete({
        where: { id: postId },
      });
      console.log("result");
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Database Error",
      });
    }
  }

  if (!session) {
    res.status(403).send({
      message: "You need to be logged in to perform this action.",
    });
  }

  // console.log("result");
  // console.log(session);
}
