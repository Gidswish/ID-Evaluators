"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminTabs() {
  const pathname = usePathname();

  const tabs = [
    { href: "/admin/blog", label: "News & blog" },
    { href: "/admin/works", label: "Our works" },
    { href: "/admin/contact", label: "Contact inquiries" },
  ];

  return (
    <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              "rounded-full px-4 py-1.5 transition " +
              (isActive
                ? "bg-white text-emerald-700 shadow-sm"
                : "hover:text-emerald-700 hover:bg-white")
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}