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

async function getSavedRecipes(search: string | undefined) {
  const server = process.env.SERVER;
  if (search === undefined) {
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
  } else {
    const res = await fetch(`${server}/api/recipe/search/${search}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await res.json();
    return data.recipes;
  }
}
async function SavedRecipes({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const recipes = (await getSavedRecipes(search)) as Recipe[];

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
      <div className="flex flex-wrap justify-start gap-10 mx-10">
        {recipes.map((recipe) => (
          <Link
            href={`/saved-recipes/${recipe.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .trim()}/${recipe.id}`}
            key={recipe.id}
            className="mx-auto flex w-[300px] flex-col overflow-hidden rounded-lg border shadow"
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
