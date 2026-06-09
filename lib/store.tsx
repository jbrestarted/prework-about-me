"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Project } from "./types";

/**
 * Local-first persistence. Projects live in localStorage under STORAGE_KEY.
 * A React context exposes CRUD helpers. No backend, no auth.
 *
 * This is intentionally swappable: replacing the load/save functions with
 * fetch calls (or SQLite via an API route) is the future migration path.
 */

const STORAGE_KEY = "mpc-elektron-copilot:v1";

interface StoreValue {
  projects: Project[];
  hydrated: boolean;
  getProject: (id: string) => Project | undefined;
  addProject: (project: Project) => void;
  updateProject: (id: string, updater: (p: Project) => Project) => void;
  deleteProject: (id: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Project[]) : [];
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // storage full / unavailable — fail silently in MVP
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    setProjects(loadProjects());
    setHydrated(true);
  }, []);

  // Persist on change (after hydration to avoid clobbering on first paint).
  useEffect(() => {
    if (hydrated) saveProjects(projects);
  }, [projects, hydrated]);

  // Cross-tab sync.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setProjects(loadProjects());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const getProject = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects]
  );

  const addProject = useCallback((project: Project) => {
    setProjects((prev) => [project, ...prev]);
  }, []);

  const updateProject = useCallback(
    (id: string, updater: (p: Project) => Project) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...updater(p), updatedAt: Date.now() } : p))
      );
    },
    []
  );

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo<StoreValue>(
    () => ({ projects, hydrated, getProject, addProject, updateProject, deleteProject }),
    [projects, hydrated, getProject, addProject, updateProject, deleteProject]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
