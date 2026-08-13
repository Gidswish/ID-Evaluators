import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] bg-emerald-50/50 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-800 text-sm font-medium border border-emerald-200 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Accepting new audits for Q1 2026
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Data-driven insights for <span className="text-emerald-700">measurable impact.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              We help organizations navigate complexity through independent evaluation, rigorous data analysis, and strategic advisory.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="bg-emerald-700 text-white px-8 py-3.5 rounded-full font-medium hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/20"
              >
                Explore our services
              </Link>
              <Link
                href="/case-studies"
                className="px-8 py-3.5 rounded-full font-medium text-slate-700 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 transition-all"
              >
                View case studies
              </Link>
            </div>

            {/* Trust Signals / Metrics */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-slate-900">12+</p>
                <p className="text-sm text-slate-500 mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">150+</p>
                <p className="text-sm text-slate-500 mt-1">Projects Evaluated</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">$2B</p>
                <p className="text-sm text-slate-500 mt-1">Funds Optimized</p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 bg-white">
               <div className="aspect-4/3 relative group">
                  <Image
                    src="/images/team-meeting.jpg"
                    alt="Team reviewing evaluation data together"
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-slate-900/10 to-transparent" />
               </div>
            </div>
            
            {/* Floating Card Element */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Efficiency Gain</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">+24.5%</div>
              <div className="text-xs text-slate-500 mt-1">Average client improvement</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}