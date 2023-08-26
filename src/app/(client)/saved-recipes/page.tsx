import React from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "./search";

type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  imageURL: string;
};

async function getSavedRecipes() {
  const server = process.env.SERVER;
  const res = await fetch(`${server}/api/recipe`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }
  const data = await res.json();
  return data.recipes;
}

async function SavedRecipes({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

  const recipes = (await getSavedRecipes()) as Recipe[];
  // Filter recipes by search
  const filteredRecipes = search
    ? recipes.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()))
    : recipes;
  return (
    <div className="my-10">
      <div className="flex flex-col gap-2">
        <h1
          className="flex justify-center text-4xl font-bold 
      text-gray-900"
        >
          Saved Recipes
        </h1>
        <Search />
      </div>
      <div className="flex flex-wrap gap-12 w-full justify-center">
        {filteredRecipes.map((recipe) => (
          <Link
            href={`/saved-recipes/${recipe.name.toLowerCase().replace(/\s+/g, "").trim()}/${
              recipe.id
            }`}
            key={recipe.id}
            className="flex flex-col overflow-hidden rounded-lg border shadow w-[300px]"
          >
            <Image
              width={300}
              height={300}
              className="h-40 object-cover"
              src={recipe.imageURL}
              alt={recipe.name}
            />
            <div className="flex flex-col p-5">
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
