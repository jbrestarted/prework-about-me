"use client";

import type { ChecklistItem } from "@/lib/types";

export function Checklist({
  items,
  onToggle,
}: {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
}) {
  const done = items.filter((i) => i.done).length;

  return (
    <div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 transition hover:bg-ink-800">
              <button
                type="button"
                role="checkbox"
                aria-checked={item.done}
                onClick={() => onToggle(item.id)}
                className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border transition ${
                  item.done
                    ? "border-accent bg-accent text-ink-950"
                    : "border-ink-500 bg-transparent text-transparent hover:border-gray-400"
                }`}
              >
                <span className="text-[10px] leading-none">✓</span>
              </button>
              <span
                className={`text-sm ${
                  item.done ? "text-gray-500 line-through" : "text-gray-200"
                }`}
              >
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <p className="mt-2 px-2 text-xs text-gray-500">
          {done} / {items.length} complete
        </p>
      )}
    </div>
  );
}
