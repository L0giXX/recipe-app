"use client";
import React, { useState } from "react";
import FileUpload from "@/components/file-upload";
import { TRecipe, recipeSchema } from "@/lib/types";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Forms() {
  const [imageURL, setImageURL] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<TRecipe>({
    resolver: zodResolver(recipeSchema),
  });

  const { fields: ingredientsFields, append: appendIngredient } = useFieldArray(
    {
      control,
      name: "ingredients",
    }
  );

  const { fields: instructionsFields, append: appendInstruction } =
    useFieldArray({
      control,
      name: "instructions",
    });

  const onSubmit = async (data: TRecipe) => {
    data.imageURL = imageURL;
    const res = await fetch(`/api/recipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(`Unable to create recipe, reason: ${data.error}`);
      return;
    }
    reset();
    setImageURL("");
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Create Recipe</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-900" htmlFor="name">
            Recipe name
          </label>
          <input
            {...register("name")}
            className="focus:shadow-outline w-full rounded border px-3 py-2 text-gray-900  shadow focus:outline-none"
            id="name"
            type="text"
            placeholder="Enter Recipe Name ..."
          />
          {errors.name && (
            <p className="text-red-500">{`${errors.name.message}`}</p>
          )}
        </div>
        <div>
          <label
            className="mb-2 block font-bold text-gray-900"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            className="focus:shadow-outline mb-4 w-full rounded border px-3 py-2  text-gray-900 shadow focus:outline-none"
            placeholder="Enter Description ..."
            id="description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{`${errors.description.message}`}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-900"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          {ingredientsFields.map((field, index) => (
            <input
              key={field.id}
              {...register(`ingredients.${index}.value`)}
              className="focus:shadow-outline mb-2 flex w-full flex-col rounded border px-3 py-2 text-gray-900 shadow focus:outline-none"
              type="text"
              id="ingredients"
              placeholder="Enter Ingredient ..."
            />
          ))}
          {errors.ingredients && (
            <p className="text-red-500">{`${errors.ingredients.message}`}</p>
          )}
          <button
            onClick={() => appendIngredient({ value: "" })}
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
          {instructionsFields.map((field, index) => (
            <input
              key={field.id}
              {...register(`instructions.${index}.value`)}
              className="focus:shadow-outline mb-2 flex w-full flex-col rounded border px-3 py-2 text-gray-900 shadow focus:outline-none"
              type="text"
              id="instructions"
              placeholder="Enter Instruction ..."
            />
          ))}
          {errors.instructions && (
            <p className="text-red-500">{`${errors.instructions.message}`}</p>
          )}
          <button
            onClick={() => appendInstruction({ value: "" })}
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
            {...register("cookTime")}
            className="focus:shadow-outline w-full rounded border px-3 py-2 text-gray-900  shadow focus:outline-none"
            id="cookTime"
            placeholder="Enter Cooking Time in minutes ..."
          />
          {errors.cookTime && (
            <p className="text-red-500">{`${errors.cookTime.message}`}</p>
          )}
        </div>
        <FileUpload
          onChange={(url) => setImageURL(url as string)}
          value={imageURL}
          endpoint="recipeImage"
        />
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-900 focus:outline-none"
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
