import Link from "next/link";
import Image from "next/image";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import {
  FileText,
  BookOpen,
  ClipboardList,
  LineChart,
  Users,
  ArrowRight,
  Globe,
  Leaf,
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
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
  report_url?: string | null;
  cover_image_url?: string | null;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  tag: string | null;
  published_at: string | null;
  featured_image_url?: string | null;
};

export default async function HomePage() {
  const [{ data: evalData }, { data: blogData }] = await Promise.all([
    supabaseAdmin
      .from("evaluations")
      .select("*")
      .eq("is_published", true)
      .order("year", { ascending: false })
      .order("title", { ascending: true })
      .limit(3),
    supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .order("title", { ascending: true })
      .limit(3),
  ]);

  const evaluations = (evalData as Evaluation[] | null) || [];
  const posts = (blogData as BlogPost[] | null) || [];

  return (
    <main className="min-h-screen bg-slate-50 text-[15px] sm:text-[16px]">
      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-6xl space-y-12">
        {/* HERO */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
          {/* Text column */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ID Evaluators • Independent evaluators
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.03]">
              Practical evaluations, research and learning support for{" "}
              <span className="text-emerald-700">
                real-world programmes
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              ID Evaluators works with NGOs, public institutions and
              partners to design and deliver evaluations, studies and
              training that are grounded in field realities – not just
              desk reports.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
              >
                Speak to an evaluator
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-700 bg-white"
              >
                View our works
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 pt-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-emerald-600" />
                <span>Baseline, mid-term &amp; endline evaluations</span>
              </div>
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4 text-emerald-600" />
                <span>Mixed-methods research &amp; learning reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-600" />
                <span>Training &amp; accompaniment for teams</span>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="relative h-64 sm:h-80 lg:h-88">
            {/* Main fieldwork image */}
            <div className="absolute inset-y-0 right-0 w-[75%] rounded-3xl overflow-hidden bg-slate-900 shadow-lg shadow-slate-900/20">
              <Image
                src="/images/hero-fieldwork.jpg"
                alt="Field evaluation work in progress"
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
            </div>

            {/* Small workshop image */}
            <div className="absolute -left-2 bottom-4 sm:-left-6 sm:bottom-6 w-40 sm:w-48 rounded-2xl overflow-hidden bg-slate-800 shadow-md shadow-slate-900/40">
              <Image
                src="/images/hero-workshop.jpg"
                alt="Workshop or learning session"
                width={400}
                height={260}
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>

            {/* Overlay stats card */}
            <div className="absolute top-4 left-4 sm:left-6 rounded-2xl bg-white/90 backdrop-blur border border-slate-100 px-3 py-2.5 text-[11px] text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">
                Recent work snapshots
              </p>
              <ul className="mt-1 space-y-0.5">
                <li>• E-waste &amp; environment evaluations</li>
                <li>• Social protection &amp; livelihoods</li>
                <li>• Capacity building for local partners</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FOCUS AREAS STRIP */}
        <section className="rounded-3xl border border-slate-100 bg-white/80 backdrop-blur px-4 sm:px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Focus areas
              </p>
              <p className="text-sm sm:text-base font-semibold text-slate-900">
                Evaluation support across environment, livelihoods, governance and learning.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-[12px] font-semibold text-white hover:bg-slate-800"
            >
              See how we work
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Leaf, title: "Environment & e-waste", desc: "Impact tracking, compliance and learning." },
              { icon: ShieldCheck, title: "Social protection", desc: "Targeting, delivery and outcomes." },
              { icon: Globe, title: "Livelihoods & inclusion", desc: "Market systems and resilience." },
              { icon: GraduationCap, title: "Capacity building", desc: "Workshops, tools and accompaniment." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-5">
          <div className="h-px w-full bg-linear-to-r from-transparent via-slate-300/60 to-transparent" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                How it works
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                A clear, independent evaluation journey
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Simple steps, real field context, and decision-ready outputs — with independence and rigour built in.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              From scope → fieldwork → learning
            </div>
          </div>

          <div className="relative rounded-3xl border border-slate-100 bg-white/80 backdrop-blur p-4 sm:p-5 shadow-sm overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_10%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(700px_circle_at_90%_20%,rgba(15,23,42,0.06),transparent_55%)]" />

            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-stretch">
              {[
                {
                  step: "01",
                  title: "Scoping & design",
                  desc: "Clarify purpose, users and key questions. Agree methods, timeline and ethics.",
                  icon: ClipboardList,
                },
                {
                  step: "02",
                  title: "Fieldwork & analysis",
                  desc: "Collect data with stakeholders, then make sense of findings with a mixed-methods lens.",
                  icon: Users,
                },
                {
                  step: "03",
                  title: "Learning & use",
                  desc: "Validate insights, produce clear outputs and practical recommendations for decisions.",
                  icon: LineChart,
                },
              ].map((item, idx, arr) => (
                <div key={item.step} className="flex-1">
                  <div className="group h-full rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:border-emerald-200 hover:shadow-md transition">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2">
                          <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                            Step {item.step}
                          </span>
                          <span className="text-[11px] text-slate-400">•</span>
                          <span className="text-[11px] text-slate-500">Quick + practical</span>
                        </div>
                        <p className="text-base font-semibold text-slate-900 group-hover:text-emerald-800">
                          {item.title}
                        </p>
                      </div>

                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-emerald-200 shadow-sm">
                        <item.icon className="h-4 w-4" />
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Clear deliverables at each step</span>
                    </div>
                  </div>

                  {/* Process arrows */}
                  {idx < arr.length - 1 && (
                    <>
                      {/* Desktop arrow */}
                      <div className="hidden sm:flex justify-center my-2">
                        <div className="inline-flex items-center gap-2 text-emerald-700">
                          <span className="h-px w-10 bg-emerald-200" />
                          <ArrowRight className="h-4 w-4" />
                          <span className="h-px w-10 bg-emerald-200" />
                        </div>
                      </div>

                      {/* Mobile arrow (down) */}
                      <div className="flex sm:hidden justify-center my-1">
                        <div className="inline-flex items-center gap-2 text-emerald-700">
                          <ArrowRight className="h-4 w-4 rotate-90" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="space-y-4">
          <div className="h-px w-full bg-linear-to-r from-transparent via-slate-300/60 to-transparent" />
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
              What we do
            </h2>
            <Link
              href="/services"
              className="text-xs sm:text-[13px] text-emerald-700 hover:text-emerald-600 inline-flex items-center gap-1"
            >
              Explore services
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <ClipboardList className="h-4 w-4" />
              </div>
              <p className="text-base font-semibold text-slate-900">
                Evaluations &amp; reviews
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Baseline, mid-term, endline and thematic evaluations that
                combine fieldwork, document review and data analysis.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <LineChart className="h-4 w-4" />
              </div>
              <p className="text-base font-semibold text-slate-900">
                Research &amp; learning
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mixed-methods studies, learning reviews and evidence
                summaries to support programme and policy decisions.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Users className="h-4 w-4" />
              </div>
              <p className="text-base font-semibold text-slate-900">
                Training &amp; accompaniment
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tailored workshops, mentoring and on-the-job support for
                teams building evaluation and learning capacities.
              </p>
            </div>
          </div>
        </section>

        {/* TRUSTED BY */}
        <section className="rounded-3xl bg-slate-900 px-5 sm:px-6 py-6 text-slate-100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Who we work with
              </p>
              <p className="text-sm sm:text-base font-semibold">
                NGOs, donors, public institutions and research partners.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Supporting evidence-based decision-making across environment, social protection, livelihoods and capacity building.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "International NGOs",
              "Government agencies",
              "Foundations & donors",
              "Research institutions",
            ].map((label) => (
              <div
                key={label}
                className="rounded-xl bg-slate-800 px-3 py-2 text-center text-xs sm:text-sm font-medium text-slate-100"
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* OUR TEAM & FIELD PRESENCE */}
        <section className="space-y-4">
          <div className="h-px w-full bg-linear-to-r from-transparent via-slate-300/60 to-transparent" />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Our team &amp; field presence
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                Grounded in real contexts — not desk-only reports
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We combine stakeholder engagement, field visits and rigorous analysis to support practical decisions and learning.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-xs sm:text-[13px] text-emerald-700 hover:text-emerald-600"
            >
              Learn about our approach
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-12">
            <div className="relative h-56 sm:h-72 sm:col-span-7 rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm">
              <Image
                src="/images/hero-fieldwork.jpg"
                alt="Field presence and stakeholder engagement"
                fill
                className="object-cover transition duration-500 hover:scale-[1.02]"
                sizes="(min-width: 640px) 58vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-[11px] font-semibold text-emerald-200">
                  Field engagement
                </p>
                <p className="text-xs sm:text-sm text-slate-100">
                  Listening to stakeholders and observing implementation realities.
                </p>
              </div>
            </div>

            <div className="relative h-56 sm:h-72 sm:col-span-5 rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm">
              <Image
                src="/images/team-field.jpg"
                alt="Community-level fieldwork and observations"
                fill
                className="object-cover transition duration-500 hover:scale-[1.02]"
                sizes="(min-width: 640px) 42vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-[11px] font-semibold text-emerald-200">
                  Community presence
                </p>
                <p className="text-xs sm:text-sm text-slate-100">
                  Capturing context, outcomes and lived experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Ethical and inclusive practice",
                desc: "Respectful engagement, safeguarding and informed participation.",
              },
              {
                title: "Mixed-methods rigour",
                desc: "Qualitative depth + quantitative clarity for decisions.",
              },
              {
                title: "Use-focused learning",
                desc: "Recommendations designed for adoption and programme improvement.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/80 backdrop-blur border border-slate-100 px-4 py-3 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED EVALUATIONS */}
        <section className="space-y-4">
          <div className="h-px w-full bg-linear-to-r from-transparent via-slate-300/60 to-transparent" />
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              Selected evaluations &amp; studies
            </h2>
            <Link
              href="/case-studies"
              className="text-xs sm:text-[13px] text-emerald-700 hover:text-emerald-600 inline-flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {evaluations.length === 0 ? (
            <p className="text-xs text-slate-500">
              Case studies will appear here once you add published evaluations.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {evaluations.map((ev) => {
                const metaLine = [
                  ev.type,
                  ev.sector,
                  ev.location,
                  ev.year,
                ]
                  .filter(Boolean)
                  .join(" • ");

                return (
                  <Link
                    key={ev.id}
                    href={`/case-studies/${ev.slug}`}
                    className="group rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:border-emerald-200 hover:shadow-md transition flex flex-col gap-3 overflow-hidden"
                  >
                    <div className="relative h-50 rounded-xl overflow-hidden border border-slate-100 bg-slate-900">
                      <Image
                        src={ev.cover_image_url || "/images/hero-fieldwork.jpg"}
                        alt=""
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 transition duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 640px) 33vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/55 via-transparent to-transparent" />
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-700">
                      Evaluation / study
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-emerald-800">
                      {ev.title}
                    </h3>
                    {metaLine && (
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {metaLine}
                      </p>
                    )}
                    {ev.summary && (
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {ev.summary}
                      </p>
                    )}
                    {ev.report_url && (
                      <p className="mt-2 text-[11px] text-emerald-700">
                        Report available →
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* LATEST FROM KNOWLEDGE HUB */}
        <section className="space-y-4">
          <div className="h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent" />
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              Latest from news & blogs
            </h2>
            <Link
              href="/knowledge-hub"
              className="text-xs sm:text-[13px] text-emerald-700 hover:text-emerald-600 inline-flex items-center gap-1"
            >
              Browse all notes
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="text-xs text-slate-500">
              Articles will appear here once you publish posts in the admin.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {posts.map((post) => {
                const dateLabel = post.published_at
                  ? new Date(post.published_at).toLocaleDateString(
                      undefined,
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : null;

                return (
                  <Link
                    key={post.id}
                    href={`/knowledge-hub/${post.slug}`}
                    className="group rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:border-emerald-200 hover:shadow-md transition flex flex-col gap-3 overflow-hidden"
                  >
                    <div className="relative h-50 rounded-xl overflow-hidden border border-slate-100 bg-slate-900">
                      <Image
                        src={post.featured_image_url || "/images/hero-workshop.jpg"}
                        alt=""
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 transition duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 640px) 33vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/55 via-transparent to-transparent" />
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-700">
                      Knowledge note
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-emerald-800">
                      {post.title}
                    </h3>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      {dateLabel && <span>{dateLabel}</span>}
                      {post.tag && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                          {post.tag}
                        </span>
                      )}
                    </div>
                    {post.summary && (
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}