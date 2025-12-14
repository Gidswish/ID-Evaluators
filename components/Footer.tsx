import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  FileText,
  BookOpen,
  ClipboardList,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
      {/* Soft glow */}
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_circle_at_15%_0%,rgba(16,185,129,0.18),transparent_55%),radial-gradient(700px_circle_at_90%_20%,rgba(148,163,184,0.10),transparent_55%)]" />
        <div className="relative container mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-3 md:col-span-1">
              <div className="inline-flex items-center gap-2">
                <div className="h-9 w-9 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-300">ID</span>
                </div>
                <div>
                  <p className="text-base font-semibold text-white">ID Evaluators</p>
                  <p className="text-xs text-slate-400">Independent evaluators</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Project and programme evaluation, research, and training—built for
                practical decisions and learning.
              </p>

              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900/40 text-slate-200 hover:bg-slate-900"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900/40 text-slate-200 hover:bg-slate-900"
                  aria-label="Twitter/X"
                >
                  <Twitter className="h-4 w-4" />
                </a>

                {/* Subtle admin link */}
                <Link
                  href="/admin/blog"
                  className="ml-1 inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:bg-slate-900"
                >
                  Admin
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Explore
              </p>
              <nav className="space-y-2 text-sm">
                <Link href="/about" className="block text-slate-200 hover:text-emerald-300">
                  About us
                </Link>
                <Link href="/services" className="block text-slate-200 hover:text-emerald-300">
                  Services
                </Link>
                <Link href="/case-studies" className="block text-slate-200 hover:text-emerald-300">
                  Our works
                </Link>
                <Link href="/knowledge-hub" className="block text-slate-200 hover:text-emerald-300">
                  News & blog
                </Link>
                <Link href="/contact" className="block text-slate-200 hover:text-emerald-300">
                  Contact
                </Link>
              </nav>
            </div>

            {/* What we do */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                What we do
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-3">
                  <ClipboardList className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Project evaluation</p>
                    <p className="text-xs text-slate-300">
                      Baseline, midterm, endline, learning reviews.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-3">
                  <FileText className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Research & evidence</p>
                    <p className="text-xs text-slate-300">
                      Mixed methods, tools, analysis, reporting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-3">
                  <BookOpen className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Training</p>
                    <p className="text-xs text-slate-300">
                      Workshops, capacity building, MEL support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Contact
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="h-4 w-4 text-emerald-300" />
                  <a className="hover:text-emerald-300" href="mailto:info@idevaluators.com">
                    ewuahgideon@idevaluators.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="h-4 w-4 text-emerald-300" />
                  <a className="hover:text-emerald-300" href="tel:+233000000000">
                    +233 53 181 8410
                  </a>
                </div>
                <div className="flex items-start gap-2 text-slate-200">
                  <MapPin className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <p className="leading-relaxed">
                    Accra, Ghana <span className="text-slate-400">(and remote)</span>
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
              >
                Request an evaluation
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>

              <p className="text-[11px] text-slate-400">
                We typically respond within 1–2 business days.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">
              © {year} ID Evaluators. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <Link href="/privacy" className="text-slate-400 hover:text-emerald-300">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-emerald-300">
                Terms
              </Link>
              <a
                href="#top"
                className="text-slate-400 hover:text-emerald-300"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}