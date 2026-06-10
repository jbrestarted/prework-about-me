/**
 * Core domain types for the MPC + Elektron hip-hop production copilot.
 *
 * Design note: hardware-specific behavior (MIDI channels, clock role, routing)
 * is intentionally stored as *editable data*, never hardcoded as fact. The seed
 * data provides sensible defaults that the user can override per-project.
 */

export type DeviceId = "mpc" | "rytm" | "a4";

export type CreativeCategory =
  | "drums"
  | "bass"
  | "chords"
  | "melody"
  | "samples"
  | "texture"
  | "effects"
  | "transition"
  | "arrangement"
  | "automation"
  | "mixprep";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type StageStatus = "not-started" | "in-progress" | "complete";

export type SubstyleId =
  | "boom-bap"
  | "trap"
  | "lofi"
  | "experimental"
  | "dark-cinematic"
  | "west-coast"
  | "east-coast"
  | "southern-bounce"
  | "grimy-underground"
  | "soul-sample"
  | "minimalist-drum-machine"
  | "industrial-noise"
  | "jazz-hop"
  | "synth-modern"
  | "abstract-instrumental"
  | "memphis-dark";

/** Editable device profile. Defaults are suggestions, not verified facts. */
export interface Device {
  id: DeviceId;
  name: string;
  /** High-level role this device plays in the production. */
  role: string;
  /** MIDI channel(s) the device responds to. Editable string for flexibility. */
  midiChannel: string;
  /** Clock relationship: master, slave/receives, or off. */
  clockRole: "master" | "receives" | "internal" | "off";
  audioRoutingNotes: string;
  preferredUseCases: string[];
  userNotes: string;
}

/** A single creative move the producer can try. The heart of the idea engine. */
export interface CreativeOption {
  id: string;
  category: CreativeCategory;
  title: string;
  description: string;
  recommendedDevice: DeviceId | "any";
  difficulty: Difficulty;
  /** Which substyles this idea fits well. Empty/"all" => universally useful. */
  styleFit: SubstyleId[] | "all";
  whenToUse: string;
  implementationSteps: string[];
  variationIdeas: string[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

/** Guidance + checklist for one of the 15 production stages. */
export interface ProductionStage {
  id: string;
  name: string;
  objective: string;
  /** Per-device suggested actions. */
  guidance: Record<DeviceId, string>;
  /** Creative-prompt seeds shown on the stage panel. */
  creativePrompts: string[];
  /** Categories most relevant to this stage (used to filter idea generator). */
  relatedCategories: CreativeCategory[];
  checklistTemplate: { label: string }[];
}

export interface ArrangementSection {
  id: string;
  name: string;
  bars: number;
  activeDevices: DeviceId[];
  drumDensity: "none" | "sparse" | "medium" | "busy" | "full";
  bassActivity: "none" | "sustained" | "groove" | "active";
  melodicActivity: "none" | "pad" | "motif" | "lead" | "full";
  energy: 1 | 2 | 3 | 4 | 5;
  notes: string;
}

export interface HipHopSubstyle {
  id: SubstyleId;
  name: string;
  blurb: string;
  bpmRange: [number, number];
  grooveFeel: string;
  drums: string;
  bass: string;
  harmony: string;
  effects: string;
  arrangement: string;
  deviceSuggestions: Record<DeviceId, string>;
  defaultSwing: number; // 50–66 typical
}

/** Editable routing assumptions. All defaults are user-overridable. */
export interface HardwareRoutingProfile {
  masterClockDevice: DeviceId;
  sendsMidiClock: boolean;
  notes: {
    clock: string;
    midiOut: string;
    audio: string;
    arrangementCapture: string;
    patternToSong: string;
    performanceCapture: string;
  };
}

/** A creative decision the user committed to (saved from an idea or stage). */
export interface SavedDecision {
  id: string;
  category: CreativeCategory;
  text: string;
  device?: DeviceId | "any";
  /** Optional link back to the stage where it was saved. */
  stageId?: string;
  createdAt: number;
}

export interface ProjectStageState {
  status: StageStatus;
  notes: string;
  checklist: ChecklistItem[];
}

export interface Project {
  id: string;
  title: string;
  producerName: string;
  substyle: SubstyleId;
  bpm: number;
  swing: number;
  grooveNotes: string;
  key: string;
  scale: string;
  mood: string;
  referenceTracks: string;
  hardwareSetupNotes: string;
  midiRoutingNotes: string;
  audioRoutingNotes: string;
  devices: Device[];
  routing: HardwareRoutingProfile;
  sections: ArrangementSection[];
  decisions: SavedDecision[];
  /** Keyed by stage id. */
  stageStates: Record<string, ProjectStageState>;
  completionChecklist: ChecklistItem[];
  exportNotes: string;
  createdAt: number;
  updatedAt: number;
}
