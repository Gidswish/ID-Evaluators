// app/admin/contact/page.tsx
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { Mail, Clock, Trash2, CheckCircle2, Download, Paperclip } from "lucide-react";
import { AdminTabs } from "@/components/AdminTabs";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string; deleted?: string; error?: string; reviewed?: string }>;
};

type ContactInquiry = {
  id: string;
  created_at: string;
  name: string;
  organisation: string | null;
  email: string;
  role: string | null;
  service_type: string | null;
  timeframe: string | null;
  message: string;
  referral: string | null;
  constraints_note: string | null;
  is_reviewed: boolean | null;
  preferred_contact: string | null;
  attachment_url: string | null;
  attachment_path: string | null;
};

const PAGE_SIZE = 10;

export default async function AdminContactPage({ searchParams }: PageProps) {
  const { q, page, deleted, error: errorFlag, reviewed } = await searchParams;

  const currentPage = Math.max(parseInt(page || "1", 10) || 1, 1);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  let query = supabaseAdmin
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,organisation.ilike.%${q}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error loading contact inquiries:", error);
  }

  const inquiries: ContactInquiry[] = (data as any) || [];
  const hasNextPage = inquiries.length > PAGE_SIZE;
  const pageItems = hasNextPage ? inquiries.slice(0, PAGE_SIZE) : inquiries;
  const hasPrevPage = currentPage > 1;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-6">
        <AdminTabs />
        <header className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Admin · Contact inquiries</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Messages sent via the public contact form. Use this view to follow up with organisations and keep basic
            records.
          </p>
        </header>

        {/* Status banners */}
        {deleted === "1" && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
            Contact inquiry deleted successfully.
          </div>
        )}
        {reviewed === "1" && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
            Inquiry marked as reviewed.
          </div>
        )}
        {errorFlag === "1" && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            Something went wrong performing that action. Please try again.
          </div>
        )}

        {/* Simple search */}
        <form method="GET" className="max-w-sm">
          <input
            name="q"
            defaultValue={q || ""}
            placeholder="Search by name, email or organisation"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
          />
        </form>

        <div className="flex justify-end">
          <a
            href="/admin/contact/export"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-[11px] text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
          >
            <Download className="h-3 w-3" />
            Export CSV
          </a>
        </div>

        {pageItems.length === 0 ? (
          <p className="text-sm text-slate-500">
            No contact inquiries yet. Once someone submits the contact form, their message will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            {pageItems.map((row) => {
              const created = row.created_at
                ? new Date(row.created_at).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null;

              return (
                <article
                  key={row.id}
                  className="rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 shadow-sm flex flex-col gap-3"
                >
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                        {row.name}
                        {row.organisation && <span className="text-xs text-slate-500"> · {row.organisation}</span>}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        {row.email && (
                          <span className="inline-flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {row.email}
                          </span>
                        )}
                        {row.role && <span className="inline-flex items-center gap-1">{row.role}</span>}
                        {created && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {created}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {row.is_reviewed && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" />
                          Reviewed
                        </span>
                      )}
                      {!row.is_reviewed && (
                        <form method="POST" action={`/admin/contact/${row.id}/review`} className="self-start">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-3 py-1 text-[11px] font-medium text-emerald-800 hover:bg-emerald-50"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            Mark as reviewed
                          </button>
                        </form>
                      )}
                      <form method="POST" action={`/admin/contact/${row.id}/delete`} className="self-start">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1 text-[11px] font-medium text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Meta tags row */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                    {row.preferred_contact && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 border border-emerald-100">
                        {row.preferred_contact}
                      </span>
                    )}

                    {row.attachment_url && (
                      <a
                        href={row.attachment_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                      >
                        <Paperclip className="h-3 w-3" />
                        View attachment
                      </a>
                    )}

                    {row.service_type && <span className="inline-flex rounded-full bg-slate-50 px-2 py-0.5">{row.service_type}</span>}
                    {row.timeframe && (
                      <span className="inline-flex rounded-full bg-slate-50 px-2 py-0.5">Timeframe: {row.timeframe}</span>
                    )}
                    {row.referral && <span className="inline-flex rounded-full bg-slate-50 px-2 py-0.5">Source: {row.referral}</span>}
                    {row.constraints_note && (
                      <span className="inline-flex rounded-full bg-slate-50 px-2 py-0.5">Notes: {row.constraints_note}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-700 whitespace-pre-line">
                    {row.message}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {(hasPrevPage || hasNextPage) && (
          <div className="flex items-center justify-between pt-2 text-xs text-slate-600">
            <div>Page {currentPage}</div>
            <div className="flex items-center gap-2">
              {hasPrevPage && (
                <a
                  href={"?" + buildQueryString({ q, page: String(currentPage - 1) })}
                  className="px-3 py-1 rounded-full border border-slate-200 bg-white hover:border-emerald-300"
                >
                  ← Previous
                </a>
              )}
              {hasNextPage && (
                <a
                  href={"?" + buildQueryString({ q, page: String(currentPage + 1) })}
                  className="px-3 py-1 rounded-full border border-slate-200 bg-white hover:border-emerald-300"
                >
                  Next →
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function buildQueryString(params: { q?: string; page?: string }) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.page) sp.set("page", params.page);
  return sp.toString();
}
