"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home", icon: "◎" },
  { href: "/projects", label: "Projects", icon: "🗂" },
  { href: "/projects/new", label: "New Project", icon: "＋" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-ink-800 bg-ink-900 px-4 py-6 md:flex">
      <Link href="/" className="mb-8 flex items-center gap-2.5 px-1">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-a4 text-lg font-bold text-ink-950">
          B
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-gray-100">Beatsmith</div>
          <div className="text-[11px] text-gray-500">MPC × Elektron copilot</div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-ink-800 text-gray-100"
                  : "text-gray-400 hover:bg-ink-850 hover:text-gray-200"
              }`}
            >
              <span className="w-4 text-center text-gray-500">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 px-1">
        <div className="rounded-lg border border-ink-800 bg-ink-850 p-3">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-gray-500">
            Signal chain
          </div>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center gap-2 text-mpc">
              <span className="h-1.5 w-1.5 rounded-full bg-mpc" /> MPC — clock + arranger
            </li>
            <li className="flex items-center gap-2 text-rytm">
              <span className="h-1.5 w-1.5 rounded-full bg-rytm" /> Rytm — drums
            </li>
            <li className="flex items-center gap-2 text-a4">
              <span className="h-1.5 w-1.5 rounded-full bg-a4" /> A4 — bass / melody
            </li>
          </ul>
        </div>
        <p className="px-1 text-[11px] text-gray-600">Local-first · saved in your browser</p>
      </div>
    </aside>
  );
}
