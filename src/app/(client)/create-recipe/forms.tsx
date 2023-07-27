"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Forms() {
  const router = useRouter();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [] as string[],
    instructions: [] as string[],
    cookTime: 0,
    imageURL: "",
  });

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

  function addIngredient() {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }

  function addInstruction() {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const server = process.env.SERVER;
    try {
      const res = await fetch(`${server}/api/recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Unable to create recipe, reason: ${data.error}`);
        return;
      }
      router.push("/");
    } catch (err: any) {
      alert(`Unable to create recipe, reason: ${err.message}`);
    }
  }
  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Create Recipe</h1>
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-900" htmlFor="name">
            Recipe name
          </label>
          <input
            className="focus:shadow-outline w-full rounded border px-3 py-2 text-gray-900  shadow focus:outline-none"
            id="name"
            name="name"
            type="text"
            placeholder="Enter Recipe Name ..."
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            className="mb-2 block font-bold text-gray-900"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="focus:shadow-outline mb-4 w-full rounded border px-3 py-2  text-gray-900 shadow focus:outline-none"
            placeholder="Enter Description ..."
            id="description"
            name="description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-900"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              className="focus:shadow-outline mb-2 flex w-full flex-col rounded border  px-3 py-2 text-gray-900 shadow focus:outline-none"
              id="ingredients"
              name="ingredients"
              type="text"
              value={ingredient}
              placeholder="Enter Ingredient ..."
              onChange={(e) => handleChangeIngredients(e, index)}
              required
            />
          ))}
          <button
            onClick={addIngredient}
            type="button"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-900 focus:outline-none"
          >
            Add Ingredient
          </button>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-900"
            htmlFor="instructions"
          >
            Instructions
          </label>
          {recipe.instructions.map((instruction, index) => (
            <input
              key={index}
              className="focus:shadow-outline mb-2 flex w-full flex-col rounded border  px-3 py-2 text-gray-900 shadow focus:outline-none"
              id="instructions"
              name="instructions"
              type="text"
              value={instruction}
              placeholder="Enter Instruction ..."
              onChange={(e) => handleChangeInstructions(e, index)}
              required
            />
          ))}
          <button
            onClick={addInstruction}
            type="button"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-900 focus:outline-none"
          >
            Add Instruction
          </button>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-900"
            htmlFor="cookTime"
          >
            Cooking Time
          </label>
          <input
            className="focus:shadow-outline w-full rounded border px-3 py-2 text-gray-900  shadow focus:outline-none"
            id="cookTime"
            name="cookTime"
            type="number"
            placeholder="Enter Cooking Time in minutes ..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-900" htmlFor="name">
            Image URL
          </label>
          <input
            className="focus:shadow-outline w-full rounded border px-3 py-2 text-gray-900  shadow focus:outline-none"
            id="imageURL"
            name="imageURL"
            type="text"
            placeholder="Enter Image URL ..."
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-900 focus:outline-none"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
