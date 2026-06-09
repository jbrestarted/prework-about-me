"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ProjectGate } from "@/components/ProjectGate";
import { StageStepper } from "@/components/StageStepper";
import { ProductionStagePanel } from "@/components/ProductionStagePanel";
import { STAGES, STAGE_MAP } from "@/lib/stages";
import { nextRecommendedStageId } from "@/lib/ideaGenerator";
import type { Project } from "@/lib/types";

function WorkflowInner() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");

  return (
    <ProjectGate id={params.id}>
      {(project) => <WorkflowBody project={project} stageParam={stageParam} router={router} />}
    </ProjectGate>
  );
}

function WorkflowBody({
  project,
  stageParam,
  router,
}: {
  project: Project;
  stageParam: string | null;
  router: ReturnType<typeof useRouter>;
}) {
  const initial = stageParam && STAGE_MAP[stageParam] ? stageParam : nextRecommendedStageId(project);
  const [activeStageId, setActiveStageId] = useState(initial);
  const idx = STAGES.findIndex((s) => s.id === activeStageId);

  function select(id: string) {
    setActiveStageId(id);
    router.replace(`/projects/${project.id}/workflow?stage=${id}`, { scroll: false });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div className="lg:sticky lg:top-6 lg:self-start">
        <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Production stages
        </h2>
        <StageStepper project={project} activeStageId={activeStageId} onSelect={select} />
      </div>

      <div>
        <ProductionStagePanel project={project} stageId={activeStageId} />

        <div className="mt-6 flex items-center justify-between">
          <button
            className="btn-ghost px-4 py-2 text-sm disabled:opacity-40"
            disabled={idx <= 0}
            onClick={() => select(STAGES[idx - 1].id)}
          >
            ← {idx > 0 ? STAGES[idx - 1].name : "Previous"}
          </button>
          <button
            className="btn-primary px-4 py-2 text-sm disabled:opacity-40"
            disabled={idx >= STAGES.length - 1}
            onClick={() => select(STAGES[idx + 1].id)}
          >
            {idx < STAGES.length - 1 ? STAGES[idx + 1].name : "Last stage"} →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkflowPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm text-gray-500">Loading…</div>}>
      <WorkflowInner />
    </Suspense>
  );
}
