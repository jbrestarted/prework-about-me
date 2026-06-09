"use client";

import { useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { DEFAULT_DEVICES, DEFAULT_ROUTING } from "@/lib/devices";
import { SectionHeading, DeviceBadge } from "@/components/ui";
import type { Project } from "@/lib/types";

export default function SettingsPage() {
  const { projects, addProject, hydrated } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  function exportData() {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `beatsmith-projects-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const arr: Project[] = Array.isArray(data) ? data : [data];
        const existing = new Set(projects.map((p) => p.id));
        let added = 0;
        for (const p of arr) {
          if (p && p.id && !existing.has(p.id)) {
            addProject(p);
            added += 1;
          }
        }
        setMsg(`Imported ${added} project${added === 1 ? "" : "s"}.`);
      } catch {
        setMsg("Could not parse that file.");
      }
    };
    reader.readAsText(file);
  }

  function clearAll() {
    if (confirm("Delete ALL projects from this browser? This cannot be undone.")) {
      window.localStorage.removeItem("mpc-elektron-copilot:v1");
      window.location.reload();
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeading title="Settings" subtitle="Local-first — all data lives in this browser" />

      {/* Data management */}
      <section className="card p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Your data
        </h2>
        <p className="mb-4 text-sm text-gray-400">
          {hydrated ? `${projects.length} project${projects.length === 1 ? "" : "s"} stored locally.` : "Loading…"}{" "}
          Export a backup or move projects between browsers/devices.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="btn-ghost px-3.5 py-2 text-sm" onClick={exportData} disabled={projects.length === 0}>
            ↓ Export backup (JSON)
          </button>
          <button className="btn-ghost px-3.5 py-2 text-sm" onClick={() => fileRef.current?.click()}>
            ↑ Import backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])}
          />
          <button className="btn-subtle px-3.5 py-2 text-sm text-rose-400" onClick={clearAll}>
            Clear all data
          </button>
        </div>
        {msg && <p className="mt-3 text-sm text-accent-soft">{msg}</p>}
      </section>

      {/* Default rig (reference) */}
      <section className="card p-5">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Default rig assumptions
        </h2>
        <p className="mb-4 text-sm text-gray-400">
          These seed every new project and are fully editable per-project on the Hardware page.
          They&apos;re sensible defaults — not verified hardware specs.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {DEFAULT_DEVICES.map((d) => (
            <div key={d.id} className="rounded-lg border border-ink-700 bg-ink-900 p-3.5">
              <div className="mb-2">
                <DeviceBadge device={d.id} full />
              </div>
              <p className="mb-2 text-xs leading-relaxed text-gray-400">{d.role}</p>
              <dl className="space-y-1 text-[11px] text-gray-500">
                <div className="flex justify-between gap-2">
                  <dt>MIDI</dt>
                  <dd className="text-right text-gray-400">{d.midiChannel}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Clock</dt>
                  <dd className="capitalize text-gray-400">{d.clockRole}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-ink-700 bg-ink-900 p-3.5 text-sm text-gray-400">
          <span className="font-medium text-gray-300">Clock default:</span>{" "}
          {DEFAULT_ROUTING.notes.clock}
        </div>
      </section>

      {/* About */}
      <section className="card p-5 text-sm text-gray-400">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">About</h2>
        <p>
          <span className="font-medium text-gray-200">Beatsmith</span> is a local-first hip-hop
          production copilot for the Akai MPC Live III, Elektron Analog Rytm MKII, and Analog Four
          MKII. No account, no cloud — your projects stay in your browser. WebMIDI sync, MIDI clock
          diagnostics, and AI-assisted generation are on the roadmap.
        </p>
      </section>
    </div>
  );
}
