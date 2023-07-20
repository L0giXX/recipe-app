import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  imageURL: string;
}

async function SavedRecipes() {
  const res = await fetch("http://localhost:3000/api/recipe", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  const recipes: Recipe[] = data.recipes;
  return (
    <div className="my-10">
      <h1 className="flex text-4xl font-bold text-gray-900 mb-10 justify-center ">
        Saved Recipes
      </h1>
      <div className="flex flex-wrap justify-between mx-16 gap-10">
        {recipes.map((recipe) => (
          <Link
            href={`/saved-recipes/${recipe.name.toLowerCase()}/${recipe.id}`}
            key={recipe.id}
            className="flex flex-col border shadow rounded-lg overflow-hidden w-[300px]"
          >
            <Image
              width={300}
              height={300}
              className="h-40 object-cover"
              src={recipe.imageURL}
              alt={recipe.name}
            />
            <div className="p-5 flex flex-col h-full">
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
