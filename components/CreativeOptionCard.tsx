"use client";

import { useState } from "react";
import type { CreativeOption } from "@/lib/types";
import { DeviceBadge, DifficultyDot } from "./ui";

export function CreativeOptionCard({
  option,
  onSave,
  saved,
}: {
  option: CreativeOption;
  onSave?: (option: CreativeOption) => void;
  saved?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card card-hover flex flex-col p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-gray-100">{option.title}</h3>
        <DeviceBadge device={option.recommendedDevice} />
      </div>

      <p className="mb-3 text-sm leading-relaxed text-gray-400">{option.description}</p>

      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        <DifficultyDot level={option.difficulty} />
        <span className="text-xs text-gray-500">{option.whenToUse}</span>
      </div>

      {open && (
        <div className="mb-3 space-y-3 rounded-lg border border-ink-700 bg-ink-900 p-3">
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              How to do it
            </div>
            <ol className="list-decimal space-y-1 pl-4 text-sm text-gray-300">
              {option.implementationSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Variations to try
            </div>
            <ul className="list-disc space-y-1 pl-4 text-sm text-gray-400">
              {option.variationIdeas.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center gap-2 pt-1">
        <button className="btn-subtle px-2 py-1 text-xs" onClick={() => setOpen((v) => !v)}>
          {open ? "Hide steps" : "Show steps"}
        </button>
        {onSave && (
          <button
            className={saved ? "btn-ghost ml-auto px-2 py-1 text-xs" : "btn-primary ml-auto px-2 py-1 text-xs"}
            onClick={() => onSave(option)}
            disabled={saved}
          >
            {saved ? "✓ Saved" : "Save to project"}
          </button>
        )}
      </div>
    </div>
  );
}
