import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

type PageProps = {
  searchParams: Promise<{ submitted?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const { submitted, error } = await searchParams || {};

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-5xl space-y-8">
        {/* Header */}
        <header className="grid gap-6 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              Contact ID Evaluators
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
              Let’s talk about your evaluation, study or learning needs.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Share a short description of your programme and the decision you want to inform.
              We&apos;ll respond with clarifying questions and suggested options for scope, approach and timelines.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-600">
              {["Baseline / Midterm / Endline", "Learning reviews", "Research & analysis", "Training"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-sm">
            <div className="absolute inset-0 opacity-90">
              <Image
                src="/images/hero-workshop.jpg"
                alt="Training and evaluation workshop"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/25 to-transparent" />
            <div className="relative p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-wide text-emerald-200">
                Typical response
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-50">
                3–5 working days
              </p>
              <p className="mt-1 text-xs text-slate-200 max-w-xs">
                We usually reply with clarifying questions and a suggested approach.
              </p>
            </div>
          </div>
        </header>

        {/* Status banner */}
        {submitted === "1" && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950 shadow-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
              <div>
                <p className="font-semibold">Message received</p>
                <p className="text-xs text-emerald-900/80">
                  Thank you — we aim to respond within <span className="font-semibold">3–5 working days</span>.
                </p>
              </div>
            </div>
          </div>
        )}
        {error === "1" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 shadow-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-red-700" />
              <div>
                <p className="font-semibold">Something went wrong</p>
                <p className="text-xs text-red-800/80">
                  Please check required fields and try again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start text-[15px] sm:text-base">
          {/* FORM */}
          <div>
            <div className="rounded-2xl border border-slate-100 bg-white/80 backdrop-blur px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                What happens next
              </p>
              <div className="mt-2 grid gap-2 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-800">
                    1
                  </span>
                  <p>
                    We review your message and reply with clarifying questions.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-800">
                    2
                  </span>
                  <p>
                    We propose a scope, methods and timeline (and a quick call if needed).
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-800">
                    3
                  </span>
                  <p>
                    You receive practical deliverables tailored to decision-making.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-sm mt-6">
              <form
                action="/contact/submit"
                method="POST"
                encType="multipart/form-data"
                className="space-y-4 text-base sm:text-[17px]"
              >
                {/* Name & organisation */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Your name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Organisation
                    </label>
                    <input
                      name="organisation"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                      placeholder="NGO, agency, programme, etc."
                    />
                  </div>
                </div>

                {/* Email & role */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Work email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                      placeholder="you@example.org"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Role / position
                    </label>
                    <input
                      name="role"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                      placeholder="MEL officer, programme lead, etc."
                    />
                  </div>
                </div>

                {/* Type of support & timeframe */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Type of support
                    </label>
                    <select
                      name="service_type"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50 text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select an option</option>
                      <option value="evaluation">
                        Evaluation / review (baseline, mid-term, endline)
                      </option>
                      <option value="research">
                        Research / learning study
                      </option>
                      <option value="training">
                        Training / capacity support
                      </option>
                      <option value="other">
                        Other / not sure yet
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Approximate timeframe
                    </label>
                    <select
                      name="timeframe"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50 text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select one</option>
                      <option value="0-3">Within 0–3 months</option>
                      <option value="3-6">Within 3–6 months</option>
                      <option value="6-12">Within 6–12 months</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                {/* Project / programme description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Short description of your programme and decision needs
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                    placeholder="Briefly describe the programme, context, key questions you are exploring, and any existing documents we should be aware of."
                  />
                </div>

                {/* How did you hear & optional notes */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      How did you hear about ID Evaluators? (optional)
                    </label>
                    <select
                      name="referral"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50 text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select one</option>
                      <option value="referral">Colleague / partner referral</option>
                      <option value="web-search">Web search</option>
                      <option value="event">Event, training or presentation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Preferred contact method (optional)
                    </label>
                    <select
                      name="preferred_contact"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50 text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select one</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone call</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Any timing or budget notes? (optional)
                    </label>
                    <input
                      name="constraints"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50"
                      placeholder="For example: decision by June, tight timelines, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Attach a document (optional)
                    </label>
                    <input
                      name="attachment"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-600 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-500"
                    />
                    <p className="mt-1 text-sm text-slate-500">
                      Useful: ToR, logframe, MEL plan, proposal, or an existing report.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-sm text-slate-500">
                  <p>
                    We aim to respond within{" "}
                    <span className="font-semibold text-slate-700">3–5 working days</span>.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                  >
                    Send message
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            </div>
            {/* FAQ */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm mt-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    FAQ
                  </p>
                  <h2 className="mt-1 text-lg sm:text-xl font-semibold text-slate-900">
                    Quick answers before you send
                  </h2>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 open:bg-white open:border-emerald-200 open:shadow-sm transition">
                  <summary className="cursor-pointer list-none select-none">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-base font-semibold text-slate-900">
                        Do you work outside Ghana?
                      </p>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 group-open:text-emerald-700 group-open:border-emerald-200 transition">
                        <ArrowRight className="h-3.5 w-3.5 rotate-90 group-open:rotate-270 transition-transform duration-300" />
                      </span>
                    </div>
                  </summary>
                  <p className="mt-2 text-base text-slate-600 leading-relaxed">
                    Yes. We are based in Accra, Ghana and support organisations across Ghana and the wider region.
                    We can work fully remote or combine remote support with field teams depending on the scope.
                  </p>
                </details>

                <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 open:bg-white open:border-emerald-200 open:shadow-sm transition">
                  <summary className="cursor-pointer list-none select-none">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-base font-semibold text-slate-900">
                        How long does an evaluation usually take?
                      </p>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 group-open:text-emerald-700 group-open:border-emerald-200 transition">
                        <ArrowRight className="h-3.5 w-3.5 rotate-90 group-open:rotate-270 transition-transform duration-300" />
                      </span>
                    </div>
                  </summary>
                  <p className="mt-2 text-base text-slate-600 leading-relaxed">
                    It depends on scope, geography and data needs. Many rapid reviews take 2–6 weeks, while larger baseline/midterm/endline studies can run 8–16+ weeks.
                    We’ll propose a realistic timeline after clarifying your decision deadline and field constraints.
                  </p>
                </details>

                <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 open:bg-white open:border-emerald-200 open:shadow-sm transition">
                  <summary className="cursor-pointer list-none select-none">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-base font-semibold text-slate-900">
                        What should I include in the message?
                      </p>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 group-open:text-emerald-700 group-open:border-emerald-200 transition">
                        <ArrowRight className="h-3.5 w-3.5 rotate-90 group-open:rotate-270 transition-transform duration-300" />
                      </span>
                    </div>
                  </summary>
                  <p className="mt-2 text-base text-slate-600 leading-relaxed">
                    The basics: programme context, location(s), your key questions, and the decision you’re trying to inform.
                    If you have a ToR, proposal, MEL plan, logframe, or any relevant reports, mention them — we can review them after you share.
                  </p>
                </details>

                <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 open:bg-white open:border-emerald-200 open:shadow-sm transition">
                  <summary className="cursor-pointer list-none select-none">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">
                        Can you support training or capacity building too?
                      </p>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 group-open:text-emerald-700 group-open:border-emerald-200 transition">
                        <ArrowRight className="h-3.5 w-3.5 rotate-90 group-open:rotate-270 transition-transform duration-300" />
                      </span>
                    </div>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Yes. We provide practical training and coaching on evaluation design, data quality, analysis, reporting and learning.
                    You can request a short workshop, a tailored programme, or on-the-job coaching for teams.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="space-y-4 text-[15px] sm:text-base">
            <div className="rounded-3xl bg-white border border-slate-100 p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Contact details
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    ID Evaluators
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-sm text-slate-600 border border-slate-200">
                  <Clock className="h-3.5 w-3.5 text-emerald-700" />
                  Mon–Fri
                </div>
              </div>

              <div className="grid gap-3">
                <a
                  href="mailto:ewuahgideon@idevaluators.org"
                  className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">Email</p>
                      <p className="text-sm text-slate-600 truncate">
                        ewuahgideon@idevaluators.org
                      </p>
                      <p className="mt-1 text-sm text-emerald-700 font-medium group-hover:text-emerald-600">
                        Send an email
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+233531818410"
                  className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">Phone / WhatsApp</p>
                      <p className="text-sm text-slate-600">+233 (0) 531 818 410</p>
                      <p className="mt-1 text-sm text-emerald-700 font-medium group-hover:text-emerald-600">
                        Call now
                      </p>
                    </div>
                  </div>
                </a>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Location</p>
                      <p className="text-sm text-slate-600">
                        Accra, Ghana — supporting organisations across Ghana and the region.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-emerald-200">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">What to include</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Programme context + location(s)</li>
                      <li>Decision timeline + audience</li>
                      <li>Any ToR, proposal, logframe or MEL plan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
