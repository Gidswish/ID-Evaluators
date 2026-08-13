import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900">
      <div className="container mx-auto px-6">
        
        {/* Top Section: CTA & Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-emerald-900/20 shadow-lg">
                <span className="font-bold text-lg">ID</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none">
                  Evaluators
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                  Consultancy Group
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Independent evaluators providing rigorous data analysis and strategic advisory to help organizations measure impact and optimize performance.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              {[
                { label: "LinkedIn", path: "#" },
                { label: "Twitter", path: "#" },
                { label: "GitHub", path: "#" }
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.path}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 hover:bg-emerald-900/30 hover:text-emerald-400 transition-colors border border-slate-800"
                  aria-label={social.label}
                >
                  {/* Simple placeholder icon - replace with real SVGs */}
                  <span className="text-xs font-semibold">{social.label[0]}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Company</h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                <li><Link href="/sectors" className="hover:text-emerald-400 transition-colors">Sectors</Link></li>
                <li><Link href="/case-studies" className="hover:text-emerald-400 transition-colors">Our Work</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Services</h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Impact Evaluation</Link></li>
                <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Data Analytics</Link></li>
                <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Strategic Advisory</Link></li>
                <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Capacity Building</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact/Newsletter */}
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Stay Updated</h4>
              <p className="text-xs text-slate-500 mb-2">
                Get the latest insights on evaluation trends directly to your inbox.
              </p>
              <form className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-600 transition-colors"
                />
                <button className="bg-white text-slate-900 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-slate-800 to-transparent my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <p>© {currentYear} ID Evaluators. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}