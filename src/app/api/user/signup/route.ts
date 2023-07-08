import { NextResponse } from "next/server";
import prisma from "../../../../utils/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;
  const hash = await bcrypt.hash(password, 10);
  const usern = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!usern) {
    const user = await prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });
    return NextResponse.json(
      { message: "User " + user.username + " created" },
      { status: 201 }
    );
  }
  return NextResponse.json(
    { error: "Username already in use" },
    { status: 404 }
  );
}
