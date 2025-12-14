import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList,
  LineChart,
  Users,
  FileSearch,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Globe,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-slate-900">
        <div className="relative h-[50vh] min-h-80 max-h-[460px]">
          <Image
            src="/images/hero-workshop.jpg"
            alt="Workshop or evaluation learning session"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/85 via-slate-900/70 to-slate-900/30" />

          <div className="relative h-full container mx-auto max-w-5xl px-4 flex items-center">
            <div className="space-y-4 text-white max-w-xl">
              <p className="text-xs uppercase tracking-wide text-emerald-200">
                Services
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Evaluation, research and learning services tailored to your
                programme decisions.
              </h1>
              <p className="text-sm sm:text-base text-slate-200">
                From baselines and endline evaluations to mixed-methods studies
                and training, ID Evaluators supports organisations working on
                environment, e-waste, livelihoods and social impact.
              </p>
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  Discuss a potential assignment
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-200/80 px-4 py-2 font-medium text-emerald-50 hover:bg-emerald-50/10"
                >
                  View examples of our work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-5xl space-y-14">
        {/* THREE SERVICE PILLARS */}
        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Our core service areas
          </h2>
          <p className="text-sm text-slate-700 max-w-3xl">
            We design and deliver work that is proportionate, methodologically
            sound and aligned with your decision needs and timelines.
          </p>

          <div className="grid gap-5 sm:grid-cols-3">
            {/* Evaluations */}
            <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <ClipboardList className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-slate-900">
                Evaluations &amp; reviews
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Baseline, mid-term, endline and thematic evaluations that
                combine fieldwork, document review and data analysis.
              </p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                <li>• Project and programme evaluations</li>
                <li>• Theory-based and utilisation-focused designs</li>
                <li>• Contribution analysis and learning-oriented reviews</li>
              </ul>
            </div>

            {/* Research & learning */}
            <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <LineChart className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-slate-900">
                Research &amp; learning
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mixed-methods studies and learning products that synthesise
                evidence for programme design and adaptation.
              </p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                <li>• Mixed-methods and qualitative studies</li>
                <li>• Learning reviews and evidence summaries</li>
                <li>• Policy briefs and practice notes</li>
              </ul>
            </div>

            {/* Training & support */}
            <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Users className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-slate-900">
                Training &amp; accompaniment
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailored capacity support for teams responsible for monitoring,
                evaluation and learning functions.
              </p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                <li>• Short courses and in-house workshops</li>
                <li>• Hands-on mentoring during live assignments</li>
                <li>• Support to design MEL frameworks and tools</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EVALUATION PROCESS TIMELINE */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900">
            A typical evaluation process
          </h3>
          <p className="text-sm text-slate-700 max-w-3xl">
            Each assignment is tailored, but many evaluations follow a similar
            structure. We are transparent about steps, roles and timelines.
          </p>

          <div className="grid gap-4 sm:grid-cols-4 text-xs">
            <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm space-y-2">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <span className="text-[11px] font-semibold">1</span>
              </div>
              <p className="font-semibold text-slate-900 text-xs">
                Scoping & design
              </p>
              <p className="text-[11px] text-slate-600">
                Clarify purpose, questions, stakeholders, scope and feasible
                methods in collaboration with your team.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm space-y-2">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <span className="text-[11px] font-semibold">2</span>
              </div>
              <p className="font-semibold text-slate-900 text-xs">
                Data collection
              </p>
              <p className="text-[11px] text-slate-600">
                Fieldwork combining interviews, focus groups, surveys and
                document review, with attention to ethics and safety.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm space-y-2">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <span className="text-[11px] font-semibold">3</span>
              </div>
              <p className="font-semibold text-slate-900 text-xs">
                Analysis & sense-making
              </p>
              <p className="text-[11px] text-slate-600">
                Triangulate evidence, test emerging findings and, where
                appropriate, engage stakeholders in reflection sessions.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm space-y-2">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <span className="text-[11px] font-semibold">4</span>
              </div>
              <p className="font-semibold text-slate-900 text-xs">
                Reporting & learning
              </p>
              <p className="text-[11px] text-slate-600">
                Share clear deliverables and facilitate learning discussions,
                focusing on actionable recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* THEMES / SECTORS */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Sectors and themes we often work in
          </h3>
          <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-700">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1">
                <Globe className="h-3.5 w-3.5 text-emerald-700" />
                Environment &amp; e-waste
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Livelihoods &amp; enterprise support
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Social protection &amp; cash transfer programmes
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Skills, education &amp; youth
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-600">
              We also partner with other specialists where highly technical
              sector expertise is required, while maintaining overall evaluation
              quality and coherence.
            </p>
          </div>
        </section>

        {/* TRAINING SECTION */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-emerald-700" />
            Training and accompaniment for MEL teams
          </h3>
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
            <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-3 text-xs text-slate-700">
              <p>
                We design short, focused learning spaces that respond to real
                questions from your monitoring, evaluation and learning (MEL)
                practice.
              </p>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>Designing or revisiting theories of change.</li>
                <li>Developing practical MEL frameworks and indicators.</li>
                <li>Planning and commissioning evaluations.</li>
                <li>Working with qualitative and quantitative data.</li>
                <li>Facilitating reflection and learning sessions.</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-900 text-slate-50 p-5 space-y-2 text-xs">
              <p className="text-emerald-200 uppercase tracking-wide">
                Example formats
              </p>
              <ul className="space-y-1.5">
                <li>• 1–2 day in-person workshops for project teams</li>
                <li>• Remote clinics over several weeks</li>
                <li>• Shadowing / co-facilitation during live evaluations</li>
                <li>• One-on-one mentoring for MEL focal points</li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-1.5 mt-2 text-[11px] font-semibold text-white hover:bg-emerald-500"
              >
                Talk to us about training
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900">
            Ready to explore an evaluation, study or training?
          </p>
          <p className="text-sm text-emerald-900 max-w-3xl">
            Share a short description of your programme, the decision you are
            trying to inform, and any timelines you are working to. We will come
            back with suggestions for scope and possible approaches.
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500"
            >
              Contact ID Evaluators
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-4 py-2 font-medium text-emerald-900 hover:bg-emerald-100"
            >
              See examples of previous work
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}