import React from "react";
import Image from "next/image";

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  imageURL: string;
}

async function SpecificRecipe({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/recipe/${params.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  const recipe: Recipe = data.recipe;

  return (
    <div>
      <div className="flex justify-center my-5">
        <div className="flex flex-col border shadow overflow-hidden w-[600px] justify-center p-5 gap-2">
          <h1 className="flex text-4xl font-bold text-gray-900">
            {recipe.name}
          </h1>
          <p className="break-words">{recipe.description}</p>
          <Image
            width={600}
            height={600}
            className="object-cover"
            src={recipe.imageURL}
            alt={recipe.name}
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Ingredients
            </h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Instructions
            </h2>
            <ol>
              {recipe.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </div>
          <p className="mt-2">Cooking Time: {recipe.cookTime} Minutes</p>
        </div>
      </div>
    </div>
  );
}
export default SpecificRecipe;
