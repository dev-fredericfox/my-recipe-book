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

  let userTemp;
  if (session) {
    try {
      let user = await getUser(session?.user?.email);
      userTemp = user;
      if (!user[0].authorizedToPublish) {
        throw 402;
      } else {
        const author = { connect: { email: session?.user?.email } };
        const data = Object.assign(req.body, { author: author });
        const connectCategory = { connect: { name: req.body.category } };
        data.category = connectCategory;
        console.log(data);
        const result = await prisma.post.create({
          data: data,
        });
        let revalidation = await revalidateNow();
        res.status(200).json(result);
      }
    } catch (error) {
      if (error === 402) {
        res.status(200).json({
          error: `You do not have the permission to perform to post new recipes.`,
        });
      } else {
        res.status(500).send({
          message: "Database Error",
        });
      }
    }
  }
  if (!session) {
    res.status(403).send({
      message: "You need to be logged in to perform this action.",
    });
  }
}
