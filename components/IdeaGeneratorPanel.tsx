"use client";

import { useCallback, useEffect, useState } from "react";
import type { CreativeCategory, Project } from "@/lib/types";
import { generateIdeas, type GeneratedIdea } from "@/lib/ideaGenerator";
import { CATEGORY_LABELS } from "@/lib/stages";
import { DeviceBadge } from "./ui";

/**
 * Context-aware idea generator. Can be scoped to a stage (workflow screen)
 * or run free across all categories (the ideas page).
 */
export function IdeaGeneratorPanel({
  project,
  stageId,
  category,
  onSaveIdea,
  count = 4,
  title = "Idea generator",
}: {
  project: Project;
  stageId?: string;
  category?: CreativeCategory;
  onSaveIdea: (idea: GeneratedIdea) => void;
  count?: number;
  title?: string;
}) {
  const [ideas, setIdeas] = useState<GeneratedIdea[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const regenerate = useCallback(() => {
    setIdeas(generateIdeas({ project, stageId, category, count }));
    setSavedIds(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id, stageId, category, count]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-100">{title}</h3>
          <p className="text-xs text-gray-500">
            Tailored to {project.substyle.replace(/-/g, " ")} · {project.bpm} BPM
            {project.mood ? ` · ${project.mood}` : ""}
          </p>
        </div>
        <button className="btn-ghost px-2.5 py-1.5 text-xs" onClick={regenerate}>
          ↻ Generate more
        </button>
      </div>

      <ul className="space-y-2">
        {ideas.map((idea) => {
          const saved = savedIds.has(idea.id);
          return (
            <li
              key={idea.id}
              className="rounded-lg border border-ink-700 bg-ink-900 p-3"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="chip border-ink-600 bg-ink-800 text-gray-400">
                  {CATEGORY_LABELS[idea.category]}
                </span>
                <DeviceBadge device={idea.device} />
              </div>
              <p className="text-sm leading-relaxed text-gray-300">{idea.text}</p>
              <div className="mt-2 flex justify-end">
                <button
                  className={saved ? "btn-subtle px-2 py-1 text-xs" : "btn-primary px-2 py-1 text-xs"}
                  disabled={saved}
                  onClick={() => {
                    onSaveIdea(idea);
                    setSavedIds((prev) => new Set(prev).add(idea.id));
                  }}
                >
                  {saved ? "✓ Saved to project" : "Save idea"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
