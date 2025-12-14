import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const id = formData.get("id")?.toString().trim() || "";
  const title = formData.get("title")?.toString().trim() || "";
  const slug = formData.get("slug")?.toString().trim() || "";
  const type = formData.get("type")?.toString().trim() || "";
  const sector = formData.get("sector")?.toString().trim() || "";
  const location = formData.get("location")?.toString().trim() || "";
  const year = formData.get("year")?.toString().trim() || "";
  const summary = formData.get("summary")?.toString().trim() || "";
  const content = formData.get("content")?.toString().trim() || "";
  const is_published = formData.get("is_published") === "on";

  const reportFile = formData.get("report_file") as File | null;
  const coverFile = formData.get("cover_file") as File | null;

  const redirectUrl = new URL("/admin/works", req.url);

  if (!id || !title || !slug) {
    redirectUrl.searchParams.set(
      "error",
      "Missing id, title or slug when updating evaluation."
    );
    return NextResponse.redirect(redirectUrl);
  }

  let report_url: string | undefined;
  let report_file_path: string | undefined;
  let cover_image_url: string | undefined;
  let cover_image_path: string | undefined;

  if (reportFile && reportFile.size > 0) {
    const ext = (reportFile.name.split(".").pop() || "pdf").toLowerCase();
    const filePath = `reports/${slug}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("evaluation-files")
      .upload(filePath, reportFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: reportFile.type || "application/pdf",
      });

    if (uploadError) {
      console.error("Error uploading report file:", uploadError);
      redirectUrl.searchParams.set("error", "Failed to upload report file.");
      return NextResponse.redirect(redirectUrl);
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("evaluation-files")
      .getPublicUrl(filePath);

    report_url = publicUrlData.publicUrl;
    report_file_path = filePath;
  }

  if (coverFile && coverFile.size > 0) {
    const ext = (coverFile.name.split(".").pop() || "jpg").toLowerCase();
    const filePath = `covers/${slug}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("evaluation-files")
      .upload(filePath, coverFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: coverFile.type || "image/jpeg",
      });

    if (uploadError) {
      console.error("Error uploading cover image:", uploadError);
      redirectUrl.searchParams.set("error", "Failed to upload cover image.");
      return NextResponse.redirect(redirectUrl);
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("evaluation-files")
      .getPublicUrl(filePath);

    cover_image_url = publicUrlData.publicUrl;
    cover_image_path = filePath;
  }

  const updateData: Record<string, any> = {
    title,
    slug,
    type: type || null,
    sector: sector || null,
    location: location || null,
    year: year || null,
    summary: summary || null,
    content: content || null,
    is_published,
  };

  // Only update file fields if new files were uploaded
  if (report_url) {
    updateData.report_url = report_url;
  }
  if (report_file_path) {
    updateData.report_file_path = report_file_path;
  }
  if (cover_image_url) {
    updateData.cover_image_url = cover_image_url;
  }
  if (cover_image_path) {
    updateData.cover_image_path = cover_image_path;
  }

  const { error } = await supabaseAdmin
    .from("evaluations")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating evaluation:", error);
    redirectUrl.searchParams.set("error", "Failed to update evaluation.");
  }

  return NextResponse.redirect(redirectUrl);
}