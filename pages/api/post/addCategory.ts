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
  const data = req.body;

  if (session) {
    try {
      console.log("Trying...", data);
      const result = await prisma.category.create({
        data: data,
      });
      console.log("result");
      console.log(result);
      res.status(200).json(result);
    } catch (error:any) {
      if (error.code === "P2002") {
        res.status(510).send({
          message: "Duplicate Category",
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

  // console.log("result");
  // console.log(session);
}
