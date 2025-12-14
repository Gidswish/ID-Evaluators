import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

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

    // Try to send notification email (non-blocking for the user)
    try {
      if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
        await resend.emails.send({
          from: "ID Evaluators <no-reply@idevaluators.org>",
          to: process.env.NOTIFY_EMAIL,
          subject: `New contact inquiry from ${name}`,
          text: [
            `Name: ${name}`,
            `Organisation: ${organisation || "-"}`,
            `Email: ${email}`,
            `Role/position: ${role || "-"}`,
            ``,
            `Type of support: ${service_type || "-"}`,
            `Timeframe: ${timeframe || "-"}`,
            ``,
            `Message:`,
            message,
            ``,
            `Referral source: ${referral || "-"}`,
            `Timing/budget notes: ${constraints_note || "-"}`,
          ].join("\n"),
        } as any);
        // ^ 'as any' is just to avoid type complaints if you don't have Resend types configured
      } else {
        console.warn(
          "RESEND_API_KEY or NOTIFY_EMAIL not set; skipping email notification."
        );
      }
    } catch (notifyError) {
      console.error("Error sending notification email:", notifyError);
      // Do not fail the user flow because of email issues
    }

    const successUrl = new URL("/contact?submitted=1", req.url);
    return NextResponse.redirect(successUrl, { status: 302 });
  } catch (e) {
    console.error("Unexpected error in contact submit route:", e);
    const errorUrl = new URL("/contact?error=1", req.url);
    return NextResponse.redirect(errorUrl, { status: 302 });
  }
}