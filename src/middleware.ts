import { NextResponse } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://recipe-app-alpha-mocha.vercel.app"]
    : ["http://localhost:3000", "https://google.com"];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  console.log(origin);

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/api/:path*",
};