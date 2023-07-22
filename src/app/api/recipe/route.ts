import { NextResponse } from "next/server";
import prisma from "../../../utils/prisma";

export async function POST(request: Request) {
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
  return NextResponse.json({ recipe }, { status: 201 });
}
