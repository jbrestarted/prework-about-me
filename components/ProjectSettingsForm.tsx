"use client";

import type { Project, SubstyleId } from "@/lib/types";
import { useStore } from "@/lib/store";
import { SUBSTYLES, getSubstyle } from "@/lib/substyles";
import { NotesPanel } from "./NotesPanel";

export function ProjectSettingsForm({ project }: { project: Project }) {
  const { updateProject } = useStore();

  function set<K extends keyof Project>(key: K, value: Project[K]) {
    updateProject(project.id, (p) => ({ ...p, [key]: value }));
  }

  const style = getSubstyle(project.substyle);

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Project details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Title</label>
            <input className="input" value={project.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div>
            <label className="label">Producer / artist</label>
            <input
              className="input"
              value={project.producerName}
              onChange={(e) => set("producerName", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Substyle</label>
            <select
              className="input"
              value={project.substyle}
              onChange={(e) => set("substyle", e.target.value as SubstyleId)}
            >
              {SUBSTYLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">
              BPM <span className="text-gray-600">({style.bpmRange[0]}–{style.bpmRange[1]} typical)</span>
            </label>
            <input
              type="number"
              className="input"
              value={project.bpm}
              onChange={(e) => set("bpm", Number(e.target.value) || project.bpm)}
            />
          </div>
          <div>
            <label className="label">Swing (%)</label>
            <input
              type="number"
              min={50}
              max={75}
              className="input"
              value={project.swing}
              onChange={(e) => set("swing", Number(e.target.value) || project.swing)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Key</label>
              <input className="input" value={project.key} onChange={(e) => set("key", e.target.value)} />
            </div>
            <div>
              <label className="label">Scale</label>
              <input className="input" value={project.scale} onChange={(e) => set("scale", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">Mood</label>
            <input
              className="input"
              placeholder="dark, nostalgic, aggressive…"
              value={project.mood}
              onChange={(e) => set("mood", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          References & context
        </h2>
        <div className="grid gap-4">
          <NotesPanel
            value={project.referenceTracks}
            onSave={(v) => set("referenceTracks", v)}
            label="Reference tracks"
            placeholder="Artist – Track (what to steal from it)…"
            rows={2}
          />
          <NotesPanel
            value={project.grooveNotes}
            onSave={(v) => set("grooveNotes", v)}
            label="Swing / groove notes"
            rows={2}
          />
          <NotesPanel
            value={project.hardwareSetupNotes}
            onSave={(v) => set("hardwareSetupNotes", v)}
            label="Hardware setup notes"
            rows={2}
          />
          <NotesPanel
            value={project.exportNotes}
            onSave={(v) => set("exportNotes", v)}
            label="Export / mix-master notes"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}
