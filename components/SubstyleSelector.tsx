"use client";

import type { SubstyleId } from "@/lib/types";
import { SUBSTYLES } from "@/lib/substyles";

export function SubstyleSelector({
  value,
  onChange,
}: {
  value: SubstyleId | null;
  onChange: (id: SubstyleId) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {SUBSTYLES.map((s) => {
        const active = value === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            className={`card p-3.5 text-left transition ${
              active
                ? "border-accent/70 bg-accent/10 shadow-glow"
                : "card-hover"
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-100">{s.name}</span>
              <span className="text-[11px] text-gray-500">
                {s.bpmRange[0]}–{s.bpmRange[1]}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">{s.blurb}</p>
          </button>
        );
      })}
    </div>
  );
}
