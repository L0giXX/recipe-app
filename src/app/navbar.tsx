"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
function Navbar() {
  const [cookies, setCookie] = useCookies(["access_token"]);

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
            {!cookies.access_token ? (
              <Link href="/auth">Login/Register</Link>
            ) : (
              <button>Logout</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
