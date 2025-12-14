import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { AdminTabs } from "@/components/AdminTabs";
import AdminRedirectField from "@/components/AdminRedirectField";

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
  report_file_path?: string | null;
  cover_image_url?: string | null;
  cover_image_path?: string | null;
};

type PageProps = {
  searchParams: Promise<{ error?: string; logged_in?: string; edit?: string }>;
};

export default async function AdminWorksPage({ searchParams }: PageProps) {
  const {
    error: errorQuery,
    logged_in: loggedInQuery,
    edit: editId
  } = await searchParams;
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("is_admin")?.value === "true";

  if (!isAdmin) {
    // Reuse the same login flow, just a different page heading
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
            <input type="hidden" name="redirect_to" value="/admin/works" />
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

  // Logged in – fetch evaluations
  const { data, error } = await supabaseAdmin
    .from("evaluations")
    .select("*")
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });

  const evaluations = (data as Evaluation[] | null) || [];

  const evaluationToEdit = editId
    ? evaluations.find((ev) => ev.id === editId) || null
    : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-5xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Our works – Admin
          </h1>
          {error && (
            <p className="text-xs text-red-600">
              Could not load evaluations: {error.message}
            </p>
          )}
          {errorQuery && errorQuery !== "1" && (
            <p className="text-xs text-red-600">
              {errorQuery}
            </p>
          )}
          <p className="text-sm text-slate-600">
            Create new evaluation entries, upload a cover image and (optionally) attach a PDF report. You can also edit or delete existing entries below.
          </p>
        </header>

        <AdminTabs />
        <a
            href="/admin/logout"
            className="text-xs text-slate-500 hover:text-red-600 transition ml-auto"
            >
            Logout
        </a>

        {/* New evaluation form */}
        <section className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            {evaluationToEdit ? "Edit evaluation / study" : "Add a new evaluation / study"}
          </h2>
          <form
            method="POST"
            action={evaluationToEdit ? "/admin/works/update" : "/admin/works/new"}
            encType="multipart/form-data"
            className="space-y-4 text-sm"
          >
            {evaluationToEdit && (
              <input type="hidden" name="id" value={evaluationToEdit.id} />
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
                  defaultValue={evaluationToEdit?.title ?? ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Slug (URL, e.g. midterm-ewaste-pilot)
                </label>
                <input
                  name="slug"
                  type="text"
                  required
                  defaultValue={evaluationToEdit?.slug ?? ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Type
                </label>
                <input
                  name="type"
                  type="text"
                  placeholder="e.g. Mid-term review, Endline evaluation"
                  defaultValue={evaluationToEdit?.type ?? ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Sector
                </label>
                <input
                  name="sector"
                  type="text"
                  placeholder="e.g. Environment & e-waste"
                  defaultValue={evaluationToEdit?.sector ?? ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Year
                </label>
                <input
                  name="year"
                  type="text"
                  placeholder="e.g. 2024"
                  defaultValue={evaluationToEdit?.year ?? ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Location
                </label>
                <input
                  name="location"
                  type="text"
                  placeholder="e.g. West Africa, Urban centres"
                  defaultValue={evaluationToEdit?.location ?? ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Summary (appears in list)
              </label>
              <textarea
                name="summary"
                rows={3}
                defaultValue={evaluationToEdit?.summary ?? ""}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Content (details, methods, findings)
              </label>
              <textarea
                name="content"
                rows={8}
                defaultValue={evaluationToEdit?.content ?? ""}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                placeholder="Add more detail about the evaluation – key questions, methods, insights."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Cover image (JPG/PNG)
              </label>
              <input
                name="cover_file"
                type="file"
                accept="image/*"
                className="w-full text-xs text-slate-600"
              />
              {evaluationToEdit?.cover_image_url && (
                <p className="mt-1 text-[11px] text-slate-500">
                  Current cover:{" "}
                  <a
                    href={evaluationToEdit.cover_image_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline"
                  >
                    View existing cover
                  </a>
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Attach report (PDF)
              </label>
              <input
                name="report_file"
                type="file"
                accept="application/pdf"
                className="w-full text-xs text-slate-600"
              />
              {evaluationToEdit?.report_url && (
                <p className="mt-1 text-[11px] text-slate-500">
                  Current file:{" "}
                  <a
                    href={evaluationToEdit.report_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline"
                  >
                    View existing report
                  </a>
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                <input
                  name="is_published"
                  type="checkbox"
                  defaultChecked={evaluationToEdit ? evaluationToEdit.is_published : true}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Published</span>
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
              >
                Save evaluation
              </button>
            </div>
          </form>
        </section>

        {/* Existing evaluations */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Existing evaluations
          </h2>
          {evaluations.length === 0 ? (
            <p className="text-xs text-slate-500">
              No entries found. Add your first evaluation above.
            </p>
          ) : (
            <div className="space-y-2">
              {evaluations.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-lg bg-white border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {ev.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      /case-studies/{ev.slug}
                      {ev.year ? ` • ${ev.year}` : ""}
                    </p>
                    {ev.type && (
                      <p className="text-[11px] text-emerald-700 mt-1">
                        {ev.type}
                      </p>
                    )}
                    {ev.sector && (
                      <p className="text-[11px] text-slate-600">
                        {ev.sector}
                      </p>
                    )}
                    {ev.report_url && (
                      <p className="text-[11px] text-emerald-700 mt-1">
                        <a
                          href={ev.report_url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          View report →
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[11px] text-slate-500">
                    <span>{ev.is_published ? "Published" : "Draft"}</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/admin/works?edit=${ev.id}`}
                        className="text-emerald-700 hover:underline"
                      >
                        Edit
                      </a>
                      <form method="POST" action="/admin/works/delete">
                        <input type="hidden" name="id" value={ev.id} />
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
