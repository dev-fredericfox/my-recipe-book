import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }:LayoutProps) {
  return (
    <div className="bg-slate-100 ">
      <div className="w-10/12 mx-auto flex flex-col h-screen">
        <main className="grow">{children}</main>
        <footer className="bottom-0 mx-auto">About - Imprint - Data</footer>
      </div>
    </div>
  );
}
