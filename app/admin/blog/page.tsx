import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { AdminTabs } from "@/components/AdminTabs";
import AdminRedirectField from "@/components/AdminRedirectField";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  tag: string | null;
  published_at: string;
  is_published: boolean;
  featured_image_url?: string | null;
  featured_image_path?: string | null;
};

type PageProps = {
  searchParams: Promise<{ error?: string; edit?: string }>;
};

export default async function AdminBlogPage({ searchParams }: PageProps) {
  const { error: errorQuery, edit } = await searchParams;
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("is_admin")?.value === "true";

  if (!isAdmin) {
    // Not logged in → show simple password form
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="container mx-auto px-4 py-16 max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Admin login</h1>
          {errorQuery === "1" && (
            <p className="mb-3 text-xs text-red-600">
              Incorrect password. Please try again.
            </p>
          )}
          <form
            method="POST"
            action="/admin/login"
            className="bg-white border rounded-xl p-5 shadow-sm space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Admin password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Log in
            </button>
            <AdminRedirectField />
          </form>
        </section>
      </main>
    );
  }

  // Logged in → show posts + create form
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  const posts = (data as BlogPost[] | null) || [];

  const postToEdit = edit ? posts.find((p) => p.id === edit) : undefined;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-5xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            News &amp; blog – Admin
          </h1>
          {error && (
            <p className="text-xs text-red-600">
              Could not load posts: {error.message}
            </p>
          )}
          {errorQuery && errorQuery !== "1" && (
            <p className="text-xs text-red-600">
              {errorQuery}
            </p>
          )}
          <p className="text-sm text-slate-600">
            Create posts, upload a featured image, and manage your existing articles below.
          </p>
        </header>

        <AdminTabs />
        <a
            href="/admin/logout"
            className="text-xs text-slate-500 hover:text-red-600 transition ml-auto"
            >
            Logout
        </a>

        {/* New post form */}
        <section className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">
              {postToEdit ? "Edit post" : "Create a new post"}
            </h2>
            {postToEdit && (
              <a
                href="/admin/blog"
                className="text-xs text-slate-500 hover:text-emerald-700"
              >
                Cancel edit
              </a>
            )}
          </div>
          <form
            method="POST"
            action={postToEdit ? "/admin/blog/update" : "/admin/blog/new"}
            encType="multipart/form-data"
            className="space-y-4 text-sm"
          >
            {postToEdit && (
              <input type="hidden" name="id" value={postToEdit.id} />
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={postToEdit?.title || ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Slug (URL, e.g. planning-independent-evaluation)
                </label>
                <input
                  name="slug"
                  type="text"
                  required
                  defaultValue={postToEdit?.slug || ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tag / Category
                </label>
                <input
                  name="tag"
                  type="text"
                  placeholder="e.g. Evaluation practice, Methods"
                  defaultValue={postToEdit?.tag || ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Published date
                </label>
                <input
                  name="published_at"
                  type="date"
                  defaultValue={postToEdit?.published_at ? new Date(postToEdit.published_at).toISOString().slice(0, 10) : ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Leave empty to use today&apos;s date.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Summary (appears in list)
              </label>
              <textarea
                name="summary"
                rows={3}
                defaultValue={postToEdit?.summary || ""}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Featured image (JPG/PNG)
              </label>
              <input
                name="featured_image_file"
                type="file"
                accept="image/*"
                className="w-full text-xs text-slate-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Optional. This image will appear on the homepage and knowledge hub cards.
              </p>
              {postToEdit?.featured_image_url && (
                <p className="mt-1 text-[11px] text-slate-500">
                  Current image:{" "}
                  <a
                    href={postToEdit.featured_image_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline"
                  >
                    View existing
                  </a>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Content (full article)
              </label>
              <textarea
                name="content"
                rows={8}
                defaultValue={(postToEdit as any)?.content || ""}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                placeholder="You can add paragraphs and line breaks. Later we can upgrade this to markdown."
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                <input
                  name="is_published"
                  type="checkbox"
                  defaultChecked={postToEdit ? !!postToEdit.is_published : true}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Published</span>
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
              >
                {postToEdit ? "Update post" : "Save post"}
              </button>
            </div>
          </form>
        </section>

        {/* Existing posts */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Existing posts
          </h2>
          {posts.length === 0 ? (
            <p className="text-xs text-slate-500">
              No posts found. Create your first article above.
            </p>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg bg-white border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      /knowledge-hub/{post.slug} •{" "}
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </p>
                    {post.tag && (
                      <p className="text-[11px] text-emerald-700 mt-1">
                        {post.tag}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[11px] text-slate-500">
                    <span>{post.is_published ? "Published" : "Draft"}</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/admin/blog?edit=${post.id}`}
                        className="text-emerald-700 hover:underline"
                      >
                        Edit
                      </a>
                      <form method="POST" action="/admin/blog/delete">
                        <input type="hidden" name="id" value={post.id} />
                        <button
                          type="submit"
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}