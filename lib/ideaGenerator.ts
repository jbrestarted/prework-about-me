import type {
  CreativeOption,
  CreativeCategory,
  Project,
  SubstyleId,
} from "./types";
import { CREATIVE_OPTIONS } from "./creativeOptions";
import { getSubstyle } from "./substyles";
import { STAGE_MAP } from "./stages";

export interface GeneratedIdea {
  id: string;
  category: CreativeCategory;
  text: string;
  device: CreativeOption["recommendedDevice"];
  source: CreativeOption;
}

interface GenContext {
  project: Project;
  /** Limit to a stage's related categories if provided. */
  stageId?: string;
  /** Limit to a single category if provided. */
  category?: CreativeCategory;
  count?: number;
}

const DEVICE_NAMES: Record<string, string> = {
  mpc: "MPC Live III",
  rytm: "Analog Rytm MKII",
  a4: "Analog Four MKII",
  any: "any device",
};

/** Score an option for relevance to the current project context. */
function scoreOption(opt: CreativeOption, project: Project, savedTitles: Set<string>): number {
  let score = 1;
  const styleId = project.substyle;

  // Strong boost for substyle fit
  if (opt.styleFit === "all") score += 1;
  else if ((opt.styleFit as SubstyleId[]).includes(styleId)) score += 3;
  else score -= 1; // off-style, still possible but deprioritized

  // Boost ideas using devices the producer flagged as preferred (active in sections)
  const activeDevices = new Set(project.sections.flatMap((s) => s.activeDevices));
  if (opt.recommendedDevice !== "any" && activeDevices.has(opt.recommendedDevice)) {
    score += 1;
  }

  // Mood-aware nudge
  const mood = project.mood.toLowerCase();
  const text = `${opt.title} ${opt.description} ${opt.whenToUse}`.toLowerCase();
  if (mood) {
    const moodWords = mood.split(/[\s,]+/).filter((w) => w.length > 3);
    if (moodWords.some((w) => text.includes(w))) score += 1.5;
  }

  // BPM-aware nudge: align with substyle range tendencies
  const [lo, hi] = getSubstyle(styleId).bpmRange;
  if (project.bpm >= lo && project.bpm <= hi) score += 0.5;

  // Avoid repeating already-saved ideas
  if (savedTitles.has(opt.title)) score -= 5;

  // Small randomness so "generate more" yields variety
  score += Math.random() * 1.5;
  return score;
}

function buildIdeaText(opt: CreativeOption, project: Project): string {
  const dev = DEVICE_NAMES[opt.recommendedDevice] ?? "your gear";
  const styleName = getSubstyle(project.substyle).name;
  const lead = opt.recommendedDevice === "any"
    ? `${opt.title}.`
    : `On the ${dev}: ${opt.title.toLowerCase().startsWith("use") ? opt.title : opt.title}.`;
  return `${lead} ${opt.description} — fits ${styleName}. ${opt.whenToUse} Capture it into the MPC arrangement once it works.`;
}

export function generateIdeas(ctx: GenContext): GeneratedIdea[] {
  const { project, stageId, category, count = 4 } = ctx;
  const savedTitles = new Set(project.decisions.map((d) => d.text.split(" — ")[0]));

  let pool = CREATIVE_OPTIONS;

  if (category) {
    pool = pool.filter((o) => o.category === category);
  } else if (stageId) {
    const stage = STAGE_MAP[stageId];
    if (stage) {
      const cats = new Set(stage.relatedCategories);
      pool = pool.filter((o) => cats.has(o.category));
    }
  }

  const ranked = pool
    .map((opt) => ({ opt, score: scoreOption(opt, project, savedTitles) }))
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, count).map(({ opt }) => ({
    id: `${opt.id}-${Math.random().toString(36).slice(2, 7)}`,
    category: opt.category,
    text: buildIdeaText(opt, project),
    device: opt.recommendedDevice,
    source: opt,
  }));
}

/** Suggest the next stage the producer should work on. */
export function nextRecommendedStageId(project: Project): string {
  const order = [
    "setup", "tempo-groove", "reference", "drums", "bass", "harmony",
    "hooks", "texture", "effects", "arrangement", "automation",
    "transition", "mixprep", "export", "review",
  ];
  for (const id of order) {
    const st = project.stageStates[id];
    if (!st || st.status !== "complete") return id;
  }
  return "review";
}
