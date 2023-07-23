import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = "*";
  console.log("origin", origin);
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "BadRequest",
      headers: { "Content-Type": "text/plain" },
    });
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/api/:path*",
};
