import React from "react";
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }:LayoutProps) {
  return (
    <div className="bg-slate-100">
      <div className="w-10/12 mx-auto flex flex-col min-h-screen h-full pb-4">
        <main className="grow">{children}</main>
        <footer className="mx-auto"><Footer/></footer>
      </div>
    </div>
  );
}
