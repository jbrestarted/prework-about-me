import type { ProductionStage, CreativeCategory } from "./types";

/**
 * The 15 guided production stages. Each carries an objective, per-device
 * guidance, creative prompts, related idea categories, and a checklist
 * template that gets instantiated per project.
 */
export const STAGES: ProductionStage[] = [
  {
    id: "setup",
    name: "Project Setup",
    objective:
      "Define the creative target and prepare the rig so the session flows. Lock identity before sound.",
    guidance: {
      mpc: "Create a new project/sequence. Confirm MPC is master clock and sending MIDI clock + transport. Set sample rate and track template.",
      rytm: "Power on, set CLOCK + TRANSPORT receive, load an empty or starter kit. Confirm it follows MPC start/stop.",
      a4: "Set CLOCK + TRANSPORT receive, pick a starting sound bank, confirm it locks to MPC tempo.",
    },
    creativePrompts: [
      "What feeling should this track give the listener in 5 seconds?",
      "Name one reference track and one thing you want to steal from it.",
      "Decide: sample-based or fully synthesized foundation?",
    ],
    relatedCategories: ["arrangement"],
    checklistTemplate: [
      { label: "Project named and saved" },
      { label: "MPC confirmed as master clock" },
      { label: "Rytm receiving clock + transport" },
      { label: "A4 receiving clock + transport" },
      { label: "Creative target / mood defined" },
    ],
  },
  {
    id: "tempo-groove",
    name: "Tempo, Swing & Groove",
    objective:
      "Set the rhythmic DNA — BPM, swing amount, and the pocket everything else will sit in.",
    guidance: {
      mpc: "Set BPM and global swing/timing-correct value. Dial the master groove; this propagates feel to recorded parts.",
      rytm: "Match feel: set per-track micro-timing/swing nudges. Decide if Rytm follows MPC swing or adds its own.",
      a4: "Confirm tempo lock. Set note lengths and any per-step micro-timing for bass/melody feel.",
    },
    creativePrompts: [
      "Push or pull the hats off-grid for a human pocket.",
      "Try the same beat at half-time feel for a trap/cinematic vibe.",
      "Decide how much swing: tight (51) vs. dusty (58–60).",
    ],
    relatedCategories: ["drums", "arrangement"],
    checklistTemplate: [
      { label: "BPM chosen" },
      { label: "Swing / groove amount set" },
      { label: "Half-time vs. straight feel decided" },
      { label: "Micro-timing pocket auditioned" },
    ],
  },
  {
    id: "reference",
    name: "Reference Track / Style Target",
    objective:
      "Anchor the production to a sonic target so every decision has a reference point.",
    guidance: {
      mpc: "Drop reference audio onto a muted track for A/B. Note its arrangement and drop points.",
      rytm: "Identify the reference's drum character (punch, tuning, space) to aim your kit design.",
      a4: "Identify the reference's bass and lead tones to guide your synth design.",
    },
    creativePrompts: [
      "List 3 sonic traits to match and 1 thing to do differently.",
      "Map the reference's arrangement: where does it drop?",
      "Match the reference's low-end weight, not just its melody.",
    ],
    relatedCategories: ["arrangement", "mixprep"],
    checklistTemplate: [
      { label: "Reference track(s) chosen" },
      { label: "Key/mood traits noted" },
      { label: "Arrangement of reference mapped" },
      { label: "1 intentional difference defined" },
    ],
  },
  {
    id: "drums",
    name: "Drum Foundation",
    objective:
      "Build the rhythmic backbone — the groove that carries the whole track.",
    guidance: {
      mpc: "Sequence the master drum pattern and swing. Decide which hits live on MPC samples vs. Rytm.",
      rytm: "Design the analog kick/snare/clap and hat texture. Add ghost notes and parameter locks for life.",
      a4: "Usually silent here, but consider a percussive analog blip or noise hit if it fits.",
    },
    creativePrompts: [
      "Start with kick + snare only; earn every added element.",
      "Layer a sampled break (MPC) under an analog kick (Rytm).",
      "Add swung 16th hats with velocity variation for groove.",
    ],
    relatedCategories: ["drums", "automation"],
    checklistTemplate: [
      { label: "Core kick + snare locked" },
      { label: "Hi-hat / percussion texture added" },
      { label: "Swing & velocity feel dialed" },
      { label: "Ghost notes / fills sketched" },
      { label: "Drum-only loop sounds good on its own" },
    ],
  },
  {
    id: "bass",
    name: "Bassline",
    objective:
      "Lock the low end to the drums and define the harmonic floor of the track.",
    guidance: {
      mpc: "Record the A4 bass into an MPC track/arrangement, or sequence A4 via MIDI. Watch kick/bass relationship.",
      rytm: "Keep kick tuning out of the way of the bass note; consider sidechain-style ducking via volume p-locks.",
      a4: "Design the sub/synth bass. Set glide for 808-style slides; use filter envelope for movement.",
    },
    creativePrompts: [
      "Lock bass rhythm to the kick, then add one syncopated note.",
      "Two-note minor bassline with filter-envelope movement (A4).",
      "Try an 808 glide between root and fifth for trap motion.",
    ],
    relatedCategories: ["bass", "automation"],
    checklistTemplate: [
      { label: "Bass note/key chosen" },
      { label: "Bass rhythm locked to kick" },
      { label: "Tone / filter movement dialed" },
      { label: "Kick vs. bass low-end clash checked" },
    ],
  },
  {
    id: "harmony",
    name: "Sample or Harmonic Foundation",
    objective:
      "Establish the chords/sample that set the mood and key of the track.",
    guidance: {
      mpc: "Chop and pitch the sample; build the loop. Or sequence A4 chords. Set the key the track lives in.",
      rytm: "Mostly silent; could add a tuned tonal percussion hit to reinforce a chord.",
      a4: "Play chord stabs or pads. Use the analog filter and chorus for warmth; detune for character.",
    },
    creativePrompts: [
      "Chop a soul sample and re-pitch chops into a new progression.",
      "Build a 4-chord minor loop on A4 with slow filter swells.",
      "Filter the sample in the intro, open it up at the drop.",
    ],
    relatedCategories: ["chords", "samples"],
    checklistTemplate: [
      { label: "Key / scale confirmed" },
      { label: "Sample chopped OR chords programmed" },
      { label: "Harmonic loop sits with drums + bass" },
      { label: "Intro vs. drop harmonic contrast planned" },
    ],
  },
  {
    id: "hooks",
    name: "Melodic Hooks",
    objective: "Create the memorable lead/motif that defines the song's identity.",
    guidance: {
      mpc: "Capture the A4 lead into arrangement sections. Chop a vocal/instrument sample into a hook if desired.",
      rytm: "Optional tonal percussion accent to answer the hook.",
      a4: "Design the signature lead — portamento for West Coast, dark bells for trap, simple motif for lo-fi.",
    },
    creativePrompts: [
      "Write a 2-bar motif; the hook is a variation of it.",
      "Contrast a chopped-sample hook (MPC) with an A4 counter-melody.",
      "Leave space — the catchiest hooks breathe.",
    ],
    relatedCategories: ["melody", "samples"],
    checklistTemplate: [
      { label: "Main hook/motif written" },
      { label: "Hook contrasts the verse" },
      { label: "Counter-melody or call-response considered" },
      { label: "Hook is memorable a cappella in your head" },
    ],
  },
  {
    id: "texture",
    name: "Texture, Ear Candy & Movement",
    objective:
      "Add the details that make the beat feel alive and three-dimensional.",
    guidance: {
      mpc: "Add foley, vinyl crackle, reversed chops, risers and one-shot ear candy between phrases.",
      rytm: "Use parameter locks for evolving hat tone, noise sweeps, and percussive ear candy.",
      a4: "Add pads, drones, and slow LFO textures in the background for depth.",
    },
    creativePrompts: [
      "Add one quiet element that only appears every 4 bars.",
      "Reverse a chord tail into the downbeat as a swell.",
      "Pan ear candy wide; keep the core mono and centered.",
    ],
    relatedCategories: ["texture", "samples"],
    checklistTemplate: [
      { label: "Background texture/pad added" },
      { label: "1–2 pieces of ear candy placed" },
      { label: "Transitional swell/riser sketched" },
      { label: "Stereo field feels wide but balanced" },
    ],
  },
  {
    id: "effects",
    name: "Effects & Sound Design",
    objective:
      "Shape tone and space — make every element sit and feel intentional.",
    guidance: {
      mpc: "Use MPC effects/sends for cohesive reverb/delay; resample heavily processed elements to commit.",
      rytm: "Dial analog drive, the analog/digital delay & reverb, and per-track filtering.",
      a4: "Use the multimode filter, overdrive, chorus, and FX track for movement and width.",
    },
    creativePrompts: [
      "Pick one reverb space for the whole beat to glue it together.",
      "Delay-throw the snare or a vocal chop on the last bar of a phrase.",
      "Resample a distorted bus back in to commit the tone.",
    ],
    relatedCategories: ["effects", "texture"],
    checklistTemplate: [
      { label: "Cohesive reverb space chosen" },
      { label: "Delay throws / movement added" },
      { label: "Saturation/distortion decisions made" },
      { label: "Key elements committed (resampled) if needed" },
    ],
  },
  {
    id: "arrangement",
    name: "Song Arrangement",
    objective:
      "Turn the loop into a song — intro, verse, hook, bridge, drop, outro.",
    guidance: {
      mpc: "This is the MPC's job: arrange sections, automate mutes, place drops and breaks into the song mode.",
      rytm: "Create pattern variations (A/B/C) for verse/hook/fill that the arrangement can call.",
      a4: "Create pattern variations for verse/hook so harmony evolves across sections.",
    },
    creativePrompts: [
      "Drums + bass only for the verse; add chords/lead in the hook.",
      "Drop the drums for 2 bars before the final hook.",
      "Use an 8-bar intro that strips back to a single element.",
    ],
    relatedCategories: ["arrangement", "transition"],
    checklistTemplate: [
      { label: "Section map built (intro→outro)" },
      { label: "Section lengths set per substyle" },
      { label: "Energy contrast between sections" },
      { label: "Pattern variations created on Elektrons" },
    ],
  },
  {
    id: "automation",
    name: "Performance Automation & Live Variation",
    objective:
      "Inject human performance — mutes, fills, and parameter moves over time.",
    guidance: {
      mpc: "Record live track mutes and parameter automation into the arrangement. Capture the performance.",
      rytm: "Perform fills, retrigs, and performance-macro moves (snare delay throws, kick decay) live.",
      a4: "Perform filter sweeps, modulate the lead, and automate the FX track for movement.",
    },
    creativePrompts: [
      "Record a 16-bar live mute performance and keep the best take.",
      "Automate a slow filter open across the whole verse.",
      "Use Rytm performance macros for transition fills.",
    ],
    relatedCategories: ["automation", "transition"],
    checklistTemplate: [
      { label: "Live mute performance captured" },
      { label: "At least one evolving automation lane" },
      { label: "Fills/throws performed at transitions" },
      { label: "Best performance take saved" },
    ],
  },
  {
    id: "transition",
    name: "Transition Design",
    objective:
      "Make section changes feel inevitable with builds, drops, and fills.",
    guidance: {
      mpc: "Place risers, downlifters, reversed swells, and filter automation at section boundaries.",
      rytm: "Program hat-roll build-ups, snare rushes, and impact hits into the bar before a change.",
      a4: "Use a rising pad/noise sweep or pitch-rise into the drop; cut to silence for impact.",
    },
    creativePrompts: [
      "Snare roll + riser into every hook.",
      "Silence the bar before the drop, then hit hard.",
      "Filter-sweep the whole mix up into the chorus.",
    ],
    relatedCategories: ["transition", "effects"],
    checklistTemplate: [
      { label: "Build-up into hook designed" },
      { label: "Drop / impact moment created" },
      { label: "At least one reverse/riser swell placed" },
      { label: "Every section change feels intentional" },
    ],
  },
  {
    id: "mixprep",
    name: "Mix Prep",
    objective:
      "Get a clean, balanced rough mix ready for mixing/mastering or release.",
    guidance: {
      mpc: "Balance track levels, set sends, gain-stage the master, and prep individual outs for stems.",
      rytm: "Balance the drum bus internally; decide stereo vs. individual outs for the mix engineer.",
      a4: "Balance bass vs. melody levels; tame resonance; confirm tuning across the song.",
    },
    creativePrompts: [
      "Mix at low volume; if the balance works quiet, it works loud.",
      "Carve space: high-pass non-bass elements, sidechain the pad to the kick.",
      "Reference your A/B track for tonal balance.",
    ],
    relatedCategories: ["mixprep", "effects"],
    checklistTemplate: [
      { label: "Rough level balance complete" },
      { label: "Low-end (kick vs. bass) sits cleanly" },
      { label: "High-pass / EQ space carved" },
      { label: "Master gain-staged with headroom" },
      { label: "Reference A/B checked" },
    ],
  },
  {
    id: "export",
    name: "Export / Stem Checklist",
    objective:
      "Bounce stems and/or a stereo mix with notes for future mix/master.",
    guidance: {
      mpc: "Render stems per track/group or a stereo mixdown. Label clearly. Export at proper sample rate/bit depth.",
      rytm: "Record drum stems (full bus + individual outs if used) into the MPC for export.",
      a4: "Record bass/melody/texture stems into the MPC for export.",
    },
    creativePrompts: [
      "Export stems dry where possible; keep FX-printed versions too.",
      "Name stems consistently: 01_Kick, 02_Snare, 03_Bass...",
      "Save a session recall sheet: BPM, key, kit, patch names.",
    ],
    relatedCategories: ["mixprep"],
    checklistTemplate: [
      { label: "Stems exported (drums/bass/harmony/melody/texture)" },
      { label: "Stereo rough mix exported" },
      { label: "Files named and organized" },
      { label: "Session recall notes saved" },
    ],
  },
  {
    id: "review",
    name: "Final Review",
    objective:
      "Step back, evaluate the whole, and decide what (if anything) to fix.",
    guidance: {
      mpc: "Play the full arrangement start-to-finish; note any weak sections or dead air.",
      rytm: "Check that fills/variation keep the drums from feeling static.",
      a4: "Check tuning and that melodic parts serve the song, not ego.",
    },
    creativePrompts: [
      "Listen on phone/laptop speakers — does it translate?",
      "Cut one element you love but don't need.",
      "Does every 8 bars give the listener something new?",
    ],
    relatedCategories: ["arrangement", "mixprep"],
    checklistTemplate: [
      { label: "Full playthrough completed" },
      { label: "Arrangement holds attention throughout" },
      { label: "Translates on multiple speakers" },
      { label: "Future mix/master notes written" },
      { label: "Marked as done — track complete!" },
    ],
  },
];

export const STAGE_MAP: Record<string, ProductionStage> = Object.fromEntries(
  STAGES.map((s) => [s.id, s])
);

/** Final song-completion checklist (separate from per-stage checklists). */
export const COMPLETION_CHECKLIST: string[] = [
  "BPM selected",
  "Key / mood selected",
  "Drum foundation complete",
  "Bassline complete",
  "Hook idea complete",
  "Verse variation complete",
  "Transitions added",
  "Arrangement complete",
  "Effects decisions made",
  "Performance automation captured",
  "Rough balance complete",
  "Stems or final stereo export prepared",
  "Notes for future mix/master saved",
];

export const CATEGORY_LABELS: Record<CreativeCategory, string> = {
  drums: "Drum Patterns",
  bass: "Basslines",
  chords: "Chords / Harmony",
  melody: "Leads / Hooks",
  samples: "Samples / Chops",
  texture: "Textures / Ear Candy",
  effects: "Effects",
  transition: "Transitions",
  arrangement: "Arrangement",
  automation: "Performance Automation",
  mixprep: "Mix Prep",
};
