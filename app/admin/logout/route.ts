import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Use an absolute URL based on the incoming request
  const redirectUrl = new URL("/admin?logged_out=1", req.url);

  const res = NextResponse.redirect(redirectUrl);

  // Clear cookie correctly
  res.cookies.set("is_admin", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}