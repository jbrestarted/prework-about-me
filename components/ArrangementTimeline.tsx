"use client";

import type { ArrangementSection } from "@/lib/types";
import { DEVICE_META } from "./ui";

const ENERGY_COLOR = [
  "bg-ink-600",
  "bg-sky-700",
  "bg-emerald-600",
  "bg-amber-500",
  "bg-rose-500",
];

export function ArrangementTimeline({
  sections,
  activeId,
  onSelect,
}: {
  sections: ArrangementSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  const totalBars = sections.reduce((sum, s) => sum + s.bars, 0) || 1;

  return (
    <div className="card p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
        <span>Timeline</span>
        <span>{totalBars} bars total</span>
      </div>
      <div className="flex w-full overflow-hidden rounded-lg border border-ink-700">
        {sections.map((s) => {
          const widthPct = (s.bars / totalBars) * 100;
          const active = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => onSelect?.(s.id)}
              style={{ width: `${widthPct}%` }}
              className={`group relative min-w-[44px] border-r border-ink-900 px-2 py-3 text-left transition last:border-r-0 ${
                ENERGY_COLOR[s.energy - 1]
              } ${active ? "ring-2 ring-inset ring-white/70" : "hover:brightness-110"}`}
              title={`${s.name} · ${s.bars} bars · energy ${s.energy}`}
            >
              <div className="truncate text-[11px] font-semibold text-white/95">{s.name}</div>
              <div className="text-[10px] text-white/70">{s.bars} bars</div>
              <div className="mt-1 flex gap-0.5">
                {s.activeDevices.map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-white/80"
                    title={DEVICE_META[d].full}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
        <span>Energy:</span>
        {["1 low", "2", "3", "4", "5 peak"].map((l, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            <span className={`h-2 w-2 rounded-sm ${ENERGY_COLOR[i]}`} /> {l}
          </span>
        ))}
      </div>
    </div>
  );
}
