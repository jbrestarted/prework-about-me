import type {
  Project,
  ArrangementSection,
  ChecklistItem,
  ProjectStageState,
  SubstyleId,
} from "./types";
import { STAGES, COMPLETION_CHECKLIST } from "./stages";
import { getSubstyle } from "./substyles";
import { cloneDefaultDevices, cloneDefaultRouting } from "./devices";

export function uid(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function checklist(labels: string[]): ChecklistItem[] {
  return labels.map((label) => ({ id: uid("chk"), label, done: false }));
}

function defaultStageStates(): Record<string, ProjectStageState> {
  const states: Record<string, ProjectStageState> = {};
  for (const stage of STAGES) {
    states[stage.id] = {
      status: "not-started",
      notes: "",
      checklist: checklist(stage.checklistTemplate.map((c) => c.label)),
    };
  }
  return states;
}

/** A few default arrangement sections sized by substyle. */
function defaultSections(substyle: SubstyleId): ArrangementSection[] {
  const isShort = ["trap", "southern-bounce"].includes(substyle);
  const hookBars = isShort ? 8 : 8;
  return [
    {
      id: uid("sec"), name: "Intro", bars: 8, activeDevices: ["mpc", "a4"],
      drumDensity: "sparse", bassActivity: "none", melodicActivity: "motif",
      energy: 2, notes: "Strip back; introduce one element.",
    },
    {
      id: uid("sec"), name: "Verse 1", bars: 16, activeDevices: ["mpc", "rytm", "a4"],
      drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif",
      energy: 3, notes: "Drums + bass focus.",
    },
    {
      id: uid("sec"), name: "Hook", bars: hookBars, activeDevices: ["mpc", "rytm", "a4"],
      drumDensity: "full", bassActivity: "active", melodicActivity: "full",
      energy: 5, notes: "Full arrangement, add chords/lead.",
    },
    {
      id: uid("sec"), name: "Verse 2", bars: 16, activeDevices: ["mpc", "rytm", "a4"],
      drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif",
      energy: 3, notes: "Variation on verse 1.",
    },
    {
      id: uid("sec"), name: "Outro", bars: 8, activeDevices: ["mpc", "a4"],
      drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad",
      energy: 2, notes: "Filter down and fade.",
    },
  ];
}

export interface NewProjectInput {
  title: string;
  producerName?: string;
  substyle: SubstyleId;
  bpm?: number;
  key?: string;
  scale?: string;
  mood?: string;
  referenceTracks?: string;
}

export function createProject(input: NewProjectInput): Project {
  const style = getSubstyle(input.substyle);
  const now = Date.now();
  const [lo, hi] = style.bpmRange;
  const bpm = input.bpm ?? Math.round((lo + hi) / 2);

  return {
    id: uid("proj"),
    title: input.title || "Untitled Beat",
    producerName: input.producerName ?? "",
    substyle: input.substyle,
    bpm,
    swing: style.defaultSwing,
    grooveNotes: style.grooveFeel,
    key: input.key ?? "C",
    scale: input.scale ?? "Minor",
    mood: input.mood ?? "",
    referenceTracks: input.referenceTracks ?? "",
    hardwareSetupNotes:
      "MPC Live III = master clock + arranger. Rytm = drums. A4 = bass/melody. Edit on the Hardware page.",
    midiRoutingNotes: "",
    audioRoutingNotes: "",
    devices: cloneDefaultDevices(),
    routing: cloneDefaultRouting(),
    sections: defaultSections(input.substyle),
    decisions: [],
    stageStates: defaultStageStates(),
    completionChecklist: checklist(COMPLETION_CHECKLIST),
    exportNotes: "",
    createdAt: now,
    updatedAt: now,
  };
}
