import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = req.body.pathToRevalidate
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    console.log({ message: "Invalid token" })
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.unstable_revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send(err);
  }
}