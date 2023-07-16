"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [isClient, setIsClient] = useState(false);

  function logoutHandler() {
    removeCookie("access_token");
  }

  useEffect(() => {
    if (cookies.access_token) {
      setIsClient(true);
    } else {
      setIsClient(false);
    }
  }, [cookies.access_token]);

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
            {!isClient ? (
              <Link href="/auth">Login/Register</Link>
            ) : (
              <Link href="/" onClick={logoutHandler}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
