import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Handshake,
  BookOpen,
  LineChart,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
        <Image
          src="/images/hero-fieldwork.jpg"
          fill
          alt="Field evaluation session"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 to-slate-900/80" />

        <div className="absolute bottom-10 left-6 sm:left-10 text-white max-w-xl space-y-3">
          <p className="text-xs uppercase tracking-wide text-emerald-200">
            ID Evaluators
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            Independent project and programme evaluators for organisations
            working on impact.
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Grounded in field realities, informed by evidence, shaped by learning.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:py-14 max-w-5xl space-y-16">
        {/* WHO WE ARE */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Who we are
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
            ID Evaluators is an independent consultancy specialising in project and
            programme evaluation, mixed-methods research, and capacity-building.
            We work with NGOs, public-sector agencies and development partners to
            generate credible, actionable insights that strengthen programmes and
            improve outcomes.
          </p>
        </div>

        {/* VALUES */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-900">Our principles</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-3">
              <Users className="h-6 w-6 text-emerald-700" />
              <p className="font-semibold text-slate-900 text-sm">
                Participation & respect
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                We engage communities, stakeholders and programme teams in ways
                that recognise their knowledge and lived realities.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-3">
              <BookOpen className="h-6 w-6 text-emerald-700" />
              <p className="font-semibold text-slate-900 text-sm">Evidence-driven</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our evaluations draw on rigorous mixed-methods approaches,
                balancing qualitative insights with quantitative data.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm space-y-3">
              <Handshake className="h-6 w-6 text-emerald-700" />
              <p className="font-semibold text-slate-900 text-sm">Independence</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                We provide objective findings and practical recommendations that
                clients can trust for decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* HOW WE WORK */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-900">How we work</h3>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <Image
                src="/images/hero-workshop.jpg"
                alt="Stakeholder meeting"
                width={800}
                height={600}
                className="object-cover h-60 w-full"
              />
            </div>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <LineChart className="h-4 w-4 mt-1 text-emerald-700" />
                <span>
                  <strong>Plan collaboratively</strong> — clarifying evaluation
                  questions, stakeholder expectations and feasible methods.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-4 w-4 mt-1 text-emerald-700" />
                <span>
                  <strong>Engage stakeholders</strong> through interviews,
                  workshops, field visits and participatory data collection.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="h-4 w-4 mt-1 text-emerald-700" />
                <span>
                  <strong>Analyse evidence</strong> using mixed-methods tools to
                  ensure robust and credible findings.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Handshake className="h-4 w-4 mt-1 text-emerald-700" />
                <span>
                  <strong>Deliver actionable insights</strong> through clear
                  reporting, visual summaries and learning discussions.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* NEW SECTION — OUR TEAM & FIELD PRESENCE */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Our team & field presence
          </h3>

          <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
            Our work is grounded in both technical expertise and rich field engagement.
            We collaborate closely with communities, scrap dealers, local authorities,
            and programme teams. Whether in structured learning environments or in the
            heart of informal recycling settlements, we are committed to understanding
            realities on the ground.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Field team photo */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <Image
                src="/images/team-field.jpg"
                width={800}
                height={600}
                alt="Team engagement at e-waste site"
                className="object-cover w-full h-56 sm:h-64"
              />
            </div>

            {/* Meeting / workshop photo */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <Image
                src="/images/team-meeting.jpg"
                width={800}
                height={600}
                alt="Technical meeting session"
                className="object-cover w-full h-56 sm:h-64"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-slate-900 text-slate-50 p-6 space-y-3">
          <p className="text-xs uppercase tracking-wide text-emerald-200">
            Work with ID Evaluators
          </p>
          <p className="text-sm sm:text-base max-w-xl">
            Whether you are commissioning a baseline, exploring a complex evaluation
            question, or planning a learning review, we can support you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Contact us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}