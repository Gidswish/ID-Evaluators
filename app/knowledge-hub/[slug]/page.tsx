import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { notFound } from "next/navigation";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  tag: string | null;
  published_at: string;
  is_published: boolean;
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Unwrap the params Promise
  const { slug } = await params;

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    notFound();
  }

  const post = data as BlogPost;

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const content = post.content || "No content has been added yet.";

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl space-y-6">
        {/* Back link */}
        <div className="text-xs">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-700"
          >
            ← Back to News &amp; blog
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-2">
          {post.tag && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800">
              {post.tag}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {post.title}
          </h1>
          {formattedDate && (
            <p className="text-xs text-slate-500">Published {formattedDate}</p>
          )}
        </header>

        {/* Content */}
        <article className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-sm">
          <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
            {content}
          </p>
        </article>

        {/* Footer / CTA */}
        <section className="rounded-2xl bg-slate-900 text-slate-50 p-5 sm:p-6 space-y-2">
          <p className="text-xs uppercase tracking-wide text-emerald-200">
            Talk to ID Evaluators
          </p>
          <p className="text-sm sm:text-base font-semibold">
            If this topic relates to work you are doing, we&apos;re happy to discuss possible
            evaluations, studies or training.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 mt-2"
          >
            Contact us
          </Link>
        </section>
      </section>
    </main>
  );
}