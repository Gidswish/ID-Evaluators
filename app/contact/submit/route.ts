// app/contact/submit/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "");
    const organisation = String(formData.get("organisation") || "");
    const email = String(formData.get("email") || "");
    const role = String(formData.get("role") || "");
    const service_type = String(formData.get("service_type") || "");
    const timeframe = String(formData.get("timeframe") || "");
    const message = String(formData.get("message") || "");
    const referral = String(formData.get("referral") || "");
    const preferred_contact = String(formData.get("preferred_contact") || "");
    const constraints_note = String(formData.get("constraints") || "");

    const attachment = formData.get("attachment") as File | null;

    // Optional file upload (do not block user flow if it fails)
    let attachment_url: string | null = null;
    let attachment_path: string | null = null;

    if (attachment && attachment.size > 0) {
      // Basic size guard (10MB)
      const MAX_BYTES = 10 * 1024 * 1024;
      if (attachment.size > MAX_BYTES) {
        console.warn("Attachment too large; skipping upload:", attachment.size);
      } else {
        try {
          const originalName = attachment.name || "attachment";
          const ext = (originalName.split(".").pop() || "bin").toLowerCase();
          const safeBase = originalName
            .replace(/\.[^/.]+$/, "")
            .toLowerCase()
            .replace(/[^a-z0-9-_]+/g, "-")
            .replace(/-+/g, "-")
            .slice(0, 60);

          const filePath = `contact-attachments/${Date.now()}-${safeBase}.${ext}`;

          const { error: uploadError } = await supabaseAdmin.storage
            .from("evaluation-files")
            .upload(filePath, attachment, {
              cacheControl: "3600",
              upsert: true,
              contentType: attachment.type || "application/octet-stream",
            });

          if (uploadError) {
            console.error("Error uploading contact attachment:", uploadError);
          } else {
            const { data: publicUrlData } = supabaseAdmin.storage
              .from("evaluation-files")
              .getPublicUrl(filePath);

            attachment_url = publicUrlData.publicUrl;
            attachment_path = filePath;
          }
        } catch (uploadUnexpected) {
          console.error("Unexpected error uploading contact attachment:", uploadUnexpected);
        }
      }
    }

    // Append extra info into message so we don't require DB migrations

    if (!name || !email || !message) {
      return NextResponse.redirect(new URL("/contact?error=1", req.url), {
        status: 302,
      });
    }

    const { error } = await supabaseAdmin.from("contact_inquiries").insert([
      {
        name,
        organisation,
        email,
        role,
        service_type,
        timeframe,
        message: message,
        referral,
        constraints_note,
        preferred_contact: preferred_contact || null,
        attachment_url,
        attachment_path,
      },
    ]);

    if (error) {
      console.error("Error saving contact inquiry:", error);
      return NextResponse.redirect(new URL("/contact?error=1", req.url), {
        status: 302,
      });
    }

    // Email notification (do not block the user flow if this fails)
    try {
      const hasKey = !!process.env.RESEND_API_KEY;
      const notifyTo = process.env.NOTIFY_EMAIL;

      console.log("CONTACT ROUTE RESEND_API_KEY present?", hasKey);
      console.log("CONTACT ROUTE NOTIFY_EMAIL:", notifyTo);

      if (!hasKey || !notifyTo) {
        console.warn(
          "Missing RESEND_API_KEY or NOTIFY_EMAIL; skipping email notification."
        );
      } else {
        const { data, error: resendError } = await resend.emails.send({
          // Use Resend's default sender unless you've verified your own domain
          from: "ID Evaluators <onboarding@resend.dev>",
          to: notifyTo,
          subject: `New contact inquiry from ${name}`,
          text: [
            `Name: ${name}`,
            `Organisation: ${organisation || "-"}`,
            `Email: ${email}`,
            `Role/position: ${role || "-"}`,
            "",
            `Type of support: ${service_type || "-"}`,
            `Timeframe: ${timeframe || "-"}`,
            "",
            `Preferred contact: ${preferred_contact || "-"}`,
            `Attachment: ${attachment_url || "-"}`,
            "",
            "Message:",
            message,
            "",
            `Referral source: ${referral || "-"}`,
            `Timing/budget notes: ${constraints_note || "-"}`,
          ].join("\n"),
        } as any);

        console.log("CONTACT ROUTE Resend result:", { data, resendError, preferred_contact, attachment_url });

        if (resendError) {
          console.error("Error sending notification email:", resendError);
        }
      }
    } catch (notifyError) {
      console.error("Unexpected error during email notification:", notifyError);
    }

    return NextResponse.redirect(new URL("/contact?submitted=1", req.url), {
      status: 302,
    });
  } catch (e) {
    console.error("Unexpected error in contact submit route:", e);
    return NextResponse.redirect(new URL("/contact?error=1", req.url), {
      status: 302,
    });
  }
}
