import Link from "next/link";
import Router from "next/router";

import { signOut, useSession } from "next-auth/react";

const dash = <span className="mx-2">-</span>;

const activeSession = (
  <div className="text-center text-gray-500 flex flex-row">
    <div>
      <Link href="/admin/dashboard">Dashboard</Link>
    </div>
    {dash}
    <div>
      <Link href="/admin/create">New Post</Link>
    </div>
    {dash}
    <div className="cursor-pointer" onClick={() => signOut().then(() => Router.push("/"))}>Logout</div>
  </div>
);

const inactiveSession = (
  <div className="text-center text-gray-500 flex flex-row">
    <Link href="/about">About</Link> {dash}
    <Link href="/imprint">Imprint</Link> {dash}
    <Link href="/data">Data</Link> {dash}
    <div>
      <Link href="/api/auth/signin">Login</Link>
    </div>
  </div>
);

export default function Footer() {
  const { data: session } = useSession();
  return (
    <div className="mt-6">
      <div>{session && activeSession}</div>
      <div>{!session && inactiveSession}</div>
      {/* <div>{session}</div> */}
    </div>
  );
}
