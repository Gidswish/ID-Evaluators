// scripts/test-resend.mjs
import { Resend } from "resend";
import dotenv from "dotenv";

// explicitly load .env.local in this project
dotenv.config({ path: ".env.local" });

async function main() {
  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.NOTIFY_EMAIL;

  console.log("RESEND_API_KEY present?", !!apiKey);
  console.log("NOTIFY_EMAIL:", notify);

  if (!apiKey || !notify) {
    console.log("Missing RESEND_API_KEY or NOTIFY_EMAIL in env.");
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "ID Evaluators <onboarding@resend.dev>",
      to: notify,
      subject: "Test email from ID Evaluators",
      text: "If you see this, Resend is working from your local environment.",
    });

    console.log("Resend result:", { data, error });

    if (error) {
      console.error("Resend error:", error);
    } else {
      console.log("Email sent successfully!");
    }
  } catch (e) {
    console.error("Unexpected error:", e);
  }
}

main();