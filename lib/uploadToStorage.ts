import { supabaseAdmin } from "./supabaseAdmin";

export async function uploadToBucket(opts: {
  bucket: string;
  file: File;
  folder?: string; // e.g. "covers" or "reports"
}) {
  const { bucket, file, folder } = opts;

  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const safeBase = (file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "") || "file")
    .slice(0, 80);

  const filename = `${Date.now()}-${safeBase}`;
  const path = `${folder ? `${folder}/` : ""}${filename}.${ext}`.replace(/\.\./g, ".");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);

  return {
    path,
    publicUrl: publicUrlData.publicUrl,
  };
}