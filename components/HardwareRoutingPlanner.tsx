"use client";

import type { Device, Project } from "@/lib/types";
import { useStore } from "@/lib/store";
import { DEVICE_META } from "./ui";
import { NotesPanel } from "./NotesPanel";

/**
 * Editable hardware planner. Every value here is a DEFAULT ASSUMPTION the user
 * can override — we never assert verified hardware behavior.
 */
export function HardwareRoutingPlanner({ project }: { project: Project }) {
  const { updateProject } = useStore();

  function updateDevice(id: Device["id"], patch: Partial<Device>) {
    updateProject(project.id, (p) => ({
      ...p,
      devices: p.devices.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    }));
  }

  function updateRoutingNote(key: keyof Project["routing"]["notes"], value: string) {
    updateProject(project.id, (p) => ({
      ...p,
      routing: { ...p.routing, notes: { ...p.routing.notes, [key]: value } },
    }));
  }

  function toggleClock() {
    updateProject(project.id, (p) => ({
      ...p,
      routing: { ...p.routing, sendsMidiClock: !p.routing.sendsMidiClock },
    }));
  }

  const routingFields: { key: keyof Project["routing"]["notes"]; label: string }[] = [
    { key: "clock", label: "Master clock & transport" },
    { key: "midiOut", label: "MIDI out → Elektrons" },
    { key: "audio", label: "Audio recording / monitoring" },
    { key: "arrangementCapture", label: "Arrangement capture strategy" },
    { key: "patternToSong", label: "Pattern-to-song workflow" },
    { key: "performanceCapture", label: "Performance capture workflow" },
  ];

  return (
    <div className="space-y-6">
      <div className="card border-l-2 border-amber-500/40 bg-amber-500/[0.04] p-4 text-sm text-amber-200/90">
        <strong className="font-semibold">Editable assumptions.</strong> These are
        sensible defaults for an MPC-as-master setup — not verified hardware specs.
        Confirm against your own MIDI config and adjust freely.
      </div>

      {/* Clock summary */}
      <div className="card p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Clock & sync
        </h2>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={project.routing.sendsMidiClock}
            onChange={toggleClock}
            className="h-4 w-4 accent-[#a78bfa]"
          />
          <span className="text-sm text-gray-300">
            MPC Live III sends MIDI clock + start/stop (Rytm & A4 receive)
          </span>
        </label>
      </div>

      {/* Devices */}
      <div className="grid gap-4 lg:grid-cols-3">
        {project.devices.map((device) => {
          const m = DEVICE_META[device.id];
          return (
            <div key={device.id} className={`card border-t-2 p-4 ${m.ring}`}>
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full bg-current ${m.text}`} />
                <span className={`text-sm font-semibold ${m.text}`}>{device.name}</span>
              </div>

              <label className="label">Role</label>
              <textarea
                className="input mb-3 resize-y"
                rows={2}
                value={device.role}
                onChange={(e) => updateDevice(device.id, { role: e.target.value })}
              />

              <div className="mb-3 grid grid-cols-2 gap-2">
                <div>
                  <label className="label">MIDI channel</label>
                  <input
                    className="input"
                    value={device.midiChannel}
                    onChange={(e) => updateDevice(device.id, { midiChannel: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Clock role</label>
                  <select
                    className="input"
                    value={device.clockRole}
                    onChange={(e) =>
                      updateDevice(device.id, { clockRole: e.target.value as Device["clockRole"] })
                    }
                  >
                    <option value="master">Master</option>
                    <option value="receives">Receives</option>
                    <option value="internal">Internal</option>
                    <option value="off">Off</option>
                  </select>
                </div>
              </div>

              <label className="label">Audio routing</label>
              <textarea
                className="input mb-3 resize-y"
                rows={2}
                value={device.audioRoutingNotes}
                onChange={(e) => updateDevice(device.id, { audioRoutingNotes: e.target.value })}
              />

              <div className="mb-3">
                <div className="label">Preferred use cases</div>
                <ul className="flex flex-wrap gap-1.5">
                  {device.preferredUseCases.map((u, i) => (
                    <li key={i} className="chip border-ink-600 bg-ink-800 text-gray-400">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>

              <NotesPanel
                value={device.userNotes}
                onSave={(v) => updateDevice(device.id, { userNotes: v })}
                label="Your notes"
                placeholder="Patch names, kit, CV outs, quirks…"
                rows={2}
              />
            </div>
          );
        })}
      </div>

      {/* Routing strategy notes */}
      <div className="card p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Routing & workflow strategy
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {routingFields.map((f) => (
            <NotesPanel
              key={f.key}
              value={project.routing.notes[f.key]}
              onSave={(v) => updateRoutingNote(f.key, v)}
              label={f.label}
              rows={3}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
