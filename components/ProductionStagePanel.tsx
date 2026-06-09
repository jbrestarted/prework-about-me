"use client";

import { useMemo } from "react";
import type { CreativeOption, Project } from "@/lib/types";
import { STAGE_MAP, CATEGORY_LABELS } from "@/lib/stages";
import { CREATIVE_OPTIONS } from "@/lib/creativeOptions";
import { getSubstyle } from "@/lib/substyles";
import { useStore } from "@/lib/store";
import { uid } from "@/lib/projectFactory";
import type { GeneratedIdea } from "@/lib/ideaGenerator";
import { DeviceGuidanceCard } from "./DeviceGuidanceCard";
import { CreativeOptionCard } from "./CreativeOptionCard";
import { IdeaGeneratorPanel } from "./IdeaGeneratorPanel";
import { Checklist } from "./Checklist";
import { NotesPanel } from "./NotesPanel";

const STATUS_LABEL = {
  "not-started": "Not started",
  "in-progress": "In progress",
  complete: "Complete",
} as const;

export function ProductionStagePanel({
  project,
  stageId,
}: {
  project: Project;
  stageId: string;
}) {
  const { updateProject } = useStore();
  const stage = STAGE_MAP[stageId];
  const state = project.stageStates[stageId];
  const style = getSubstyle(project.substyle);

  // Curated options relevant to this stage, biased to the project's substyle.
  const options = useMemo<CreativeOption[]>(() => {
    if (!stage) return [];
    const cats = new Set(stage.relatedCategories);
    const inStage = CREATIVE_OPTIONS.filter((o) => cats.has(o.category));
    const onStyle = inStage.filter(
      (o) => o.styleFit === "all" || (o.styleFit as string[]).includes(project.substyle)
    );
    const rest = inStage.filter((o) => !onStyle.includes(o));
    return [...onStyle, ...rest].slice(0, 6);
  }, [stage, project.substyle]);

  const savedTitles = useMemo(
    () => new Set(project.decisions.map((d) => d.text.split(" — ")[0])),
    [project.decisions]
  );

  if (!stage || !state) return null;

  function setStatus(status: typeof state.status) {
    updateProject(project.id, (p) => ({
      ...p,
      stageStates: {
        ...p.stageStates,
        [stageId]: { ...p.stageStates[stageId], status },
      },
    }));
  }

  function toggleChecklistItem(itemId: string) {
    updateProject(project.id, (p) => {
      const st = p.stageStates[stageId];
      const checklist = st.checklist.map((c) =>
        c.id === itemId ? { ...c, done: !c.done } : c
      );
      const allDone = checklist.length > 0 && checklist.every((c) => c.done);
      return {
        ...p,
        stageStates: {
          ...p.stageStates,
          [stageId]: {
            ...st,
            checklist,
            // Auto-progress status as boxes get ticked.
            status:
              allDone && st.status !== "complete"
                ? "in-progress"
                : checklist.some((c) => c.done) && st.status === "not-started"
                ? "in-progress"
                : st.status,
          },
        },
      };
    });
  }

  function saveNotes(notes: string) {
    updateProject(project.id, (p) => ({
      ...p,
      stageStates: { ...p.stageStates, [stageId]: { ...p.stageStates[stageId], notes } },
    }));
  }

  function saveOption(option: CreativeOption) {
    updateProject(project.id, (p) => ({
      ...p,
      decisions: [
        {
          id: uid("dec"),
          category: option.category,
          text: `${option.title} — ${option.description}`,
          device: option.recommendedDevice,
          stageId,
          createdAt: Date.now(),
        },
        ...p.decisions,
      ],
    }));
  }

  function saveIdea(idea: GeneratedIdea) {
    updateProject(project.id, (p) => ({
      ...p,
      decisions: [
        {
          id: uid("dec"),
          category: idea.category,
          text: idea.text,
          device: idea.device,
          stageId,
          createdAt: Date.now(),
        },
        ...p.decisions,
      ],
    }));
  }

  const stageDecisions = project.decisions.filter((d) => d.stageId === stageId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="chip border-accent/40 bg-accent/10 text-accent-soft">
              {style.name}
            </span>
            <span
              className={`chip ${
                state.status === "complete"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : state.status === "in-progress"
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                  : "border-ink-600 bg-ink-800 text-gray-400"
              }`}
            >
              {STATUS_LABEL[state.status]}
            </span>
          </div>
          <div className="flex gap-2">
            {state.status !== "complete" ? (
              <button className="btn-primary px-3 py-1.5 text-xs" onClick={() => setStatus("complete")}>
                ✓ Mark stage complete
              </button>
            ) : (
              <button className="btn-ghost px-3 py-1.5 text-xs" onClick={() => setStatus("in-progress")}>
                Reopen stage
              </button>
            )}
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-100">{stage.name}</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-400">{stage.objective}</p>
      </div>

      {/* Device guidance */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          What to do on each device
        </h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <DeviceGuidanceCard device="mpc" guidance={stage.guidance.mpc} />
          <DeviceGuidanceCard device="rytm" guidance={stage.guidance.rytm} />
          <DeviceGuidanceCard device="a4" guidance={stage.guidance.a4} />
        </div>
      </section>

      {/* Creative prompts */}
      <section className="card p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Creative prompts
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {stage.creativePrompts.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-lg bg-ink-900 px-3 py-2 text-sm text-gray-300"
            >
              <span className="text-accent">→</span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Creative option cards + idea generator */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Creative options for this stage
          </h2>
          <div className="grid gap-3">
            {options.map((opt) => (
              <CreativeOptionCard
                key={opt.id}
                option={opt}
                onSave={saveOption}
                saved={savedTitles.has(opt.title)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Generate fresh ideas
            </h2>
            <IdeaGeneratorPanel project={project} stageId={stageId} onSaveIdea={saveIdea} />
          </div>

          {/* Checklist */}
          <div className="card p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Stage checklist
            </h2>
            <Checklist items={state.checklist} onToggle={toggleChecklistItem} />
          </div>

          {/* Notes */}
          <div className="card p-5">
            <NotesPanel value={state.notes} onSave={saveNotes} label="Stage notes" />
          </div>
        </div>
      </section>

      {/* Saved decisions for this stage */}
      {stageDecisions.length > 0 && (
        <section className="card p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Saved decisions ({stageDecisions.length})
          </h2>
          <ul className="space-y-2">
            {stageDecisions.map((d) => (
              <li
                key={d.id}
                className="flex items-start gap-2 rounded-lg bg-ink-900 px-3 py-2 text-sm text-gray-300"
              >
                <span className="chip mt-0.5 border-ink-600 bg-ink-800 text-[10px] text-gray-400">
                  {CATEGORY_LABELS[d.category]}
                </span>
                <span className="flex-1">{d.text}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
