"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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

function SpecificRecipe({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe>({
    id: "",
    name: "",
    description: "",
    ingredients: [],
    instructions: [],
    cookTime: "",
    imageURL: "",
  });

  useEffect(() => {
    async function getRecipe() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/recipe/${params.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setRecipe(data.recipe);
      } catch (err) {
        alert(err);
      }
    }
    getRecipe();
  }, [params.id]);

  return (
    <div>
      ID page
      <div>{recipe.name}</div>
    </div>
  );
}
export default SpecificRecipe;
