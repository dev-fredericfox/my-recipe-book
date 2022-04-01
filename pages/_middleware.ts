import type { NextFetchEvent, NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!req.url.includes("/admin/")) {
    return NextResponse.next();
  }
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  };
  const session = await getSession({ req: requestForNextAuth as unknown as any});

  if (session) {
    console.log(session);

    // validate your session here

    return NextResponse.next();
  } else {
    // the user is not logged in, redirect to the sign-in page
    const unauthorized = "unauthorized";
    const signInUrl = new URL(unauthorized, req.nextUrl.origin);
    signInUrl.searchParams.append("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }
}
