import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get("id")?.toString().trim() || "";

  const redirectUrl = new URL("/admin/works", req.url);

  if (!id) {
    redirectUrl.searchParams.set("error", "Missing id when deleting evaluation.");
    return NextResponse.redirect(redirectUrl);
  }

  const { error } = await supabaseAdmin
    .from("evaluations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting evaluation:", error);
    redirectUrl.searchParams.set("error", "Failed to delete evaluation.");
  }

  return NextResponse.redirect(redirectUrl);
}