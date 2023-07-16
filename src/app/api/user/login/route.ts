import { NextResponse } from "next/server";
import prisma from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../../../utils/env";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: "User " + username + " not found" },
      { status: 404 }
    );
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: "Password incorrect" }, { status: 403 });
  }
  // Create JWT
  const secret = env.JWT_SECRET;
  const token = jwt.sign({ username }, secret);

  return NextResponse.json({ token }, { status: 200 });
}
