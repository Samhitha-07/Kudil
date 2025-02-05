import React from "react";

const Navbar = () => (
  <nav className="bg-teal-700 text-white p-4 flex justify-between">
    <h1 className="text-xl font-bold">Affordable Housing</h1>
    <div>
      <a href="/search" className="mx-2">Search</a>
      <a href="/profile" className="mx-2">Profile</a>
      <a href="/chat" className="mx-2">Chat</a>
    </div>
  </nav>
);

export default Navbar;
