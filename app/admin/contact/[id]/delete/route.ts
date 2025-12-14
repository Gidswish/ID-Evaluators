import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

// Make sure this route runs in Node, not Edge
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
    const constraints_note = String(formData.get("constraints") || "");

    if (!name || !email || !message) {
      const errorUrl = new URL("/contact?error=1", req.url);
      return NextResponse.redirect(errorUrl, { status: 302 });
    }

    // Save to Supabase
    const { error } = await supabaseAdmin.from("contact_inquiries").insert([
      {
        name,
        organisation,
        email,
        role,
        service_type,
        timeframe,
        message,
        referral,
        constraints_note,
      },
    ]);

    if (error) {
      console.error("Error saving contact inquiry:", error);
      const errorUrl = new URL("/contact?error=1", req.url);
      return NextResponse.redirect(errorUrl, { status: 302 });
    }

    // --- EMAIL NOTIFICATION ---
    try {
      const haveKey = !!process.env.RESEND_API_KEY;
      const notifyTo = process.env.NOTIFY_EMAIL;

      console.log("RESEND_API_KEY present?", haveKey);
      console.log("NOTIFY_EMAIL:", notifyTo);

      if (!haveKey || !notifyTo) {
        console.warn(
          "Missing RESEND_API_KEY or NOTIFY_EMAIL env; skipping email notification."
        );
      } else {
        const { data, error: resendError } = await resend.emails.send({
          // Use Resend's default onboarding sender unless you've verified your own domain
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
            `Message:`,
            message,
            "",
            `Referral source: ${referral || "-"}`,
            `Timing/budget notes: ${constraints_note || "-"}`,
          ].join("\n"),
        } as any);

        console.log("Resend email send result:", { data, resendError });

        if (resendError) {
          console.error("Error sending notification email:", resendError);
        }
      }
    } catch (notifyError) {
      console.error("Unexpected error during email notification:", notifyError);
      // Do not block the user on this
    }

    const successUrl = new URL("/contact?submitted=1", req.url);
    return NextResponse.redirect(successUrl, { status: 302 });
  } catch (e) {
    console.error("Unexpected error in contact submit route:", e);
    const errorUrl = new URL("/contact?error=1", req.url);
    return NextResponse.redirect(errorUrl, { status: 302 });
  }
}