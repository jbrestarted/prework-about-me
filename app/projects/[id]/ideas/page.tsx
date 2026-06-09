"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { CreativeCategory, Project } from "@/lib/types";
import { useStore } from "@/lib/store";
import { uid } from "@/lib/projectFactory";
import { CATEGORY_LABELS } from "@/lib/stages";
import { optionsByCategory } from "@/lib/creativeOptions";
import type { GeneratedIdea } from "@/lib/ideaGenerator";
import { ProjectGate } from "@/components/ProjectGate";
import { IdeaGeneratorPanel } from "@/components/IdeaGeneratorPanel";
import { CreativeOptionCard } from "@/components/CreativeOptionCard";
import { SectionHeading } from "@/components/ui";
import type { CreativeOption } from "@/lib/types";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as CreativeCategory[];

export default function IdeasPage() {
  const params = useParams<{ id: string }>();
  return (
    <ProjectGate id={params.id}>{(project) => <IdeasBody project={project} />}</ProjectGate>
  );
}

function IdeasBody({ project }: { project: Project }) {
  const { updateProject } = useStore();
  const [category, setCategory] = useState<CreativeCategory>("drums");

  const savedTitles = new Set(project.decisions.map((d) => d.text.split(" — ")[0]));

  function saveIdea(idea: GeneratedIdea) {
    updateProject(project.id, (p) => ({
      ...p,
      decisions: [
        { id: uid("dec"), category: idea.category, text: idea.text, device: idea.device, createdAt: Date.now() },
        ...p.decisions,
      ],
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
          createdAt: Date.now(),
        },
        ...p.decisions,
      ],
    }));
  }

  const options = optionsByCategory(category);
  const onStyle = options.filter(
    (o) => o.styleFit === "all" || (o.styleFit as string[]).includes(project.substyle)
  );
  const offStyle = options.filter((o) => !onStyle.includes(o));
  const ordered = [...onStyle, ...offStyle];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Idea bank"
        subtitle="Generate context-aware moves, or browse the full creative library by category"
      />

      <IdeaGeneratorPanel
        project={project}
        category={category}
        onSaveIdea={saveIdea}
        count={5}
        title={`${CATEGORY_LABELS[category]} — generated for this beat`}
      />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`chip ${
              category === c
                ? "border-accent/60 bg-accent/15 text-accent-soft"
                : "border-ink-600 bg-ink-800 text-gray-400 hover:text-gray-200"
            }`}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-3 text-xs text-gray-500">
          {ordered.length} options · {onStyle.length} tuned for {project.substyle.replace(/-/g, " ")}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((opt) => (
            <CreativeOptionCard
              key={opt.id}
              option={opt}
              onSave={saveOption}
              saved={savedTitles.has(opt.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
