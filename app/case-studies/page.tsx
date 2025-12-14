import { supabaseAdmin } from "../../lib/supabaseAdmin";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  MapPin,
  Briefcase,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Evaluation = {
  id: string;
  title: string;
  slug: string;
  type: string | null;
  sector: string | null;
  location: string | null;
  year: string | null;
  summary: string | null;
  is_published: boolean;
  report_url?: string | null;

  // Optional (future-ready). If you later add these columns, UI will automatically use them.
  cover_image_url?: string | null;
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    sector?: string;
    year?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 6;

export default async function CaseStudiesPage({ searchParams }: PageProps) {
  const { q, type, sector, year, page } = await searchParams;

  const currentPage = Math.max(parseInt(page || "1", 10) || 1, 1);

  // Distinct filter options
  const { data: filterData } = await supabaseAdmin
    .from("evaluations")
    .select("type, sector, year")
    .eq("is_published", true);

  const allTypes = Array.from(
    new Set((filterData || []).map((row) => row.type).filter(Boolean) as string[])
  ).sort();

  const allSectors = Array.from(
    new Set((filterData || []).map((row) => row.sector).filter(Boolean) as string[])
  ).sort();

  const allYears = Array.from(
    new Set((filterData || []).map((row) => row.year).filter(Boolean) as string[])
  ).sort((a, b) => (b || "").localeCompare(a || ""));

  // Main query
  let query = supabaseAdmin
    .from("evaluations")
    .select("*")
    .eq("is_published", true);

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,summary.ilike.%${q}%,content.ilike.%${q}%`
    );
  }
  if (type) query = query.eq("type", type);
  if (sector) query = query.eq("sector", sector);
  if (year) query = query.eq("year", year);

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE; // fetch one extra to know if there is a next page

  const { data, error } = await query
    .order("year", { ascending: false })
    .order("title", { ascending: true })
    .range(from, to);

  if (error) console.error("Error loading evaluations:", error);

  const rows = (data as Evaluation[] | null) || [];
  const hasNextPage = rows.length > PAGE_SIZE;
  const evaluations = hasNextPage ? rows.slice(0, PAGE_SIZE) : rows;
  const hasPrevPage = currentPage > 1;

  const activeFilters = [
    q ? { key: "q", label: `Search: ${q}` } : null,
    type ? { key: "type", label: `Type: ${type}` } : null,
    sector ? { key: "sector", label: `Sector: ${sector}` } : null,
    year ? { key: "year", label: `Year: ${year}` } : null,
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <main className="min-h-screen bg-slate-50 text-[15px] sm:text-[16px]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_10%_0%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(900px_circle_at_95%_10%,rgba(15,23,42,0.06),transparent_55%)]" />

      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-5xl space-y-8">
        {/* Hero */}
        <header className="grid gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
              <FileText className="h-3.5 w-3.5" />
              Our works
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Examples of evaluations and studies
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              A curated selection of completed evaluations, reviews and learning studies across
              environment, e-waste, livelihoods and social impact.
            </p>
          </div>

          <div className="relative h-32 sm:h-40 rounded-3xl overflow-hidden bg-slate-900/90 shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.35),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.7),transparent_60%)]" />
            <div className="relative h-full flex flex-col justify-center px-5">
              <p className="text-[11px] uppercase tracking-wide text-emerald-200">
                Independent evaluation
              </p>
              <p className="text-sm text-slate-200 max-w-xs leading-relaxed">
                Rigorous, practical assessments tailored to programme decisions—beyond desk reports.
              </p>
            </div>
          </div>
        </header>

        {/* Filters & search */}
        <form
          method="GET"
          className="rounded-3xl bg-white/80 backdrop-blur border border-slate-100 p-4 sm:p-5 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              Filter and search
            </div>

            {activeFilters.length > 0 && (
              <a
                href="/case-studies"
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
              >
                <X className="h-3 w-3" />
                Clear all
              </a>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Search
              </label>
              <input
                name="q"
                defaultValue={q || ""}
                placeholder="Search by title, keywords, sector…"
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Apply
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Type
              </label>
              <select
                name="type"
                defaultValue={type || ""}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">All types</option>
                {allTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Sector
              </label>
              <select
                name="sector"
                defaultValue={sector || ""}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">All sectors</option>
                {allSectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Year
              </label>
              <select
                name="year"
                defaultValue={year || ""}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">All years</option>
                {allYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {activeFilters.map((f) => (
                <span
                  key={f.key}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800"
                >
                  {f.label}
                </span>
              ))}
            </div>
          )}
        </form>

        {/* Results */}
        {evaluations.length === 0 ? (
          <p className="text-sm text-slate-500">
            No evaluations found. Try adjusting your filters.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {evaluations.map((ev, index) => {
              const metaMain = [ev.type, ev.sector].filter(Boolean).join(" • ");
              const metaBottom = [ev.location, ev.year].filter(Boolean).join(" • ");

              const thumbIndex = (index % 3) + 1;
              const thumbSrc = ev.cover_image_url || `/images/case-${thumbIndex}.jpg`;

              return (
                <Link
                  key={ev.id}
                  href={`/case-studies/${ev.slug}`}
                  className="group rounded-3xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative h-60 sm:h-62 bg-slate-900/90">
                    {/* Vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-900/40" />

                    {/* Highlight glow on hover */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.25),transparent_55%)]" />
                    </div>
                    <Image
                      src={thumbSrc}
                      alt=""
                      fill
                      className="object-cover opacity-85 group-hover:opacity-95 transition-transform duration-700 ease-out will-change-transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:translate-x-2"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                    <div className="absolute bottom-2 left-3 flex items-center gap-2 text-[11px] text-emerald-100">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Evaluation / study</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-semibold text-slate-900 group-hover:text-emerald-800 leading-snug">
                        {ev.title}
                      </h2>
                      {ev.report_url && (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-800">
                          <FileText className="h-3 w-3" />
                          Report
                        </span>
                      )}
                    </div>

                    {metaMain && (
                      <p className="text-[12px] text-slate-600 flex flex-wrap items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                        {metaMain}
                      </p>
                    )}

                    {metaBottom && (
                      <p className="text-[12px] text-slate-600 flex flex-wrap items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {metaBottom}
                      </p>
                    )}

                    {ev.summary && (
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {ev.summary}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1 text-[12px] text-slate-500">
                      {ev.year && (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {ev.year}
                        </span>
                      )}
                      <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {(hasPrevPage || hasNextPage) && (
          <div className="flex items-center justify-between pt-2 text-sm text-slate-600">
            <div>Page {currentPage}</div>
            <div className="flex items-center gap-2">
              {hasPrevPage && (
                <a
                  href={`?${buildQueryString({
                    q,
                    type,
                    sector,
                    year,
                    page: String(currentPage - 1),
                  })}`}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-slate-200 bg-white hover:border-emerald-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </a>
              )}
              {hasNextPage && (
                <a
                  href={`?${buildQueryString({
                    q,
                    type,
                    sector,
                    year,
                    page: String(currentPage + 1),
                  })}`}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-slate-200 bg-white hover:border-emerald-300"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function buildQueryString(params: {
  q?: string;
  type?: string;
  sector?: string;
  year?: string;
  page?: string;
}) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.type) sp.set("type", params.type);
  if (params.sector) sp.set("sector", params.sector);
  if (params.year) sp.set("year", params.year);
  if (params.page) sp.set("page", params.page);
  return sp.toString();
}