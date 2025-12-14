import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const id = formData.get("id")?.toString().trim() || "";
  const title = formData.get("title")?.toString().trim() || "";
  const slug = formData.get("slug")?.toString().trim() || "";
  const summary = formData.get("summary")?.toString().trim() || "";
  const content = formData.get("content")?.toString().trim() || "";
  const tag = formData.get("tag")?.toString().trim() || "";
  const publishedAtRaw = formData.get("published_at")?.toString().trim() || "";
  const is_published = formData.get("is_published") === "on";

  // NEW
  const featuredFile = formData.get("featured_image_file") as File | null;

  const redirectUrl = new URL("/admin/blog", req.url);

  if (!id || !title || !slug) {
    redirectUrl.searchParams.set("error", "Missing id, title or slug when updating post.");
    return NextResponse.redirect(redirectUrl);
  }

  const published_at = publishedAtRaw ? new Date(publishedAtRaw).toISOString() : undefined;

  const updateData: Record<string, any> = {
    title,
    slug,
    summary: summary || null,
    content: content || null,
    tag: tag || null,
    is_published,
  };

  if (published_at) updateData.published_at = published_at;

  // NEW: upload featured image if provided
  if (featuredFile && featuredFile.size > 0) {
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const ext = (featuredFile.name.split(".").pop() || "jpg").toLowerCase();
    const filePath = `blog-covers/${safeSlug}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("evaluation-files")
      .upload(filePath, featuredFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: featuredFile.type || "image/jpeg",
      });

    if (uploadError) {
      console.error("Error uploading featured image:", uploadError);
      redirectUrl.searchParams.set("error", "Failed to upload featured image.");
      return NextResponse.redirect(redirectUrl);
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("evaluation-files")
      .getPublicUrl(filePath);

    updateData.featured_image_url = publicUrlData.publicUrl;
    updateData.featured_image_path = filePath;
  }

  const { error } = await supabaseAdmin.from("blog_posts").update(updateData).eq("id", id);

  if (error) {
    console.error("Error updating blog post:", error);
    redirectUrl.searchParams.set("error", "Failed to update post.");
  }

  return NextResponse.redirect(redirectUrl);
}