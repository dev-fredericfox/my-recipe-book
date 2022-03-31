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

  if (session) {
    const author = { connect: { email: session?.user?.email } };
    const data = Object.assign(req.body, { author: author });
    const connectCategory = { connect: { name: req.body.category } };
    data.category = connectCategory
    console.log(data);
    try {
      console.log("Trying...");
      const result = await prisma.post.create({
        data: data,
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
