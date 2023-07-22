"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "../../loading";

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  imageURL: string;
}

async function getSavedRecipes(id: string) {
  const res = await fetch(`http://localhost:3000/api/recipe/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  const recipe: Recipe = data.recipe;
  return recipe;
}

function SpecificRecipe({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  async function deleteRecipe() {
    const res = await fetch(`http://127.0.0.1:3000/api/recipe/${params.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
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

  useEffect(() => {
    (async () => {
      try {
        const fetchedRecipe = await getSavedRecipes(params.id);
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    })();
  }, [params.id]);

  return (
    <div>
      {recipe ? ( // Check if recipe is not null
        <div className="my-5 flex justify-center">
          <div className="flex w-[600px] flex-col justify-center gap-2 overflow-hidden border p-5 shadow group relative">
            <div className="flex flex-row justify-between">
              <h1 className="flex flex- text-4xl font-bold text-gray-900">
                {recipe.name}
              </h1>
              <button
                className="hidden group-hover:block w-10 h-10 border rounded-full items-center shrink-0 grow-0 bg-red-500 text-white font-bold justify-center"
                type="button"
                onClick={deleteRecipe}
              >
                X
              </button>
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
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default SpecificRecipe;
