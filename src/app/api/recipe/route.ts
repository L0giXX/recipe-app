import { NextResponse } from "next/server";
import prisma from "../../../../utils/prisma";

export async function GET() {
  const data = await prisma.benutzer.findMany();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, surname, email, password, telephone, gender } = body;
  const benutzer = await prisma.benutzer.create({
    data: {
      name,
      surname,
      email,
      password,
      telephone,
      gender,
    },
  });

  return NextResponse.json(benutzer);
}
