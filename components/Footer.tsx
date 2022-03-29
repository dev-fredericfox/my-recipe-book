import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const dash = <span className="mx-2">-</span>;

const activeSession = (
  <div className="text-center text-gray-500 flex flex-row">
    <div><Link href="/dashboard">Post Overview</Link></div> {dash}
    <div><Link href="/create">New Post</Link></div> {dash}
    <div onClick={() => signOut()}>Logout</div>
  </div>
);

const inactiveSession = (
  <div className="text-center text-gray-500 flex flex-row">
    <div>About</div> {dash}
    <div>Imprint</div> {dash}
    <div>Data</div> {dash}
    <div>
      <Link href="/api/auth/signin">Login</Link>
    </div>
  </div>
);

export default function Footer() {
  const { data: session, status } = useSession();
  return (
    <div>
      <p>Session status: {status}</p>
      <div>{session && activeSession}</div>
      <div>{!session && inactiveSession}</div>
      {/* <div>{session}</div> */}
    </div>
  );
}
