"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui";

export default function ProjectsPage() {
  const { projects, hydrated } = useStore();

  return (
    <div>
      <SectionHeading
        title="Projects"
        subtitle={hydrated ? `${projects.length} production${projects.length === 1 ? "" : "s"}` : ""}
        right={
          <Link href="/projects/new" className="btn-primary px-3.5 py-2 text-sm">
            ＋ New project
          </Link>
        }
      />

      {!hydrated ? (
        <div className="py-16 text-center text-sm text-gray-500">Loading…</div>
      ) : projects.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
          <div className="text-4xl">🗂️</div>
          <h3 className="text-base font-semibold text-gray-200">No projects yet</h3>
          <p className="max-w-md text-sm text-gray-400">
            Start your first beat and the copilot walks you from idea to mix prep.
          </p>
          <Link href="/projects/new" className="btn-primary mt-1 px-4 py-2 text-sm">
            ＋ Start a new beat
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
