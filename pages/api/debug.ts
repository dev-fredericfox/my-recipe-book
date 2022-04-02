import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function foo(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in. "+JSON.stringify(session),
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page. "+JSON.stringify(session),
    });
  }
}
