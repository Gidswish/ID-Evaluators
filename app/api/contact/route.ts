import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

// Basic, best-effort rate limiting (per server instance). This helps reduce spam,
// but it is not a perfect guarantee in serverless environments.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // per IP per window
const ipBuckets = new Map<string, { count: number; windowStart: number }>();

function getClientIp(req: NextRequest): string {
  // Netlify / proxies commonly set x-forwarded-for. Take the first IP.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // Fallback: unknown
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);

  if (!bucket) {
    ipBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }

  // Reset window
  if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }

  bucket.count += 1;
  ipBuckets.set(ip, bucket);

  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function asTrimmedString(value: unknown, maxLen: number): string {
  const s = typeof value === "string" ? value : "";
  return s.trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  // Simple email sanity check (not RFC-perfect, but good enough for web forms)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // Enforce JSON payloads
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid content type." },
        { status: 415 }
      );
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Optional honeypot (if your frontend adds it later). If filled, treat as spam.
    const honey = asTrimmedString((body as any)?.company_website, 200);
    if (honey) {
      return NextResponse.json({ success: true, message: "Enquiry received." }, { status: 200 });
    }

    const name = asTrimmedString((body as any)?.name, 120);
    const organisation = asTrimmedString((body as any)?.organisation, 160);
    const email = asTrimmedString((body as any)?.email, 254);
    const location = asTrimmedString((body as any)?.location, 160);
    const message = asTrimmedString((body as any)?.message, 4000);

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Insert into Supabase (server/admin client)
    // NOTE: With RLS enabled and no anon policies for this table, only the service-role
    // client should write to this table.
    const { error } = await supabaseAdmin.from("contact_inquiries").insert({
      name,
      organisation: organisation || null,
      email,
      location: location || null,
      message,
      source: "website-contact",
      // Helpful metadata for ops/abuse monitoring
      ip_address: ip === "unknown" ? null : ip,
      user_agent: req.headers.get("user-agent") || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save enquiry. Please try again later.",
        },
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