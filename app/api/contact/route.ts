import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, organisation, email, location, message } = body || {};

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { error } = await supabaseAdmin.from("consulting_leads").insert({
      name,
      organisation,
      email,
      location,
      message,
      source: "website-contact",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save enquiry. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry received.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}