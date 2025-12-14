"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ConversionCTA() {
  const pathname = usePathname();

  // Hide CTA on admin + contact pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/contact")) return null;

  return (
    <section className="mt-14">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_10%,rgba(16,185,129,0.14),transparent_55%),radial-gradient(700px_circle_at_90%_30%,rgba(15,23,42,0.06),transparent_55%)]" />

          <div className="relative p-6 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                  <Sparkles className="h-4 w-4" />
                  Ready to commission an evaluation?
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Let’s turn data into decisions.
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Share your project/programme details and timeline. We’ll respond with a clear next step
                  and a practical approach (methods, scope, and deliverables).
                </p>

                <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-600">
                  {["Baseline / Midterm / Endline", "Learning reviews", "Mixed methods", "Capacity building"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:min-w-60">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  Request an evaluation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-emerald-300 hover:text-emerald-700"
                >
                  View our work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <p className="text-[11px] text-slate-500 text-center">
                  Typical response time: 1–2 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}