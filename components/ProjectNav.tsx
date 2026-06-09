"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProjectNav({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const base = `/projects/${projectId}`;
  const tabs = [
    { href: base, label: "Overview" },
    { href: `${base}/workflow`, label: "Workflow" },
    { href: `${base}/arrangement`, label: "Arrangement" },
    { href: `${base}/ideas`, label: "Ideas" },
    { href: `${base}/hardware`, label: "Hardware" },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-1 border-b border-ink-800 pb-px">
      {tabs.map((t) => {
        const active = t.href === base ? pathname === base : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`rounded-t-lg px-3.5 py-2 text-sm transition ${
              active
                ? "border-b-2 border-accent font-medium text-gray-100"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
