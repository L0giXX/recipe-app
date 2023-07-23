import { NextResponse } from "next/server";
import { prisma } from "../../../utils/prisma";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const body = await request.json();
  const { name, description, ingredients, instructions, cookTime, imageURL } =
    body;
  const recipe = await prisma.recipe.create({
    data: {
      name,
      description,
      ingredients,
      instructions,
      cookTime,
      imageURL,
    },
  });
  return NextResponse.json(
    { recipe },
    {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    }
  );
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const recipes = await prisma.recipe.findMany();
  return NextResponse.json(
    { recipes },
    {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    }
  );
}
