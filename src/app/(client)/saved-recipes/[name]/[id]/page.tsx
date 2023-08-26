import React from "react";
import Image from "next/image";
import Button from "./button";

type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  imageURL: string;
};

async function getSavedRecipes(id: string) {
  const server = process.env.SERVER;
  const res = await fetch(`${server}/api/recipe/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return data.recipe;
}

async function SpecificRecipe({ params }: { params: { id: string } }) {
  const recipe = (await getSavedRecipes(params.id)) as Recipe;

  return (
    <div className="my-5 flex justify-center">
      <div className="group relative flex w-[600px] flex-col justify-center gap-2 overflow-hidden border p-5 shadow">
        <div className="relative flex flex-row justify-between">
          <h1 className="flex- flex text-4xl font-bold text-gray-900">
            {recipe.name}
          </h1>
          <Button id={params.id} />
        </div>
        <p className="break-words">{recipe.description}</p>
        <Image
          width={600}
          height={600}
          className="object-cover"
          src={recipe.imageURL}
          alt={recipe.name}
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Ingredients</h2>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </div>
        <p className="mt-2">Cooking Time: {recipe.cookTime} Minutes</p>
      </div>
    </div>
  );
}

export default SpecificRecipe;
