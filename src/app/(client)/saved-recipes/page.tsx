import React from "react";
import Image from "next/image";
import Link from "next/link";
import prisma from "../../../utils/prisma";

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  imageURL: string;
}

async function getSavedRecipes() {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/recipe", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function SavedRecipes() {
  const data = await getSavedRecipes();
  const recipes: Recipe[] = data.recipes;

  return (
    <div className="my-10">
      <h1
        className="mb-10 flex justify-center text-4xl font-bold 
      text-gray-900"
      >
        Saved Recipes
      </h1>
      <div className="flex flex-wrap justify-start gap-10 mx-10">
        {recipes.map((recipe) => (
          <Link
            href={`/saved-recipes/${recipe.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .trim()}/${recipe.id}`}
            key={recipe.id}
            className="mx-auto flex w-[300px] flex-col overflow-hidden rounded-lg 
            border shadow"
          >
            <Image
              width={300}
              height={300}
              className="h-40 object-cover"
              src={recipe.imageURL}
              alt={recipe.name}
            />
            <div className="flex h-full flex-col p-5">
              <h2 className="text-2xl font-semibold">{recipe.name}</h2>
              <p className="break-words">{recipe.description}</p>
              <div className="mt-auto">
                <p className="mt-2">Cooking Time: {recipe.cookTime} Minutes</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SavedRecipes;
