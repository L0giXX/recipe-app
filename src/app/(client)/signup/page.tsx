"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const server = process.env.SERVER;
  const router = useRouter();
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerHandler() {
    try {
      const res = await fetch(`${server}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      toast("Sign up successful!", {
        theme: "light",
        type: "success",
        autoClose: 1000,
      });
      setUsername("");
      setPassword("");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="my-20 flex flex-wrap justify-center gap-40 text-2xl">
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-900"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="focus:shadow-outline w-full rounded border px-3 py-2 text-gray-900  shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={name}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block font-bold text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="focus:shadow-outline mb-3  w-full rounded border px-3 py-2 text-gray-900 shadow focus:outline-none"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-900 focus:outline-none"
            type="button"
            onClick={registerHandler}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
