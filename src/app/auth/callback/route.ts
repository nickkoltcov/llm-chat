import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5171";
  const callbackUrl = new URL("/auth/callback", backendUrl);

  request.nextUrl.searchParams.forEach((value, key) => {
    callbackUrl.searchParams.append(key, value);
  });

  return NextResponse.redirect(callbackUrl);
}