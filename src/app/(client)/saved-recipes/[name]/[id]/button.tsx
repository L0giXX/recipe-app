"use client";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/delete-button";

export default function Button(params: { id: string }) {
  const router = useRouter();

  async function deleteRecipe() {
    const res = await fetch(`/api/recipe/${params.id}`, {
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
    <DeleteButton
      onClick={deleteRecipe}
      className="absolute top-2 opacity-0 group-hover:opacity-100"
    />
  );
}
