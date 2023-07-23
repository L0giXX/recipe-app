import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const recipe = await prisma.recipe.findUnique({
    where: { id: id },
  });
  return NextResponse.json({ recipe }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const recipe = await prisma.recipe.delete({
    where: { id: id },
  });
  return NextResponse.json(
    { message: "Rezept wurde gelöscht" },
    { status: 200 }
  );
}
