"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Our works" },
  { href: "/knowledge-hub", label: "News & blog" },
  { href: "/contact", label: "Contact", isPrimary: true },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex items-baseline gap-1"
          onClick={close}
        >
          <span className="text-xl font-semibold tracking-tight">
            ID <span className="text-emerald-700">Evaluators</span>
          </span>
          <span className="hidden text-[11px] text-slate-500 sm:inline">
            independent evaluators
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-700">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            const baseClasses = link.isPrimary
              ? "inline-flex items-center rounded-full border border-emerald-600 px-4 py-1.5 text-emerald-700 hover:bg-emerald-50"
              : "hover:text-emerald-700";

            const activeClasses = !link.isPrimary
              ? " text-emerald-700"
              : " bg-emerald-600 text-white hover:bg-emerald-700";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  baseClasses + (isActive ? activeClasses : "")
                }
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
          className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-300 p-2 text-slate-700 hover:bg-slate-100"
          aria-label="Toggle navigation"
        >
          {/* Simple icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              const baseClasses = link.isPrimary
                ? "inline-flex items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-emerald-700 hover:bg-emerald-50"
                : "rounded-lg px-3 py-2 hover:bg-slate-100";

              const activeClasses = !link.isPrimary
                ? " bg-slate-100 text-emerald-700"
                : " bg-emerald-600 text-white hover:bg-emerald-700";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={baseClasses + (isActive ? activeClasses : "")}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}