import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "../../lib/getAllPosts";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const feed = await getAllPosts();
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).send({
      message: "Database error",
    });
  }
}
