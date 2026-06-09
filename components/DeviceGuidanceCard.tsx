"use client";

import type { DeviceId } from "@/lib/types";
import { DEVICE_META } from "./ui";

export function DeviceGuidanceCard({
  device,
  guidance,
}: {
  device: DeviceId;
  guidance: string;
}) {
  const m = DEVICE_META[device];
  return (
    <div className={`card border-l-2 p-4 ${m.ring}`}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${m.text} bg-current`} />
        <span className={`text-sm font-semibold ${m.text}`}>{m.full}</span>
      </div>
      <p className="text-sm leading-relaxed text-gray-300">{guidance}</p>
    </div>
  );
}
