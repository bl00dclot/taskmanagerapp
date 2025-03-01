// components/Layout.tsx
import React from "react";
import "./styles/globals.css"; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
    <div className="min-h-screen bg-black text-red-500 font-[Creepster, cursive]">
      <header className="py-8 text-center border-b border-red-600">
        <h1 className="text-5xl uppercase tracking-widest font-bold">
          Satanic Deeds Task Manager
        </h1>
        <p className="mt-4 text-xl italic">
          Embrace the darkness in every task
        </p>
      </header>
      <main className="container mx-auto p-8">{children}</main>
      <footer className="text-center py-4 border-t border-red-600 mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Satanic Deeds Inc.
        </p>
      </footer>
    </div>
    </body>
    </html>
  );
};

export default Layout;
