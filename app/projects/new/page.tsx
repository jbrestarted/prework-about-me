"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SubstyleId } from "@/lib/types";
import { useStore } from "@/lib/store";
import { createProject } from "@/lib/projectFactory";
import { getSubstyle } from "@/lib/substyles";
import { SubstyleSelector } from "@/components/SubstyleSelector";
import { SectionHeading } from "@/components/ui";

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useStore();

  const [title, setTitle] = useState("");
  const [producerName, setProducerName] = useState("");
  const [substyle, setSubstyle] = useState<SubstyleId | null>(null);
  const [bpm, setBpm] = useState<number | "">("");
  const [key, setKey] = useState("C");
  const [scale, setScale] = useState("Minor");
  const [mood, setMood] = useState("");
  const [referenceTracks, setReferenceTracks] = useState("");

  const style = useMemo(() => (substyle ? getSubstyle(substyle) : null), [substyle]);

  function handleSubstyle(id: SubstyleId) {
    setSubstyle(id);
    const s = getSubstyle(id);
    // Suggest a BPM if the user hasn't set one.
    if (bpm === "") setBpm(Math.round((s.bpmRange[0] + s.bpmRange[1]) / 2));
  }

  function handleCreate() {
    if (!substyle || !title.trim()) return;
    const project = createProject({
      title: title.trim(),
      producerName: producerName.trim(),
      substyle,
      bpm: bpm === "" ? undefined : Number(bpm),
      key,
      scale,
      mood: mood.trim(),
      referenceTracks: referenceTracks.trim(),
    });
    addProject(project);
    router.push(`/projects/${project.id}/workflow`);
  }

  const canCreate = !!substyle && title.trim().length > 0;

  return (
    <div className="mx-auto max-w-3xl">
      <SectionHeading title="New production" subtitle="Set the creative target. You can change anything later." />

      <div className="space-y-6">
        <div className="card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Title *</label>
              <input
                className="input"
                placeholder="e.g. Midnight Dusty"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <label className="label">Producer / artist</label>
              <input
                className="input"
                placeholder="Your name"
                value={producerName}
                onChange={(e) => setProducerName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="label">Substyle *</label>
          <SubstyleSelector value={substyle} onChange={handleSubstyle} />
        </div>

        {style && (
          <div className="card border-l-2 border-accent/40 p-4 text-sm text-gray-300">
            <div className="mb-1 font-semibold text-gray-100">{style.name}</div>
            <p className="text-gray-400">{style.grooveFeel}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
              <span className="rounded bg-ink-800 px-2 py-1">
                BPM {style.bpmRange[0]}–{style.bpmRange[1]}
              </span>
              <span className="rounded bg-ink-800 px-2 py-1">Swing ~{style.defaultSwing}%</span>
            </div>
          </div>
        )}

        <div className="card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">BPM</label>
              <input
                type="number"
                className="input"
                placeholder={style ? `${style.bpmRange[0]}–${style.bpmRange[1]}` : "90"}
                value={bpm}
                onChange={(e) => setBpm(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Key</label>
                <input className="input" value={key} onChange={(e) => setKey(e.target.value)} />
              </div>
              <div>
                <label className="label">Scale</label>
                <select className="input" value={scale} onChange={(e) => setScale(e.target.value)}>
                  <option>Minor</option>
                  <option>Major</option>
                  <option>Dorian</option>
                  <option>Phrygian</option>
                  <option>Minor Pentatonic</option>
                  <option>Harmonic Minor</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Mood</label>
              <input
                className="input"
                placeholder="dark, nostalgic, aggressive…"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Reference track(s)</label>
              <input
                className="input"
                placeholder="Artist – Track"
                value={referenceTracks}
                onChange={(e) => setReferenceTracks(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button className="btn-ghost px-4 py-2 text-sm" onClick={() => router.back()}>
            Cancel
          </button>
          <button className="btn-primary px-5 py-2 text-sm" disabled={!canCreate} onClick={handleCreate}>
            Create & start workflow →
          </button>
        </div>
        {!canCreate && (
          <p className="text-right text-xs text-gray-500">
            Add a title and pick a substyle to continue.
          </p>
        )}
      </div>
    </div>
  );
}
