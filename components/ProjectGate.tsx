"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";
import { useStore } from "@/lib/store";
import { ProjectNav } from "./ProjectNav";

/**
 * Resolves a project by id, handling the localStorage hydration window so we
 * don't flash "not found" before client data loads.
 */
export function ProjectGate({
  id,
  children,
  showNav = true,
}: {
  id: string;
  children: (project: Project) => React.ReactNode;
  showNav?: boolean;
}) {
  const { getProject, hydrated } = useStore();
  const project = getProject(id);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-gray-500">
        Loading project…
      </div>
    );
  }

  if (!project) {
    return (
      <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
        <div className="text-3xl">🤔</div>
        <h2 className="text-base font-semibold text-gray-200">Project not found</h2>
        <p className="text-sm text-gray-400">It may have been deleted, or this link is from another browser.</p>
        <Link href="/projects" className="btn-primary mt-1 px-4 py-2 text-sm">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <>
      {showNav && <ProjectNav projectId={project.id} />}
      {children(project)}
    </>
  );
}
