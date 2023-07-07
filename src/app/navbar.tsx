import React from "react";
import Link from "next/link";
function Navbar() {
  return (
    <nav className="bg-gray-900 border-gray-200 py-6  ">
      <div className="container flex items-center mx-auto justify-center">
        <ul className="flex text-4xl text-slate-100">
          <li className="mx-20">
            <Link href="/">Home</Link>
          </li>
          <li className="mx-20">
            <Link href="/create-recipe">Create Recipe</Link>
          </li>
          <li className="mx-20">
            <Link href="/saved-recipes">Saved Recipe</Link>
          </li>
          <li className="mx-20">
            <Link href="/auth">Login/Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
