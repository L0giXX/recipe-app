"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginRegister() {
  return (
    <div className="flex justify-center gap-40 text-2xl mt-40">
      <Login />
      <Register />
    </div>
  );
}

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler(e: any) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Unable to login, reason: ${data.error}`);
        return;
      }
      router.replace("/");
    } catch (err: any) {
      alert(`Unable to login, reason: ${err.message}`);
    }
  }

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-900 font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow border rounded w-full py-2 px-3 text-gray-900  focus:outline-none focus:shadow-outline"
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
          className="block text-gray-900 font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow rounded w-full py-2 px-3 text-gray-900 mb-3 focus:outline-none focus:shadow-outline"
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
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </form>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerHandler() {
    const data = { username: username, password: password };
    await fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-900 font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow border rounded w-full py-2 px-3 text-gray-900  focus:outline-none focus:shadow-outline"
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
          className="block text-gray-900 font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow border  rounded w-full py-2 px-3 text-gray-900 mb-3 focus:outline-none focus:shadow-outline"
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
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={registerHandler}
        >
          Register
        </button>
      </div>
    </form>
  );
};
