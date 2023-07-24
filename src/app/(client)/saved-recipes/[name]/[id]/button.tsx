"use client";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Button(params: { id: string }) {
  const router = useRouter();

  async function deleteRecipe() {
    const server = process.env.SERVER;
    const res = await fetch(`${server}/api/recipe/${params.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    toast("Recipe deleted!", {
      theme: "light",
      type: "success",
      autoClose: 1000,
    });
    router.push("/saved-recipes");
  }
  return (
    <button
      className="hidden group-hover:block w-10 h-10 border rounded-full items-center shrink-0 grow-0 bg-red-500 text-white font-bold justify-center"
      type="button"
      onClick={deleteRecipe}
    >
      X
    </button>
  );
}
