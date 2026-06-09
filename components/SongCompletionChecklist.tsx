"use client";

import type { Project } from "@/lib/types";
import { useStore } from "@/lib/store";
import { Checklist } from "./Checklist";
import { ProgressBar } from "./ui";

export function SongCompletionChecklist({ project }: { project: Project }) {
  const { updateProject } = useStore();
  const items = project.completionChecklist;
  const done = items.filter((i) => i.done).length;
  const pct = Math.round((done / items.length) * 100);

  function toggle(id: string) {
    updateProject(project.id, (p) => ({
      ...p,
      completionChecklist: p.completionChecklist.map((c) =>
        c.id === id ? { ...c, done: !c.done } : c
      ),
    }));
  }

  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Song completion
        </h2>
        <span className="text-xs font-medium text-gray-400">{pct}%</span>
      </div>
      <ProgressBar value={pct} className="mb-4" />
      <Checklist items={items} onToggle={toggle} />
      {pct === 100 && (
        <p className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          🎉 Track complete — bounce it and start the next one.
        </p>
      )}
    </div>
  );
}
