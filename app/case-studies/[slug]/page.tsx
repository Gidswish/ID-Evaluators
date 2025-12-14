import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Briefcase, MapPin, CalendarDays, Tag, ArrowRight } from "lucide-react";

type Evaluation = {
  id: string;
  title: string;
  slug: string;
  type: string | null;
  sector: string | null;
  location: string | null;
  year: string | null;
  summary: string | null;
  content: string | null;
  is_published: boolean;
  report_url?: string | null;

  // Future-ready optional fields (won’t break if missing in DB)
  client?: string | null;
  funder?: string | null;
  methods?: string | null;
  tags?: string[] | null;
};

export default async function EvaluationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data, error } = await supabaseAdmin
    .from("evaluations")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) notFound();

  const evaluation = data as Evaluation;

  const metaLine = [
    evaluation.type,
    evaluation.sector,
    evaluation.location,
    evaluation.year,
  ]
    .filter(Boolean)
    .join(" • ");

  const content =
    evaluation.content ||
    "A fuller description of this evaluation can be added here, including key questions, methodology and main findings.";

  const metaItems = [
    evaluation.type ? { icon: Briefcase, label: "Type", value: evaluation.type } : null,
    evaluation.sector ? { icon: Tag, label: "Sector", value: evaluation.sector } : null,
    evaluation.location ? { icon: MapPin, label: "Location", value: evaluation.location } : null,
    evaluation.year ? { icon: CalendarDays, label: "Year", value: evaluation.year } : null,
    evaluation.client ? { icon: Briefcase, label: "Client", value: evaluation.client } : null,
    evaluation.funder ? { icon: Briefcase, label: "Funder", value: evaluation.funder } : null,
    evaluation.methods ? { icon: FileText, label: "Methods", value: evaluation.methods } : null,
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  return (
    <main className="min-h-screen bg-slate-50 text-[15px] sm:text-[16px]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_10%_0%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(900px_circle_at_95%_10%,rgba(15,23,42,0.06),transparent_55%)]" />

      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-5xl space-y-6">
        {/* Back link */}
        <div className="text-sm">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-700"
          >
            ← Back to Our works
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
            <FileText className="h-3.5 w-3.5" />
            Evaluation / study
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {evaluation.title}
          </h1>

          {metaLine && <p className="text-sm text-slate-600">{metaLine}</p>}

          {evaluation.summary && (
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
              {evaluation.summary}
            </p>
          )}
        </header>

        {/* Layout */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] items-start">
          {/* Content */}
          <article className="rounded-3xl bg-white/80 backdrop-blur border border-slate-100 p-5 sm:p-6 shadow-sm">
            <p className="text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed">
              {content}
            </p>
          </article>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Meta card */}
            <section className="rounded-3xl bg-white/80 backdrop-blur border border-slate-100 p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Project details
              </p>

              <div className="mt-3 space-y-2">
                {metaItems.length === 0 ? (
                  <p className="text-sm text-slate-600">
                    Add type, sector, location and year to enrich this case study.
                  </p>
                ) : (
                  metaItems.map((item) => (
                    <div key={item.label} className="flex items-start gap-2 text-sm">
                      <item.icon className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          {item.label}
                        </p>
                        <p className="text-slate-800 font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {evaluation.tags && evaluation.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {evaluation.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700 border border-slate-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Download report */}
            {evaluation.report_url && (
              <section className="rounded-3xl bg-emerald-50 border border-emerald-100 p-5 shadow-sm space-y-2">
                <p className="text-sm font-semibold text-emerald-900">
                  Full evaluation report
                </p>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Download the complete report (PDF).
                </p>
                <a
                  href={evaluation.report_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 mt-1"
                >
                  Download report
                </a>
              </section>
            )}

            {/* CTA */}
            <section className="rounded-3xl bg-slate-900 text-slate-50 p-5 shadow-sm space-y-2">
              <p className="text-[11px] uppercase tracking-wide text-emerald-200">
                Talk to ID Evaluators
              </p>
              <p className="text-base font-semibold">
                Interested in an evaluation similar to this?
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Share your project details and we’ll recommend suitable evaluation or learning options.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 mt-1"
              >
                Contact us
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}