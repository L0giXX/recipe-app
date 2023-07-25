import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../../../utils/env";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const body = await request.json();
  const { name, password } = body;
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: "User " + name + " not found" },
      {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json(
      { error: "Password incorrect" },
      {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Create JWT
  const secret = env.JWT_SECRET;
  const token = jwt.sign({ name }, secret);

  return NextResponse.json(
    { token },
    {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    }
  );
}
