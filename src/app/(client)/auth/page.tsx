"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export default function LoginRegister() {
  return (
    <div className="mt-40 flex justify-center gap-40 text-2xl">
      <Login />
      <Register />
    </div>
  );
}
function Login() {
  const server = process.env.SERVER;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookie] = useCookies(["access_token"]);

  async function loginHandler() {
    try {
      const res = await fetch(`${server}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Unable to login, reason: ${data.error}`);
        return;
      }
      const token = await res.text();
      setCookie("access_token", token, { path: "/", maxAge: 60 * 60 * 24 });
      toast("Login successful!", {
        theme: "light",
        type: "success",
        autoClose: 1000,
      });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
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
          className="focus:shadow-outline mb-3 w-full rounded px-3 py-2 text-gray-900 shadow focus:outline-none"
          id="password"
          type="password"
          placeholder="******************"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-900 focus:outline-none"
          type="button"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </form>
  );
}

function Register() {
  const server = process.env.SERVER;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerHandler() {
    try {
      const res = await fetch(`${server}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Unable to sign up, reason: ${data.error}`);
        return;
      }
      toast("Sign up successful!", {
        theme: "light",
        type: "success",
        autoClose: 1000,
      });
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
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
          value={username}
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
  );
}
