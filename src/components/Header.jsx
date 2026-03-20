import React from "react";

function Header() {
  return (
    <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <nav className="flex gap-6 text-sm">
        <a href="/" className="hover:underline">
          Dashboard
        </a>
      </nav>
    </header>
  );
}

export default Header;
