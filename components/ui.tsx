"use client";

import React from "react";
import type { DeviceId } from "@/lib/types";

export const DEVICE_META: Record<
  DeviceId,
  { short: string; full: string; color: string; text: string; ring: string }
> = {
  mpc: { short: "MPC", full: "MPC Live III", color: "bg-mpc/15", text: "text-mpc", ring: "border-mpc/40" },
  rytm: { short: "Rytm", full: "Analog Rytm MKII", color: "bg-rytm/15", text: "text-rytm", ring: "border-rytm/40" },
  a4: { short: "A4", full: "Analog Four MKII", color: "bg-a4/15", text: "text-a4", ring: "border-a4/40" },
};

export function DeviceBadge({
  device,
  full = false,
}: {
  device: DeviceId | "any";
  full?: boolean;
}) {
  if (device === "any") {
    return (
      <span className="chip border-ink-600 bg-ink-700 text-gray-300">
        Any device
      </span>
    );
  }
  const m = DEVICE_META[device];
  return (
    <span className={`chip ${m.ring} ${m.color} ${m.text}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {full ? m.full : m.short}
    </span>
  );
}

export function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-ink-700 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent to-a4 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-gray-400">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function DifficultyDot({ level }: { level: "beginner" | "intermediate" | "advanced" }) {
  const map = {
    beginner: { c: "bg-emerald-400", l: "Beginner" },
    intermediate: { c: "bg-amber-400", l: "Intermediate" },
    advanced: { c: "bg-rose-400", l: "Advanced" },
  } as const;
  const m = map[level];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
      <span className={`h-1.5 w-1.5 rounded-full ${m.c}`} />
      {m.l}
    </span>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="text-4xl">🎛️</div>
      <h3 className="text-base font-semibold text-gray-200">{title}</h3>
      <p className="max-w-md text-sm text-gray-400">{body}</p>
      {action}
    </div>
  );
}
