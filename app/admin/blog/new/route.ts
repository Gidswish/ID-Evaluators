import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = formData.get("title")?.toString().trim() || "";
  const slug = formData.get("slug")?.toString().trim() || "";
  const summary = formData.get("summary")?.toString().trim() || "";
  const content = formData.get("content")?.toString().trim() || "";
  const tag = formData.get("tag")?.toString().trim() || "";
  const publishedAtRaw = formData.get("published_at")?.toString().trim() || "";
  const is_published = formData.get("is_published") === "on";
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const filePath = `blog-covers/${safeSlug}-${Date.now()}.${Text}`;

  // NEW
  const featuredFile = formData.get("featured_image_file") as File | null;

  const redirectUrl = new URL("/admin/blog", req.url);

  if (!title || !slug) {
    redirectUrl.searchParams.set("error", "Missing title or slug when creating post.");
    return NextResponse.redirect(redirectUrl);
  }

  const published_at = publishedAtRaw
    ? new Date(publishedAtRaw).toISOString()
    : new Date().toISOString();

  // NEW: upload featured image to existing bucket `evaluation-files`
  let featured_image_url: string | null = null;
  let featured_image_path: string | null = null;

  if (featuredFile && featuredFile.size > 0) {
    const ext = (featuredFile.name.split(".").pop() || "jpg").toLowerCase();
    const filePath = `blog-covers/${slug}-${Date.now()}.${ext}`;

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

    featured_image_url = publicUrlData.publicUrl;
    featured_image_path = filePath;
  }

  const { error } = await supabaseAdmin.from("blog_posts").insert({
    title,
    slug,
    summary: summary || null,
    content: content || null,
    tag: tag || null,
    published_at,
    is_published,
    featured_image_url,
    featured_image_path,
  });

  if (error) {
    console.error("Error inserting blog post:", error);
    redirectUrl.searchParams.set("error", "Failed to save post. Check console / Supabase logs.");
  }

  return NextResponse.redirect(redirectUrl);
}