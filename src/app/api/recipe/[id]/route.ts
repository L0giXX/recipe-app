import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const origin = request.headers.get("origin");
  const recipe = await prisma.recipe.findUnique({
    where: { id: id },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const origin = request.headers.get("origin");
  const recipe = await prisma.recipe.delete({
    where: { id: id },
  });
  return NextResponse.json(
    { message: "Rezept wurde gelöscht" },
    {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "plain/text",
      },
    }
  );
}
