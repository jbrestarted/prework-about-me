"use client";

import { useEffect, useState } from "react";

/**
 * Debounced notes textarea. Saves a moment after the user stops typing so we
 * don't thrash localStorage on every keystroke.
 */
export function NotesPanel({
  value,
  onSave,
  label = "Notes",
  placeholder = "Decisions, ideas, reminders for this section…",
  rows = 4,
}: {
  value: string;
  onSave: (next: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
}) {
  const [draft, setDraft] = useState(value);

  // Keep local draft in sync if the project changes underneath us.
  useEffect(() => setDraft(value), [value]);

  // Debounced persist.
  useEffect(() => {
    if (draft === value) return;
    const t = setTimeout(() => onSave(draft), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  return (
    <div>
      {label && <label className="label">{label}</label>}
      <textarea
        className="input resize-y"
        rows={rows}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
      />
    </div>
  );
}
