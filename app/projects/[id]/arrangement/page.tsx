"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { ArrangementSection, Project } from "@/lib/types";
import { useStore } from "@/lib/store";
import { uid } from "@/lib/projectFactory";
import { getSubstyle } from "@/lib/substyles";
import { ProjectGate } from "@/components/ProjectGate";
import { ArrangementTimeline } from "@/components/ArrangementTimeline";
import { ArrangementSectionEditor } from "@/components/ArrangementSectionEditor";
import { SectionHeading } from "@/components/ui";

const SECTION_PRESETS = ["Intro", "Verse", "Pre-Hook", "Hook", "Bridge", "Breakdown", "Drop", "Outro"];

export default function ArrangementPage() {
  const params = useParams<{ id: string }>();
  return (
    <ProjectGate id={params.id}>
      {(project) => <ArrangementBody project={project} />}
    </ProjectGate>
  );
}

function ArrangementBody({ project }: { project: Project }) {
  const { updateProject } = useStore();
  const [activeId, setActiveId] = useState<string | undefined>(project.sections[0]?.id);
  const style = getSubstyle(project.substyle);

  function setSections(next: ArrangementSection[]) {
    updateProject(project.id, (p) => ({ ...p, sections: next }));
  }

  function updateSection(id: string, next: ArrangementSection) {
    setSections(project.sections.map((s) => (s.id === id ? next : s)));
  }

  function removeSection(id: string) {
    setSections(project.sections.filter((s) => s.id !== id));
  }

  function addSection(name: string) {
    const isHook = /hook|drop|chorus/i.test(name);
    const section: ArrangementSection = {
      id: uid("sec"),
      name,
      bars: isHook ? 8 : 16,
      activeDevices: ["mpc", "rytm", "a4"],
      drumDensity: isHook ? "full" : "medium",
      bassActivity: isHook ? "active" : "groove",
      melodicActivity: isHook ? "full" : "motif",
      energy: isHook ? 5 : 3,
      notes: "",
    };
    setSections([...project.sections, section]);
    setActiveId(section.id);
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Arrangement"
        subtitle={`Build the song structure · ${style.arrangement}`}
      />

      <ArrangementTimeline sections={project.sections} activeId={activeId} onSelect={setActiveId} />

      <div className="card p-4">
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Add a section
        </div>
        <div className="flex flex-wrap gap-2">
          {SECTION_PRESETS.map((name) => (
            <button key={name} className="btn-ghost px-3 py-1.5 text-xs" onClick={() => addSection(name)}>
              ＋ {name}
            </button>
          ))}
        </div>
      </div>

      {project.sections.length === 0 ? (
        <div className="card px-6 py-12 text-center text-sm text-gray-400">
          No sections yet — add one above to start building your arrangement.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {project.sections.map((s) => (
            <div key={s.id} onClick={() => setActiveId(s.id)}>
              <ArrangementSectionEditor
                section={s}
                onChange={(next) => updateSection(s.id, next)}
                onRemove={() => removeSection(s.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
