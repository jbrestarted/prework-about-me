"use client";

import type { ArrangementSection, DeviceId } from "@/lib/types";
import { DEVICE_META } from "./ui";
import { NotesPanel } from "./NotesPanel";

const DEVICES: DeviceId[] = ["mpc", "rytm", "a4"];
const DRUM_DENSITY = ["none", "sparse", "medium", "busy", "full"] as const;
const BASS_ACTIVITY = ["none", "sustained", "groove", "active"] as const;
const MELODIC_ACTIVITY = ["none", "pad", "motif", "lead", "full"] as const;

export function ArrangementSectionEditor({
  section,
  onChange,
  onRemove,
}: {
  section: ArrangementSection;
  onChange: (next: ArrangementSection) => void;
  onRemove: () => void;
}) {
  function set<K extends keyof ArrangementSection>(key: K, value: ArrangementSection[K]) {
    onChange({ ...section, [key]: value });
  }

  function toggleDevice(d: DeviceId) {
    const has = section.activeDevices.includes(d);
    set(
      "activeDevices",
      has ? section.activeDevices.filter((x) => x !== d) : [...section.activeDevices, d]
    );
  }

  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center gap-2">
        <input
          className="input flex-1 font-medium"
          value={section.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <button className="btn-subtle px-2 py-1 text-xs text-rose-400" onClick={onRemove}>
          Remove
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">Bars</label>
          <input
            type="number"
            min={1}
            max={64}
            className="input"
            value={section.bars}
            onChange={(e) => set("bars", Math.max(1, Number(e.target.value) || 1))}
          />
        </div>
        <div>
          <label className="label">Energy (1–5)</label>
          <input
            type="range"
            min={1}
            max={5}
            value={section.energy}
            onChange={(e) => set("energy", Number(e.target.value) as ArrangementSection["energy"])}
            className="mt-2 w-full accent-[#a78bfa]"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="label">Active devices</label>
        <div className="flex gap-2">
          {DEVICES.map((d) => {
            const active = section.activeDevices.includes(d);
            const m = DEVICE_META[d];
            return (
              <button
                key={d}
                onClick={() => toggleDevice(d)}
                className={`chip ${
                  active ? `${m.ring} ${m.color} ${m.text}` : "border-ink-600 bg-ink-800 text-gray-500"
                }`}
              >
                {m.short}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Select
          label="Drums"
          value={section.drumDensity}
          options={DRUM_DENSITY as readonly string[]}
          onChange={(v) => set("drumDensity", v as ArrangementSection["drumDensity"])}
        />
        <Select
          label="Bass"
          value={section.bassActivity}
          options={BASS_ACTIVITY as readonly string[]}
          onChange={(v) => set("bassActivity", v as ArrangementSection["bassActivity"])}
        />
        <Select
          label="Melody"
          value={section.melodicActivity}
          options={MELODIC_ACTIVITY as readonly string[]}
          onChange={(v) => set("melodicActivity", v as ArrangementSection["melodicActivity"])}
        />
      </div>

      <div className="mt-3">
        <NotesPanel
          value={section.notes}
          onSave={(v) => set("notes", v)}
          label="Mutes / fills / drops / automation"
          placeholder="e.g. mute hats first 4 bars, snare-roll into hook, filter sweep up…"
          rows={2}
        />
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="input capitalize" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
