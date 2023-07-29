import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { search: string } }
) {
  const origin = request.headers.get("origin");
  const { search } = params;
  const recipes = await prisma.recipe.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
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
