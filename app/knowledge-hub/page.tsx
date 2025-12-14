import { supabaseAdmin } from "../../lib/supabaseAdmin";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Search, Tag as TagIcon, ChevronLeft, ChevronRight } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  tag: string | null;
  published_at: string | null;
  is_published: boolean;
  featured_image_url?: string | null;
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 6;

export default async function KnowledgeHubPage({ searchParams }: PageProps) {
  const { q, tag, page } = await searchParams;

  const currentPage = Math.max(parseInt(page || "1", 10) || 1, 1);

  // Distinct tags for filter dropdown
  const { data: filterData } = await supabaseAdmin
    .from("blog_posts")
    .select("tag")
    .eq("is_published", true);

  const allTags = Array.from(
    new Set(
      (filterData || [])
        .map((row) => row.tag)
        .filter((v): v is string => !!v)
    )
  ).sort();

  // Main query
  let query = supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("is_published", true);

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,summary.ilike.%${q}%,content.ilike.%${q}%`
    );
  }

  if (tag) {
    query = query.eq("tag", tag);
  }

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await query
    .order("published_at", { ascending: false })
    .order("title", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error loading blog posts:", error);
  }

  const posts = (data as BlogPost[] | null) || [];
  const hasNextPage = posts.length === PAGE_SIZE;
  const hasPrevPage = currentPage > 1;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-5xl space-y-8">
        {/* Hero */}
        <header className="grid gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800">
              <BookOpen className="h-3.5 w-3.5" />
              Knowledge hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Notes, articles and practice reflections
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Short pieces on evaluation practice, methods and learning from projects in
              different contexts – especially around environment, e-waste, and social impact.
            </p>
          </div>

          {/* Small illustrative image / placeholder */}
          <div className="relative h-32 sm:h-40 rounded-2xl overflow-hidden bg-slate-900/90">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.3),transparent_60%),radial-gradient(circle_at_bottom,rgba(148,163,184,0.4),transparent_60%)]" />
            <div className="relative h-full flex flex-col justify-center px-4">
              <p className="text-[11px] uppercase tracking-wide text-emerald-200">
                ID Evaluators
              </p>
              <p className="text-xs text-slate-200 max-w-xs">
                Independent evaluation, research and training with a focus on practical,
                decision-ready insights.
              </p>
            </div>
          </div>
        </header>

        {/* Filters & search */}
        <form
          method="GET"
          className="rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 shadow-sm space-y-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  name="q"
                  defaultValue={q || ""}
                  placeholder="Search by title, theme or keywords..."
                  className="w-full rounded-lg border border-slate-300 pl-7 pr-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="sm:w-52">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Tag / theme
              </label>
              <div className="relative">
                <TagIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <select
                  name="tag"
                  defaultValue={tag || ""}
                  className="w-full rounded-lg border border-slate-300 pl-7 pr-3 py-2 text-xs bg-slate-50 text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">All tags</option>
                  {allTags.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-1.5 font-semibold text-white hover:bg-emerald-500"
            >
              Apply filters
            </button>
            <a
              href="/knowledge-hub"
              className="text-slate-500 hover:text-emerald-700"
            >
              Clear all
            </a>
          </div>
        </form>

        {/* Results */}
        {posts.length === 0 ? (
          <p className="text-sm text-slate-500">
            No articles found. Try adjusting your search or tag.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post, index) => {
              const dateLabel = post.published_at
                ? new Date(post.published_at).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : null;

              return (
                <Link
                  key={post.id}
                  href={`/knowledge-hub/${post.slug}`}
                  className="group rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition flex flex-col overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative h-60 sm:h-60 bg-slate-900/90">
                    <Image
                      src={post.featured_image_url || "/images/hero-workshop.jpg"}
                      alt=""
                      fill
                      className="object-cover opacity-80 group-hover:opacity-95 transition-transform duration-700 ease-out will-change-transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:translate-x-2"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
                    <div className="absolute bottom-2 left-3 flex items-center gap-2 text-[11px] text-emerald-100">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Knowledge note</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 p-4 space-y-1.5">
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-emerald-800">
                      {post.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      {dateLabel && <span>{dateLabel}</span>}
                      {post.tag && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                          <TagIcon className="h-3 w-3" />
                          {post.tag}
                        </span>
                      )}
                    </div>
                    {post.summary && (
                      <p className="text-xs text-slate-600 mt-1 line-clamp-3">
                        {post.summary}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {(hasPrevPage || hasNextPage) && (
          <div className="flex items-center justify-between pt-2 text-xs text-slate-600">
            <div>Page {currentPage}</div>
            <div className="flex items-center gap-2">
              {hasPrevPage && (
                <a
                  href={`?${buildQueryString({
                    q,
                    tag,
                    page: String(currentPage - 1),
                  })}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 bg-white hover:border-emerald-300"
                >
                  <ChevronLeft className="h-3 w-3" />
                  Previous
                </a>
              )}
              {hasNextPage && (
                <a
                  href={`?${buildQueryString({
                    q,
                    tag,
                    page: String(currentPage + 1),
                  })}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 bg-white hover:border-emerald-300"
                >
                  Next
                  <ChevronRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function buildQueryString(params: { q?: string; tag?: string; page?: string }) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.tag) sp.set("tag", params.tag);
  if (params.page) sp.set("page", params.page);
  return sp.toString();
}