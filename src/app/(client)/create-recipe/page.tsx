"use client";
import React, { useState, useEffect, ReactHTMLElement } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { set } from "zod";

function CreateRecipe() {
  const router = useRouter();
  const [cookies] = useCookies(["access_token"]);
  const [isClient, setIsClient] = useState(false);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [] as string[],
    instructions: [] as string[],
    cookTime: 0,
    image: "",
  });

  useEffect(() => {
    if (cookies.access_token) {
      setIsClient(true);
    } else {
      setIsClient(false);
    }
  }, [cookies.access_token]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  }
  function handleChangeIngredients(e: any, index: number) {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  }
  function handleChangeInstructions(e: any, index: number) {
    const { value } = e.target;
    const instructions = recipe.instructions;
    instructions[index] = value;
    setRecipe({ ...recipe, instructions });
  }
  // TODO: Image upload ändern (statt Bild, URL eingeben)
  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = URL.createObjectURL(e.target.files[0]);
    setRecipe({ ...recipe, image: file });
  }

  function addIngredient() {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }
  function addInstruction() {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  }

  if (!isClient) {
    return <div>Kein Cookie vorhanden</div>;
  } else {
    return (
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Recipe</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-900 font-bold mb-2"
              htmlFor="name"
            >
              Recipe name
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-900  focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-900 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow border rounded w-full py-2 px-3 text-gray-900  focus:outline-none focus:shadow-outline mb-4"
              placeholder="Enter description ..."
              id="description"
              name="description"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 font-bold mb-2"
              htmlFor="ingredients"
            >
              Ingredients
            </label>
            {recipe.ingredients.map((ingredient, index) => (
              <input
                key={index}
                className="shadow border rounded w-full py-2 px-3 text-gray-900  focus:outline-none focus:shadow-outline flex flex-col mb-2"
                id="ingredients"
                name="ingredients"
                type="text"
                value={ingredient}
                placeholder="Ingredient"
                onChange={(e) => handleChangeIngredients(e, index)}
                required
              />
            ))}
            <button
              onClick={addIngredient}
              type="button"
              className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Ingredient
            </button>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 font-bold mb-2"
              htmlFor="instructions"
            >
              Instructions
            </label>
            {recipe.instructions.map((instruction, index) => (
              <input
                key={index}
                className="shadow border rounded w-full py-2 px-3 text-gray-900  focus:outline-none focus:shadow-outline flex flex-col mb-2"
                id="instructions"
                name="instructions"
                type="text"
                value={instruction}
                placeholder="Instruction"
                onChange={(e) => handleChangeInstructions(e, index)}
                required
              />
            ))}
            <button
              onClick={addInstruction}
              type="button"
              className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Instruction
            </button>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 font-bold mb-2"
              htmlFor="cookTime"
            >
              Cooking Time
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-900  focus:outline-none focus:shadow-outline"
              id="cookTime"
              name="cookTime"
              type="number"
              placeholder="Cooking Time in minutes"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              placeholder="Image"
              onChange={handleChangeImage}
              required
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateRecipe;
