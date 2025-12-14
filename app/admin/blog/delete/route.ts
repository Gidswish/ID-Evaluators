import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get("id")?.toString().trim() || "";

  const redirectUrl = new URL("/admin/blog", req.url);

  if (!id) {
    redirectUrl.searchParams.set("error", "Missing id when deleting post.");
    return NextResponse.redirect(redirectUrl);
  }

  const { error } = await supabaseAdmin
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    redirectUrl.searchParams.set("error", "Failed to delete post.");
  }

  return NextResponse.redirect(redirectUrl);
}