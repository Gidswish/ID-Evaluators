"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/case-studies", label: "Our Work" },
  { href: "/knowledge-hub", label: "Insights" }, // "Insights" sounds more consultancy-like than "News"
  { href: "/contact", label: "Get in Touch", isPrimary: true },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add shadow/border logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/50"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2" onClick={close}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-emerald-200 shadow-lg transition-transform group-hover:scale-105">
            <span className="font-bold text-lg">ID</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Evaluators
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
              Consultancy Group
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            if (link.isPrimary) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-700/20 hover:-translate-y-0.5"
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-emerald-700 font-semibold" : "text-slate-600 hover:text-emerald-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={toggle}
          className="md:hidden p-2 text-slate-600 transition-colors hover:text-slate-900 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <div className="w-6 flex flex-col items-end gap-[5px]">
            <span
              className={`h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-current transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`absolute top-20 left-0 w-full border-b bg-white shadow-xl transition-all duration-300 ease-in-out md:hidden ${
          open
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  link.isPrimary
                    ? "bg-slate-900 text-white justify-center shadow-lg shadow-slate-900/20 mt-2"
                    : isActive
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "hover:bg-slate-50 text-slate-600"
                }`}
              >
                {link.label}
                {!link.isPrimary && (
                   <span className="text-xs opacity-50">↗</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}