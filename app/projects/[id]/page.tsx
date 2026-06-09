"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { ProjectGate } from "@/components/ProjectGate";
import { ProjectSettingsForm } from "@/components/ProjectSettingsForm";
import { SongCompletionChecklist } from "@/components/SongCompletionChecklist";
import { ProgressBar } from "@/components/ui";
import { STAGES, STAGE_MAP } from "@/lib/stages";
import { nextRecommendedStageId } from "@/lib/ideaGenerator";
import { getSubstyle } from "@/lib/substyles";

export default function ProjectOverviewPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { deleteProject } = useStore();

  return (
    <ProjectGate id={params.id}>
      {(project) => {
        const style = getSubstyle(project.substyle);
        const completeStages = STAGES.filter(
          (s) => project.stageStates[s.id]?.status === "complete"
        ).length;
        const pct = Math.round((completeStages / STAGES.length) * 100);
        const nextId = nextRecommendedStageId(project);
        const nextStage = STAGE_MAP[nextId];

        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-50">{project.title}</h1>
                <p className="mt-1 text-sm text-gray-400">
                  {project.producerName ? `${project.producerName} · ` : ""}
                  {style.name} · {project.bpm} BPM · {project.key} {project.scale}
                  {project.mood ? ` · ${project.mood}` : ""}
                </p>
              </div>
              <button
                className="btn-subtle px-3 py-1.5 text-xs text-rose-400"
                onClick={() => {
                  if (confirm(`Delete "${project.title}"? This can't be undone.`)) {
                    deleteProject(project.id);
                    router.push("/projects");
                  }
                }}
              >
                Delete project
              </button>
            </div>

            {/* Progress + next action */}
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="card p-5 lg:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Production progress
                  </h2>
                  <span className="text-xs text-gray-400">
                    {completeStages} / {STAGES.length} stages
                  </span>
                </div>
                <ProgressBar value={pct} className="mb-4" />
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {STAGES.map((s, i) => {
                    const st = project.stageStates[s.id]?.status ?? "not-started";
                    return (
                      <Link
                        key={s.id}
                        href={`/projects/${project.id}/workflow?stage=${s.id}`}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition hover:bg-ink-800"
                      >
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${
                            st === "complete"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : st === "in-progress"
                              ? "bg-amber-500/15 text-amber-300"
                              : "bg-ink-700 text-gray-500"
                          }`}
                        >
                          {st === "complete" ? "✓" : i + 1}
                        </span>
                        <span className="truncate text-gray-400">{s.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="card flex flex-col justify-between border-accent/30 bg-accent/[0.04] p-5">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-accent-soft">
                    Next recommended
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-gray-100">{nextStage.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{nextStage.objective}</p>
                </div>
                <Link
                  href={`/projects/${project.id}/workflow?stage=${nextId}`}
                  className="btn-primary mt-4 px-4 py-2 text-sm"
                >
                  Continue →
                </Link>
              </div>
            </div>

            {/* Quick links */}
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                { href: `/projects/${project.id}/workflow`, label: "Workflow", icon: "🎚" },
                { href: `/projects/${project.id}/arrangement`, label: "Arrangement", icon: "📐" },
                { href: `/projects/${project.id}/ideas`, label: "Idea bank", icon: "💡" },
                { href: `/projects/${project.id}/hardware`, label: "Hardware", icon: "🔌" },
              ].map((q) => (
                <Link key={q.href} href={q.href} className="card card-hover flex items-center gap-3 p-4">
                  <span className="text-xl">{q.icon}</span>
                  <span className="text-sm font-medium text-gray-200">{q.label}</span>
                </Link>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ProjectSettingsForm project={project} />
              </div>
              <div className="space-y-6">
                <SongCompletionChecklist project={project} />
                {project.decisions.length > 0 && (
                  <div className="card p-5">
                    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Saved decisions ({project.decisions.length})
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {project.decisions.slice(0, 8).map((d) => (
                        <li key={d.id} className="rounded-lg bg-ink-900 px-3 py-2">
                          {d.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </ProjectGate>
  );
}
