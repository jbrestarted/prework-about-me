"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";
import { getSubstyle } from "@/lib/substyles";
import { STAGES } from "@/lib/stages";
import { ProgressBar } from "./ui";

export function ProjectCard({ project }: { project: Project }) {
  const style = getSubstyle(project.substyle);
  const completeStages = STAGES.filter(
    (s) => project.stageStates[s.id]?.status === "complete"
  ).length;
  const pct = Math.round((completeStages / STAGES.length) * 100);

  return (
    <Link href={`/projects/${project.id}`} className="card card-hover block p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-100">{project.title}</h3>
          <p className="truncate text-xs text-gray-500">
            {project.producerName ? `${project.producerName} · ` : ""}
            {style.name}
          </p>
        </div>
        <span className="chip border-accent/40 bg-accent/10 text-accent-soft">{style.name}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-400">
        <span className="rounded bg-ink-800 px-2 py-1">{project.bpm} BPM</span>
        <span className="rounded bg-ink-800 px-2 py-1">
          {project.key} {project.scale}
        </span>
        {project.mood && (
          <span className="truncate rounded bg-ink-800 px-2 py-1">{project.mood}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <ProgressBar value={pct} />
        <span className="shrink-0 text-xs font-medium text-gray-400">{pct}%</span>
      </div>
      <p className="mt-1.5 text-[11px] text-gray-600">
        {completeStages} / {STAGES.length} stages · updated{" "}
        {new Date(project.updatedAt).toLocaleDateString()}
      </p>
    </Link>
  );
}
