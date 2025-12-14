import { cookies } from "next/headers";
import Link from "next/link";
import { AdminTabs } from "@/components/AdminTabs";
import AdminRedirectField from "@/components/AdminRedirectField";

type PageProps = {
  searchParams: Promise<{ error?: string; logged_out?: string; logged_in?: string }>;
};

export default async function AdminDashboard({ searchParams }: PageProps) {
  const { error: errorQuery, logged_out: loggedOutQuery, logged_in: loggedInQuery } =
    await searchParams;
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("is_admin")?.value === "true";

  if (!isAdmin) {
    // Not logged in → password form
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="container mx-auto px-4 py-16 max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Admin login</h1>
          {loggedOutQuery === "1" && (
            <p className="mb-3 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
              You have been logged out.
            </p>
          )}
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
            {/* Ensure login from /admin returns to /admin after success */}
            <input type="hidden" name="redirect_to" value="/admin" />
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

  // Logged in → dashboard with "tabs"
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-4xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Admin dashboard
          </h1>
          <p className="text-sm text-slate-600">
            Manage public content for ID Evaluators. Use the tabs below to switch between News &amp; blog
            and Our works.
          </p>
        </header>

        {/* Tabs */}
        <AdminTabs />
        <a
          href="/admin/logout"
          className="text-xs text-slate-500 hover:text-red-600 transition ml-auto"
        >
          Logout
        </a>

        {loggedInQuery === "1" && (
          <p className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
            You are now logged in.
          </p>
        )}

        {/* Small descriptions under the tabs */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-700">
                News &amp; blog
              </p>
              <h2 className="text-sm font-semibold text-slate-900">
                Articles & practice notes
              </h2>
              <p className="text-xs text-slate-600">
                Create short articles, practice notes and updates that appear in the public News &amp; blog
                section.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <Link
                href="/admin/blog"
                className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-1.5 font-semibold text-white hover:bg-emerald-500"
              >
                Open blog tab
              </Link>
              <Link
                href="/knowledge-hub"
                className="text-slate-500 hover:text-emerald-700"
              >
                View public blog →
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-700">
                Our works
              </p>
              <h2 className="text-sm font-semibold text-slate-900">
                Evaluations & studies
              </h2>
              <p className="text-xs text-slate-600">
                Add and maintain examples of evaluations and studies that appear in the Our works
                section.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <Link
                href="/admin/works"
                className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-1.5 font-semibold text-white hover:bg-emerald-500"
              >
                Open works tab
              </Link>
              <Link
                href="/case-studies"
                className="text-slate-500 hover:text-emerald-700"
              >
                View public works →
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}