"use client";

import type { Project } from "@/lib/types";
import { STAGES } from "@/lib/stages";

export function StageStepper({
  project,
  activeStageId,
  onSelect,
}: {
  project: Project;
  activeStageId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="card p-2">
      <ol className="flex flex-col gap-0.5">
        {STAGES.map((stage, i) => {
          const status = project.stageStates[stage.id]?.status ?? "not-started";
          const active = stage.id === activeStageId;
          return (
            <li key={stage.id}>
              <button
                onClick={() => onSelect(stage.id)}
                className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                  active ? "bg-ink-800" : "hover:bg-ink-850"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-medium ${
                    status === "complete"
                      ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                      : status === "in-progress"
                      ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                      : active
                      ? "border-accent/60 bg-accent/15 text-accent-soft"
                      : "border-ink-600 text-gray-500"
                  }`}
                >
                  {status === "complete" ? "✓" : i + 1}
                </span>
                <span
                  className={`truncate ${
                    active ? "font-medium text-gray-100" : "text-gray-400 group-hover:text-gray-200"
                  }`}
                >
                  {stage.name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
