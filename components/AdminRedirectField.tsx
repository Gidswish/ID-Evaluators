"use client";

import { usePathname } from "next/navigation";

export default function AdminRedirectField() {
  const pathname = usePathname();

  return <input type="hidden" name="redirect_to" value={pathname} />;
}