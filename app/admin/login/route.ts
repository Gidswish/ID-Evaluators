import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = formData.get("password")?.toString() || "";
  const expected = process.env.ADMIN_PASSWORD;

  // NEW: read redirect target
  const redirectTo = formData.get("redirect_to")?.toString() || "/admin";

  // Ensure redirect_to always starts with "/admin"
  const safeRedirect =
    redirectTo.startsWith("/admin") ? redirectTo : "/admin";

  const redirectUrl = new URL(safeRedirect, req.url);

  if (!expected || password !== expected) {
    redirectUrl.searchParams.set("error", "1");

    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set("is_admin", "", { maxAge: 0, path: "/" });
    return res;
  }

  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set("is_admin", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}