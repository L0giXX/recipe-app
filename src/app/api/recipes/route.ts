import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  const res = await prisma.benutzer.findMany();
  return NextResponse.json(res);
}
