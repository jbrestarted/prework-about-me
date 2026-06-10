/**
 * Reference-grounded knowledge library for Beatsmith.
 *
 * Source discipline: every item is transformed, summarized guidance — never a
 * copyrighted excerpt. `source` fields name the concept and its origin manual /
 * cheat-sheet generically (e.g. "MPC Live III User Guide — Track Mute Mode").
 * Device button-paths are phrased as "suggested workflow / configure on your
 * device", never as claims the app performs hardware actions.
 *
 * Everything here is plain serializable data (no functions) so the standalone
 * build can JSON-embed it. Evaluation logic (e.g. health checks) lives in the UI.
 */

export type KDevice = "mpc" | "rytm" | "a4";
export type KDifficulty = "beginner" | "intermediate" | "advanced";

export interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  stage: string;
  genres: string[] | "all";
  devices: KDevice[];
  musicalPurpose: string;
  technicalPurpose: string;
  steps: string[];
  variations: string[];
  caution: string;
  difficulty: KDifficulty;
  energy: number; // 1-5
  source: string;
}

export interface Playbook {
  id: string;
  title: string;
  device: KDevice | "all";
  summary: string;
  sections: { name: string; steps: string[] }[];
  source: string;
}

export interface GenreProfile {
  drumDensity: string;
  swing: string;
  kickSnareClapHat: string;
  rytm: string;
  mpcSampling: string;
  a4Bass: string;
  a4ChordLead: string;
  effects: string;
  arrangement: string;
  transitions: string;
  firstMove: string;
  commonMistake: string;
  referenceListening: string[];
}

export interface GroovePattern {
  id: string;
  name: string;
  genre: string;
  feel: string;
  kick: string;
  snare: string;
  hat: string;
  perc: string;
  swingNote: string;
  variants: { safe: string; bouncy: string; experimental: string };
}

export interface StuckPreset {
  id: string;
  label: string;
  immediate: string[];
  deviceMoves: { mpc: string; rytm: string; a4: string };
  musicalAlternatives: string[];
  arrangementMove: string;
  mixMove: string;
  constraint: string;
}

/* ============================================================= KNOWLEDGE */
export const KNOWLEDGE: KnowledgeItem[] = [
  {
    id: "kb-clock-master", title: "MPC as master clock for the Elektron pair",
    category: "Project Setup and Clocking", subcategory: "Sync topology", stage: "setup",
    genres: "all", devices: ["mpc", "rytm", "a4"],
    musicalPurpose: "Keep all three machines locked so swing, fills, and arrangement line up.",
    technicalPurpose: "One transport source avoids drift and double-triggered starts.",
    steps: [
      "On the MPC, enable sending MIDI Clock + Start/Stop to your MIDI out / USB host.",
      "Set each Elektron to receive clock and transport (sync to external).",
      "Press Play on the MPC only — confirm both Elektrons start and report the MPC tempo.",
      "Pick the master BPM on the MPC before designing sounds.",
    ],
    variations: [
      "Safer: verify with a single bar loop before committing to a kit.",
      "Performance: arm the MPC to also send Program Change to recall Elektron patterns.",
    ],
    caution: "Only one device should send clock. Disable internal clock-send on the Elektrons to avoid fighting the master.",
    difficulty: "beginner", energy: 1,
    source: "Source concept: MPC Live III User Guide — MIDI / Sync; Analog Rytm & Analog Four manuals — Clock/Transport receive settings.",
  },
  {
    id: "kb-midi-channels", title: "Plan MIDI channels before you sequence",
    category: "MIDI Routing and Sync", subcategory: "Channel map", stage: "setup",
    genres: "all", devices: ["mpc", "rytm", "a4"],
    musicalPurpose: "Lets the MPC arrange and recall the Elektrons as external instruments.",
    technicalPurpose: "Prevents note collisions and makes multitrack MIDI capture predictable.",
    steps: [
      "Assign the Rytm an auto-channel and per-track channels for drum p-locks.",
      "Give the Analog Four distinct channels per synth track (bass / chords / lead / FX).",
      "Create matching MIDI tracks on the MPC, one per Elektron voice you want to arrange.",
      "Note the map on the Hardware page so future projects reuse it.",
    ],
    variations: [
      "Safer: sequence Elektrons on their own and only record key changes on the MPC.",
      "Advanced: drive individual Rytm tracks from MPC pads for p-lock-style automation.",
    ],
    caution: "Channel assignments here are editable defaults — confirm against your own global MIDI settings.",
    difficulty: "intermediate", energy: 1,
    source: "Source concept: 25 MIDI Secrets — channel planning; MPC MIDI track routing; Elektron per-track MIDI channels.",
  },
  {
    id: "kb-track-mute-sketch", title: "Use MPC Track Mute as an arrangement sketchpad",
    category: "MPC Track Mute / Pad Mute Performance", subcategory: "Arrangement testing", stage: "arrangement",
    genres: "all", devices: ["mpc"],
    musicalPurpose: "Audition section combinations before committing to a fixed timeline.",
    technicalPurpose: "Quantized mutes let you test musical combinations in time, hands-on.",
    steps: [
      "Put every element on its own MPC track (or sub-mix).",
      "Enter Track Mute mode and set mute quantization to the bar.",
      "Perform an arrangement live by muting/unmuting to find intro/verse/hook energy.",
      "When a combination works, capture it into Arrange mode as the real timeline.",
    ],
    variations: [
      "Safer: write down the mute order before recording it.",
      "Performance: assign mutes to pads and perform drops in real time.",
    ],
    caution: "Mute timing depends on your quantize setting — set it before performing.",
    difficulty: "beginner", energy: 3,
    source: "Source concept: MPC Live III User Guide — Track Mute Mode (pad muting, quantized mute timing).",
  },
  {
    id: "kb-arrange-mode", title: "Arrange mode as the final song timeline",
    category: "MPC Arranging and Recording", subcategory: "Song hub", stage: "arrangement",
    genres: "all", devices: ["mpc"],
    musicalPurpose: "Turn loops and performances into a finished, linear track.",
    technicalPurpose: "A linear sequencer that records MIDI/audio into a timeline for mixdown/export.",
    steps: [
      "Build your sequences (loops) first, one per musical section.",
      "Order them into the arrangement timeline as intro/verse/hook/etc.",
      "Record live mutes, fills, and automation passes into the arrangement.",
      "Mix down / export the arrangement when the structure holds attention.",
    ],
    variations: [
      "Safer: duplicate a verse sequence and edit it for variation rather than starting blank.",
      "Advanced: record external Elektron audio into the arrangement as resampled tracks.",
    ],
    caution: "Keep a loop-based version saved before flattening to arrangement in case you re-edit.",
    difficulty: "intermediate", energy: 2,
    source: "Source concept: MPC Live III User Guide — Arrange Mode (linear sequencing, recording, mixdown/export).",
  },
  {
    id: "kb-chop-response", title: "Chop a duplicate sample into a response phrase",
    category: "MPC Sampling and Chop Workflow", subcategory: "Call & response", stage: "hooks",
    genres: ["boom-bap", "soul-sample", "east-coast", "lofi", "jazz-hop"], devices: ["mpc"],
    musicalPurpose: "Creates a hook answer so the loop feels composed, not looped.",
    technicalPurpose: "Re-slicing the same source keeps tonal cohesion while adding motion.",
    steps: [
      "Duplicate your main chop to a new set of pads.",
      "Re-slice it on different transients to find a contrasting phrase.",
      "Play the original on the verse and the response chop on the hook.",
      "Pitch the response a 3rd/5th for a melodic answer.",
    ],
    variations: [
      "Safer: simply reverse one slice for the answer.",
      "Experimental: time-stretch the response chop to half speed.",
      "Performance: trigger the response live and quantize after.",
    ],
    caution: "Keep the response shorter than the call so it answers rather than competes.",
    difficulty: "beginner", energy: 3,
    source: "Source concept: MPC sample chop/slice workflow; call-and-response melodic phrasing.",
  },
  {
    id: "kb-qlink-macros", title: "Map Q-Links for live filter/FX performance",
    category: "MPC Q-Link / XY / Crossfader / Pad Grid Macros", subcategory: "Macro control", stage: "automation",
    genres: "all", devices: ["mpc"],
    musicalPurpose: "Adds human movement and build-ups without programming every step.",
    technicalPurpose: "Assignable controllers record continuous parameter automation in real time.",
    steps: [
      "Assign a Q-Link to a master filter cutoff and another to a send level.",
      "Arm automation record on the MPC.",
      "Perform a filter open into the hook and a delay-send swell on transitions.",
      "Clean up the recorded automation curve afterward if needed.",
    ],
    variations: [
      "Safer: automate one parameter at a time.",
      "Performance: use the XY pad/crossfader for a two-axis filter+resonance sweep.",
    ],
    caution: "Record automation in passes — too many parameters at once gets muddy fast.",
    difficulty: "intermediate", energy: 4,
    source: "Source concept: MPC Live III User Guide — Q-Link controls, XY Pad, Crossfader, automation recording.",
  },
  {
    id: "kb-rytm-locktrig", title: "Lock trigs for drum variation without retriggering",
    category: "Rytm Parameter Locks and Lock Trigs", subcategory: "Variation", stage: "drums",
    genres: "all", devices: ["rytm"],
    musicalPurpose: "Adds movement and surprise to a static drum loop.",
    technicalPurpose: "Lock trigs change parameters on a step without sounding a new note.",
    steps: [
      "Program your base kick/snare/hat note trigs.",
      "Add lock trigs on a few steps and p-lock decay, pitch, or sample slot.",
      "Tweak hat decay and tone across the bar for natural variation.",
      "Use a second pattern as an A/B variation for the hook.",
    ],
    variations: [
      "Safer: p-lock only hat decay on 2–3 steps.",
      "Experimental: p-lock the sample slot per step for glitch textures.",
      "Performance: perform p-locks live with the trig and parameter encoders.",
    ],
    caution: "A few well-placed locks beat dozens — keep the core groove readable.",
    difficulty: "intermediate", energy: 3,
    source: "Source concept: Analog Rytm MKII manual — note trigs vs lock trigs; parameter locks.",
  },
  {
    id: "kb-rytm-microtiming", title: "Microtiming for push/pull swing on the Rytm",
    category: "Rytm Microtiming / Retrigs / Fills", subcategory: "Groove", stage: "tempo-groove",
    genres: ["boom-bap", "lofi", "jazz-hop", "soul-sample", "east-coast"], devices: ["rytm"],
    musicalPurpose: "Gives drums a human, behind/ahead-the-beat pocket.",
    technicalPurpose: "Per-step microtiming nudges trigs off the grid without changing tempo.",
    steps: [
      "Pick the hats or snare to humanize.",
      "Nudge selected steps slightly late for a laid-back feel (or early to push).",
      "Combine with velocity changes for ghost notes.",
      "A/B against the straight grid to confirm it grooves harder.",
    ],
    variations: [
      "Safer: nudge only the backbeat snare a hair late.",
      "Experimental: push some hats early and pull others late in the same bar.",
    ],
    caution: "Tiny amounts go a long way — large nudges read as mistakes.",
    difficulty: "intermediate", energy: 2,
    source: "Source concept: Analog Rytm MKII manual — microtiming trig edits; push/pull groove.",
  },
  {
    id: "kb-rytm-retrig", title: "Retrigs for rolls, trap hats, and fills",
    category: "Rytm Microtiming / Retrigs / Fills", subcategory: "Fills", stage: "drums",
    genres: ["trap", "synth-modern", "memphis-dark", "southern-bounce"], devices: ["rytm"],
    musicalPurpose: "Hat rolls and snare buzzes that drive energy into a section change.",
    technicalPurpose: "Retrig repeats a trig at a set rate with optional velocity curve.",
    steps: [
      "Place a trig where you want the roll (e.g. last beat before the hook).",
      "Enable retrig and choose a rate (1/32 or triplet for trap).",
      "Set a retrig velocity curve so the roll builds or fades.",
      "Reserve the busiest rolls for transitions only.",
    ],
    variations: [
      "Safer: a single 1/16 snare buzz before the drop.",
      "Experimental: accelerating retrig rate across two beats.",
      "Performance: trigger retrig fills live with the fill/scene controls.",
    ],
    caution: "Constant rolls lose impact — contrast with sparse bars.",
    difficulty: "intermediate", energy: 5,
    source: "Source concept: Analog Rytm MKII manual — retrig settings and velocity curve; fill mode.",
  },
  {
    id: "kb-rytm-layer", title: "Layer analog + sample for a fuller drum",
    category: "Rytm Sound Design", subcategory: "Layering", stage: "drums",
    genres: "all", devices: ["rytm"],
    musicalPurpose: "Combine analog body with sampled character for a signature kick/snare.",
    technicalPurpose: "Each Rytm voice pairs a synthesized analog engine with a sample.",
    steps: [
      "Dial an analog kick for low-end body and transient.",
      "Add a sampled top/click on the same voice for character.",
      "Balance sample level vs analog so they read as one hit.",
      "Tune both to the track key for pitched 808-style kicks.",
    ],
    variations: [
      "Safer: a touch of sampled noise under an analog snare.",
      "Experimental: detune the sample layer against the analog body.",
    ],
    caution: "Watch low-end phase when layering two low sources.",
    difficulty: "intermediate", energy: 3,
    source: "Source concept: Analog Rytm MKII manual — analog drum engines + sample playback per voice.",
  },
  {
    id: "kb-a4-bass-design", title: "Analog Four bass: oscillator + filter envelope",
    category: "Analog Four Bass Design", subcategory: "Sub & character", stage: "bass",
    genres: "all", devices: ["a4"],
    musicalPurpose: "A bass that sits low but still speaks on small speakers.",
    technicalPurpose: "Sub osc for weight, a second osc for character, filter env for punch.",
    steps: [
      "Set osc 1 to a sine/triangle sub and osc 2 to a saw a register up.",
      "Use a fast filter envelope for attack punch, then settle to a low cutoff.",
      "Add a touch of overdrive for harmonics that survive small speakers.",
      "Keep it mostly mono and locked to the kick rhythm.",
    ],
    variations: [
      "Safer: sub osc only, minimal movement.",
      "Experimental: p-lock the sub osc pitch for an 808-glide bass.",
      "Performance: ride the filter cutoff into the hook.",
    ],
    caution: "Too much movement muddies the low end — let the kick share the space.",
    difficulty: "intermediate", energy: 2,
    source: "Source concept: Analog Four MKII manual — oscillators, sub osc, ladder/multimode filters, envelopes.",
  },
  {
    id: "kb-a4-808-glide", title: "Pitched 808 / glide bass on the Analog Four",
    category: "Analog Four Bass Design", subcategory: "808 glide", stage: "bass",
    genres: ["trap", "synth-modern", "memphis-dark", "southern-bounce"], devices: ["a4"],
    musicalPurpose: "Melodic 808 that follows the key and glides between notes.",
    technicalPurpose: "Portamento/glide + long amp decay create the sustained 808 movement.",
    steps: [
      "Use a sine-ish sub with a long amp decay/release.",
      "Enable glide/portamento so overlapping notes slide in pitch.",
      "Sequence root notes that follow your melody/chords.",
      "Add distortion/overdrive for the buzzy harmonic edge.",
    ],
    variations: [
      "Safer: glide only between two notes per phrase.",
      "Experimental: p-lock pitch for stutter-glide patterns.",
    ],
    caution: "Long 808s and busy basslines fight — pick sustain or movement, not both.",
    difficulty: "intermediate", energy: 3,
    source: "Source concept: Analog Four MKII manual — portamento/glide, amp envelope, overdrive.",
  },
  {
    id: "kb-a4-chords", title: "Extended-chord stabs on the Analog Four",
    category: "Analog Four Chords / Pads / Stabs", subcategory: "Voicings", stage: "harmony",
    genres: ["jazz-hop", "soul-sample", "lofi", "boom-bap", "west-coast"], devices: ["a4"],
    musicalPurpose: "Rich 7th/9th color that defines the track's mood.",
    technicalPurpose: "Multiple notes per step (chord mode/sequencing) with filter shaping.",
    steps: [
      "Build a minor 9 voicing: root, b3, 5, b7, 9 — drop a note if it's muddy.",
      "Shape with a soft attack and gentle filter for a Rhodes-like stab.",
      "Send to chorus + a short delay for width.",
      "Play it sparse — on the 'and' of beats, not every beat.",
    ],
    variations: [
      "Safer: a simple minor triad with the 9 on top.",
      "Advanced: voice-lead two chords so only one note moves.",
      "Performance: p-lock the filter to open the stab each repeat.",
    ],
    caution: "Big voicings in the low-mids clash with bass — keep chords above the bass register.",
    difficulty: "advanced", energy: 3,
    source: "Source concept: Analog Four MKII manual — chord sequencing, filters, chorus/delay sends; Chord Construction cheat sheets.",
  },
  {
    id: "kb-a4-lead-counter", title: "Countermelody / counterline on the lead track",
    category: "Analog Four Leads / Hooks / Countermelodies", subcategory: "Counterpoint", stage: "hooks",
    genres: "all", devices: ["a4"],
    musicalPurpose: "A second melodic line that answers the hook without crowding it.",
    technicalPurpose: "A dedicated synth track in a contrasting register and timbre.",
    steps: [
      "Write the counterline to move when the main hook holds, and rest when it moves.",
      "Place it an octave above or below the hook for separation.",
      "Use a different timbre (pluck vs pad) so the ear separates them.",
      "Keep mostly chord tones; add one passing tone for interest.",
    ],
    variations: [
      "Safer: echo the hook a bar later, slightly varied.",
      "Advanced: contrary motion — counterline rises as hook falls.",
    ],
    caution: "Two busy lines at once = mush. Trade space (call and response).",
    difficulty: "advanced", energy: 3,
    source: "Source concept: Counterpoint / Fux — independence of lines, contrary motion; call-and-response melody building.",
  },
  {
    id: "kb-a4-modulation", title: "LFO + envelope movement to keep synths alive",
    category: "Analog Four Modulation / Envelopes / LFO", subcategory: "Movement", stage: "texture",
    genres: "all", devices: ["a4"],
    musicalPurpose: "Static synths feel sampled; modulation makes them breathe.",
    technicalPurpose: "LFOs and a second envelope modulate filter, pitch, or amplitude over time.",
    steps: [
      "Assign a slow LFO to filter cutoff for gentle evolving motion.",
      "Use a second envelope on pitch for a subtle attack 'bloom'.",
      "Sync an LFO to tempo for rhythmic filter or tremolo movement.",
      "Automate LFO depth so movement increases into the hook.",
    ],
    variations: [
      "Safer: one slow filter LFO at low depth.",
      "Experimental: free-running LFOs for non-repeating texture.",
    ],
    caution: "Tempo-synced movement that's too deep can fight the groove.",
    difficulty: "intermediate", energy: 3,
    source: "Source concept: Analog Four MKII manual — LFOs, dual envelopes, modulation destinations.",
  },
  {
    id: "kb-a4-fx-track", title: "Use the Analog Four FX track to process external audio",
    category: "Analog Four FX Track / External Processing", subcategory: "Outboard FX", stage: "effects",
    genres: "all", devices: ["a4"],
    musicalPurpose: "Run drums or chops through analog filter + FX for glue and character.",
    technicalPurpose: "The A4's external-input/FX path filters and effects incoming audio.",
    steps: [
      "Route an MPC sub-out into the Analog Four external input.",
      "Filter and overdrive the incoming audio for analog character.",
      "Add chorus/delay/reverb from the A4 sends.",
      "Resample the processed result back into the MPC.",
    ],
    variations: [
      "Safer: light filtering + a touch of overdrive only.",
      "Experimental: sequence p-locked filter sweeps on the incoming audio.",
    ],
    caution: "Confirm your routing/levels before printing — gain-stage to avoid clipping.",
    difficulty: "advanced", energy: 2,
    source: "Source concept: Analog Four MKII manual — external input / FX track routing and processing.",
  },
  {
    id: "kb-scale-map", title: "Map your key/scale before writing notes",
    category: "Scale and Key Mapping", subcategory: "Setup", stage: "harmony",
    genres: "all", devices: ["mpc", "a4"],
    musicalPurpose: "Stay in key so basslines, chops, and melodies agree instantly.",
    technicalPurpose: "Scale/keyboard modes constrain pads/keys to in-key notes.",
    steps: [
      "Pick a key and scale that matches the mood (minor for dark, Dorian for cool-minor).",
      "Set the MPC pads / A4 keyboard to that scale if available.",
      "Tune any pitched samples and the 808 to the same key.",
      "Note the key on the project so every part references it.",
    ],
    variations: [
      "Safer: natural minor for almost any hip-hop mood.",
      "Advanced: borrow one out-of-key note for tension (see modal mixture).",
    ],
    caution: "If you sampled a loop, detect its key first and build around it.",
    difficulty: "beginner", energy: 1,
    source: "Source concept: Using Keys in Your DAW; Scale mapping workflow; MPC pad scale modes.",
  },
  {
    id: "kb-bassline-extract", title: "Extract a bassline from your chord roots",
    category: "Chord Construction", subcategory: "Bassline from chords", stage: "bass",
    genres: "all", devices: ["a4", "mpc"],
    musicalPurpose: "A bassline that's guaranteed to fit the harmony.",
    technicalPurpose: "Use chord root notes (and occasional 5th) as the bass sequence.",
    steps: [
      "Write the chord roots in order as the bass foundation.",
      "Lock the bass rhythm to the kick for pocket.",
      "Add a passing 5th or octave before chord changes for motion.",
      "Leave space — the bass doesn't need to play every chord change.",
    ],
    variations: [
      "Safer: roots only, on the beat.",
      "Advanced: walk between roots using scale tones (jazz-hop).",
    ],
    caution: "If a root clashes with the sample's bass note, follow the sample.",
    difficulty: "beginner", energy: 2,
    source: "Source concept: Chord construction → root-note bassline extraction; How to Make Chords in Your DAW.",
  },
  {
    id: "kb-progression-templates", title: "Roman-numeral progressions that fit any key",
    category: "Chord Progression Development", subcategory: "Templates", stage: "harmony",
    genres: "all", devices: ["a4", "mpc"],
    musicalPurpose: "Reliable emotional progressions you can transpose to any key.",
    technicalPurpose: "Roman numerals are key-independent recipes for chord choices.",
    steps: [
      "Pick a progression: i–VI–III–VII (dark), i–iv–i–V (tense), ii–V–i (jazzy).",
      "Translate the numerals into your chosen key's chords.",
      "Loop it for 4 bars and feel the emotional arc.",
      "Reharmonize one chord for the hook to lift it.",
    ],
    variations: [
      "Safer: two-chord vamp (i–VI) for hypnotic loops.",
      "Advanced: add a secondary dominant before the target chord.",
    ],
    caution: "Don't change chords every bar in trap/memphis — repetition is the point.",
    difficulty: "intermediate", energy: 2,
    source: "Source concept: Chord Progressions Cheat Sheet — Roman-numeral, key-independent progressions.",
  },
  {
    id: "kb-advanced-harmony", title: "Color moves: modal mixture, secondary dominants, chromatic mediants",
    category: "Advanced Harmony", subcategory: "Reharmonization", stage: "harmony",
    genres: ["jazz-hop", "soul-sample", "dark-cinematic", "experimental", "abstract-instrumental"], devices: ["a4"],
    musicalPurpose: "Unexpected color that makes a simple loop sound expensive.",
    technicalPurpose: "Borrowed and applied chords add tension/resolution outside the basic scale.",
    steps: [
      "Modal mixture: borrow a chord from the parallel major/minor (e.g. bVI in minor).",
      "Secondary dominant: precede a chord with the V of that chord.",
      "Chromatic mediant: jump to a chord a 3rd away with a shared tone.",
      "Use one color move per loop — let it be the highlight.",
    ],
    variations: [
      "Safer: just add a bVII for a modal lift.",
      "Advanced: altered dominant (b9/#9) into a minor resolution.",
    ],
    caution: "Color chords lose their effect if overused — frame them with simple harmony.",
    difficulty: "advanced", energy: 3,
    source: "Source concept: A Guide to Advanced Harmony — modal mixture, secondary dominants, chromatic mediants, altered dominants.",
  },
  {
    id: "kb-polyrhythm", title: "3-against-2 polyrhythm for groove interest",
    category: "Polyrhythm and Groove Design", subcategory: "Polymeter", stage: "tempo-groove",
    genres: ["experimental", "abstract-instrumental", "dark-cinematic", "trap"], devices: ["rytm", "mpc"],
    musicalPurpose: "A hypnotic tension between two pulses that keeps loops from feeling flat.",
    technicalPurpose: "Layer a 3-step rhythmic figure against the 4/4 grid.",
    steps: [
      "Keep kick/snare in straight 4/4 as the anchor.",
      "Program a percussion/hat figure that repeats every 3 sixteenths.",
      "Let the two cycles drift and realign over the bar.",
      "Use it on an ear-candy layer, not the main groove.",
    ],
    variations: [
      "Safer: 3-against-2 only on a quiet shaker.",
      "Experimental: 5-over-4 or 7-over-4 on a melodic blip for abstract beats.",
    ],
    caution: "Anchor the downbeat clearly or the listener loses the pocket.",
    difficulty: "advanced", energy: 4,
    source: "Source concept: Polyrhythms — 3:2, 5:4, 7:4 cross-rhythms layered over a steady pulse.",
  },
  {
    id: "kb-song-inspiration", title: "Lock a concept before you start",
    category: "Song Inspiration / Concept Development", subcategory: "Concept", stage: "reference",
    genres: "all", devices: ["mpc"],
    musicalPurpose: "A one-line concept keeps every decision pointed the same direction.",
    technicalPurpose: "Reduces blank-project paralysis and scope creep.",
    steps: [
      "Write one sentence: mood + setting + energy (e.g. 'rainy late-night drive, patient').",
      "Pick one reference track that embodies it.",
      "Choose the single element from that reference you'll chase (drums? chords? space?).",
      "Save the concept to the project and judge ideas against it.",
    ],
    variations: [
      "Safer: borrow a mood, not specific sounds.",
      "Advanced: write a title first and produce toward it.",
    ],
    caution: "Inspiration is conceptual — borrow the feeling, never copy the audio.",
    difficulty: "beginner", energy: 1,
    source: "Source concept: Song Inspiration Cheat Sheet — concept-first writing; reference/ghost-track approach.",
  },
  {
    id: "kb-speed-write", title: "8-bar seed sprint to beat the blank project",
    category: "Workflow / Speed-Writing / Completion", subcategory: "Speed-writing", stage: "drums",
    genres: "all", devices: ["mpc", "rytm", "a4"],
    musicalPurpose: "Momentum — a finished 8-bar loop is the hardest, most important step.",
    technicalPurpose: "Time-boxing forces commitment and prevents endless sound-hunting.",
    steps: [
      "Set a 15-minute timer to build a 2-bar seed (drums + bass).",
      "Expand the best 2 bars to an 8-bar loop with one variation.",
      "Commit to the sounds — no swapping until the loop is done.",
      "Only then move to chords/hook.",
    ],
    variations: [
      "Safer: start from a saved template/kit.",
      "Advanced: speed-write three seeds and keep the strongest.",
    ],
    caution: "Sound-design rabbit holes kill tracks — design after the loop works.",
    difficulty: "beginner", energy: 3,
    source: "Source concept: Workflow Cheat Sheet & Ultimate Speed Writing Cheat Sheet — seed → loop → commit.",
  },
  {
    id: "kb-energy-curve", title: "Plan an energy curve across the arrangement",
    category: "Arrangement / Transitions / Energy Management", subcategory: "Dynamics", stage: "arrangement",
    genres: "all", devices: ["mpc"],
    musicalPurpose: "Keeps a listener engaged by rising and falling, not staying flat.",
    technicalPurpose: "Map each section's energy 1–5 and engineer contrast between them.",
    steps: [
      "Sketch the intended energy of each section (intro low, hook high).",
      "Ensure no two adjacent sections share the same energy.",
      "Subtract elements before a drop so the drop hits harder.",
      "Add one new element each time a section repeats.",
    ],
    variations: [
      "Safer: classic low-build-high-release curve.",
      "Advanced: false drop / breakdown before the real hook.",
    ],
    caution: "Adding more isn't more energy — removing then restoring creates impact.",
    difficulty: "intermediate", energy: 3,
    source: "Source concept: Arrangement / energy management; subtractive arrangement.",
  },
  {
    id: "kb-transition-toolkit", title: "Transition toolkit: fills, sweeps, drops, throws",
    category: "Arrangement / Transitions / Energy Management", subcategory: "Transitions", stage: "transition",
    genres: "all", devices: ["mpc", "rytm", "a4"],
    musicalPurpose: "Smooth or dramatic section changes that signal what's coming.",
    technicalPurpose: "Combine a Rytm fill, an A4 filter sweep, and an MPC FX throw at the seam.",
    steps: [
      "Rytm: a snare/hat retrig fill in the last bar before the change.",
      "A4: open or close a filter across the transition bar.",
      "MPC: a delay/reverb throw on the last hit, plus a quick mute drop.",
      "Optionally drop everything for a beat before the hook.",
    ],
    variations: [
      "Safer: just a one-bar drum fill.",
      "Experimental: reverse-cymbal riser + sub drop.",
      "Performance: perform the mute drop live in Track Mute.",
    ],
    caution: "Don't use every transition type at once — pick one or two per seam.",
    difficulty: "intermediate", energy: 4,
    source: "Source concept: Transition design — fills (Rytm retrig), filter sweeps (A4), FX throws & mutes (MPC).",
  },
  {
    id: "kb-mixprep-balance", title: "Rough balance and frequency space before exporting",
    category: "Mix-Prep / Export / Review", subcategory: "Balance", stage: "mixprep",
    genres: "all", devices: ["mpc", "a4"],
    musicalPurpose: "A clear, translating beat where every element is audible.",
    technicalPurpose: "Set levels, carve overlap, and check mono/small-speaker translation.",
    steps: [
      "Balance levels with kick and the lead element as anchors.",
      "Keep the bass mostly mono and below the chords' register.",
      "Carve overlap: high-pass pads/chops off the sub region.",
      "Check the mix in mono and on a phone speaker.",
    ],
    variations: [
      "Safer: just set static levels and pan.",
      "Advanced: light bus saturation/glue before printing.",
    ],
    caution: "Mix-prep, not final mix — leave headroom and save notes for mastering.",
    difficulty: "intermediate", energy: 1,
    source: "Source concept: Mix-prep — gain staging, frequency separation, mono/translation checks.",
  },
  {
    id: "kb-stem-export", title: "Stem / mixdown export checklist",
    category: "Mix-Prep / Export / Review", subcategory: "Export", stage: "export",
    genres: "all", devices: ["mpc"],
    musicalPurpose: "Deliverables a mix engineer (or future you) can actually use.",
    technicalPurpose: "Consistent start points, headroom, and labeled stems.",
    steps: [
      "Print external Elektron parts to audio tracks in the MPC first.",
      "Export a stereo bounce at the master tempo with headroom (~-6 dB).",
      "Export stems (drums / bass / music / FX) from the same start point.",
      "Label files with title, key, and BPM.",
    ],
    variations: [
      "Safer: stereo bounce only for now.",
      "Advanced: also export a click/tempo map and an alt arrangement.",
    ],
    caution: "Resample external gear before exporting — MIDI alone won't recall analog tweaks reliably.",
    difficulty: "intermediate", energy: 1,
    source: "Source concept: MPC Live III User Guide — Audio Mixdown / export; stem delivery best practice.",
  },
  {
    id: "kb-velocity-ghost", title: "Velocity shaping and ghost notes",
    category: "Rytm Drum Programming", subcategory: "Dynamics", stage: "drums",
    genres: ["boom-bap", "lofi", "jazz-hop", "soul-sample"], devices: ["rytm"],
    musicalPurpose: "Drums that breathe like a drummer instead of a machine.",
    technicalPurpose: "Per-step velocity creates accents and quiet ghost notes.",
    steps: [
      "Lower the velocity of off-beat hats and in-between snares to make ghosts.",
      "Accent the backbeat and the downbeat kick.",
      "Add 1–2 quiet ghost snares between the main hits.",
      "Vary velocity slightly each repeat so it never feels stamped.",
    ],
    variations: [
      "Safer: just accent vs un-accent two hat levels.",
      "Advanced: velocity-mod the decay so quiet hits are also shorter.",
    ],
    caution: "Ghost notes should be felt, not heard — keep them low.",
    difficulty: "beginner", energy: 2,
    source: "Source concept: Rytm velocity per trig; ghost-note drumming; groove humanization.",
  },
  {
    id: "kb-note-repeat", title: "MPC Note Repeat for hats and stutters",
    category: "MPC Sampling and Chop Workflow", subcategory: "Performance input", stage: "drums",
    genres: ["trap", "synth-modern", "southern-bounce", "memphis-dark"], devices: ["mpc"],
    musicalPurpose: "Fast, musical hat rolls and stutters played by feel.",
    technicalPurpose: "Note Repeat retriggers a pad at a selected timing division while held.",
    steps: [
      "Hold Note Repeat and select a division (1/16, 1/32, triplets).",
      "Play hats live, sliding between divisions for rolls.",
      "Use pad pressure/velocity if enabled for dynamic rolls.",
      "Quantize lightly after to keep the human feel.",
    ],
    variations: [
      "Safer: program rolls step-by-step instead.",
      "Performance: perform the whole hat track live with Note Repeat.",
    ],
    caution: "Over-quantizing kills the performance feel you just played in.",
    difficulty: "beginner", energy: 4,
    source: "Source concept: MPC Live III User Guide — Note Repeat (timing divisions, performance entry).",
  },
];

/* ============================================================= PLAYBOOKS */
export const PLAYBOOKS: Playbook[] = [
  {
    id: "pb-mpc-master", title: "MPC Live III — Master Clock & Arranger", device: "mpc",
    summary: "Make the MPC the timing source and the final song hub for the whole rig.",
    source: "Source concept: MPC Live III User Guide — MIDI/Sync, Main Mode, Track Mute, Arrange Mode, Audio Mixdown, Q-Link/XY/Crossfader.",
    sections: [
      { name: "Project setup", steps: [
        "Create the project and choose the master BPM before sound design.",
        "Set the MPC to send MIDI Clock + Start/Stop over your chosen MIDI/USB out.",
        "Create MIDI tracks for each Elektron voice you want to arrange.",
        "Save a template project with this routing for next time." ] },
      { name: "Tempo & BPM decision", steps: [
        "Pick BPM from the substyle range; decide if you'll feel it half-time.",
        "Set global swing/quantize feel to taste.",
        "Confirm both Elektrons display the MPC tempo when you press Play." ] },
      { name: "MIDI output planning", steps: [
        "Map Rytm + Analog Four channels (see Hardware page).",
        "Decide which parts are sequenced on the Elektrons vs the MPC.",
        "Optionally send Program Change to recall Elektron patterns per section." ] },
      { name: "Track Mute sketchpad", steps: [
        "Put each element on its own track.",
        "Set mute quantization to the bar and audition section combos live.",
        "Capture the best arrangement into Arrange mode." ] },
      { name: "Arrange mode = final timeline", steps: [
        "Order sequences into intro/verse/hook/etc.",
        "Record live mutes, fills, and Q-Link automation passes.",
        "Keep a loop-based backup before flattening." ] },
      { name: "Export checklist", steps: [
        "Resample external Elektron audio into the MPC.",
        "Stereo mixdown with headroom; export labeled stems.",
        "Save mix/master notes to the project." ] },
    ],
  },
  {
    id: "pb-rytm-drums", title: "Analog Rytm MKII — Drum Production", device: "rytm",
    summary: "From kit concept to performance-ready drums with locks, microtiming, and fills.",
    source: "Source concept: Analog Rytm MKII manual & Quick Guide — voices, note vs lock trigs, microtiming, retrig, fill/scene, clock receive.",
    sections: [
      { name: "Kit concept", steps: [
        "Decide the drum character to match the substyle (clean / dusty / distorted).",
        "Choose kick, snare/clap, closed + open hat, and 1–2 percs.",
        "Tune the kick to the track key if you want pitched low end." ] },
      { name: "Foundation", steps: [
        "Program a 2-bar kick/snare skeleton first.",
        "Add hats; set swing/microtiming for the pocket.",
        "Balance levels and overall drive." ] },
      { name: "Analog + sample layering", steps: [
        "Pair the analog engine (body) with a sample (character) per voice.",
        "Watch low-end phase on layered kicks.",
        "Tune both layers together." ] },
      { name: "Recording: grid vs live", steps: [
        "Grid-program the core for precision.",
        "Overdub live for human feel, then lightly quantize." ] },
      { name: "Variation: note vs lock trigs", steps: [
        "Use lock trigs to change decay/pitch/sample slot without a new hit.",
        "Build an A pattern and a B (hook) pattern as variations." ] },
      { name: "Microtiming, retrig & fills", steps: [
        "Nudge selected steps for push/pull groove.",
        "Add retrig rolls/buzzes only into transitions.",
        "Use fill/scene to perform variation live." ] },
      { name: "Clock receive checklist", steps: [
        "Set Rytm to receive clock + transport from the MPC.",
        "Disable Rytm clock-send so it never fights the master.",
        "Confirm it follows MPC start/stop and tempo." ] },
    ],
  },
  {
    id: "pb-a4-synth", title: "Analog Four MKII — Synth Production", device: "a4",
    summary: "Assign the four tracks to roles and design bass, chords, leads, and texture.",
    source: "Source concept: Analog Four MKII manual & Notebook — 4 tracks, oscillators/sub/noise, ladder/multimode filters, envelopes, LFOs, FX sends, external input.",
    sections: [
      { name: "Track role assignment", steps: [
        "Track 1: bass. Track 2: chords/pad/stab. Track 3: lead/hook. Track 4: texture/FX or countermelody.",
        "Keep each track in its own register to avoid clashes.",
        "Decide which tracks the MPC will arrange via Program Change." ] },
      { name: "Bass track", steps: [
        "Sub osc for weight + a second osc for character; filter env for punch.",
        "Mono, locked to the kick; add overdrive for small-speaker presence.",
        "Glide/portamento for 808-style movement when needed." ] },
      { name: "Chord / pad / stab track", steps: [
        "Voice 7th/9th chords above the bass register.",
        "Soft attack + filter shaping for a Rhodes-like stab; chorus/delay for width.",
        "Play sparse — leave space for drums and vocals." ] },
      { name: "Lead / hook track", steps: [
        "Write a short, singable motif using mostly chord tones.",
        "Contrast its timbre with the chords (pluck vs pad).",
        "Add one passing tone and a tasteful slide." ] },
      { name: "Texture / countermelody track", steps: [
        "Add noise/atmos or a counterline that answers the hook.",
        "Use contrary motion or call-and-response, never two busy lines at once." ] },
      { name: "Modulation & FX", steps: [
        "Slow LFO on filter for breathing movement; second env on pitch for bloom.",
        "Use sends to chorus/delay/reverb; automate depth into the hook.",
        "Optionally process external MPC audio through the FX/external-input path." ] },
    ],
  },
  {
    id: "pb-song-capture", title: "Complete Song Capture — seed to export", device: "all",
    summary: "The end-to-end path from a 2-bar idea to a reviewed, exported track.",
    source: "Source concept: Workflow Cheat Sheet — concept → sounds → development → arrangement → rough mix → review → export.",
    sections: [
      { name: "Seed", steps: [
        "Build a 2-bar or 4-bar seed: drums + one melodic/bass element.",
        "Commit to the sounds; resist swapping." ] },
      { name: "Loop & variations", steps: [
        "Expand to an 8-bar loop.",
        "Create A / B / C variations (verse / hook / bridge feels)." ] },
      { name: "Assign device roles", steps: [
        "Rytm = drums, A4 = bass/melody, MPC = chops + arrangement.",
        "Confirm each part lives on the right machine." ] },
      { name: "Build arrangement", steps: [
        "Order sections in MPC Arrange mode.",
        "Perform mutes / fills / transitions; record automation passes." ] },
      { name: "Print & rough mix", steps: [
        "Resample external gear to audio.",
        "Rough-balance levels and frequency space." ] },
      { name: "Export & review", steps: [
        "Export stereo + stems with headroom and labels.",
        "Review against your reference track after a short break.",
        "Save what to improve on the next track." ] },
    ],
  },
];

/* ============================================================= GENRE PROFILES */
export const GENRE_PROFILES: Record<string, GenreProfile> = {
  "boom-bap": {
    drumDensity: "Medium — strong backbeat, busy swung hats, room to breathe.",
    swing: "Heavy 16th swing (~57–60%), slightly behind the beat.",
    kickSnareClapHat: "Punchy kick on 1 (+syncopated), cracking snare on 2 & 4, swung hats, occasional open hat.",
    rytm: "Layer an acoustic-style kick/snare under sampled drums; add quiet ghost snares + microtiming.",
    mpcSampling: "Chop dusty soul/jazz loops; build a response chop for the hook; filter the loop.",
    a4Bass: "Simple root-driven sub/upright locked to the kick; let the sample breathe.",
    a4ChordLead: "Optional filtered Rhodes stab or sub reinforcement; keep it minimal.",
    effects: "Saturation, vinyl sim, light room reverb, tape; a delay throw on the snare.",
    arrangement: "Loop-based 4/8/16-bar sections, scratch-style hooks, drum-only breaks.",
    transitions: "Drum fill + a one-beat mute drop before the hook.",
    firstMove: "Chop the sample and lock an 8-bar drum+bass loop with heavy swing.",
    commonMistake: "Over-quantizing the drums and killing the swing/pocket.",
    referenceListening: ["Drum swing depth", "Snare crack & space", "Sample filtering", "Hook = chop variation"],
  },
  "trap": {
    drumDensity: "Sparse low end, busy hats. Half-time feel.",
    swing: "Mostly straight (~50–52%); groove lives in hat rolls & triplets.",
    kickSnareClapHat: "Tuned 808 kick, snappy clap/snare on beat 3, fast hat rolls + triplet bursts.",
    rytm: "Design the snappy clap/snare + detailed hats; retrig rolls into drops.",
    mpcSampling: "Sparse dark melody loops; Note Repeat for live hats; beat-switch chops.",
    a4Bass: "Pitched 808 with glide following the key; long sustained sub notes.",
    a4ChordLead: "Dark bells, plucks, sparse eerie pads; single-note motifs.",
    effects: "Long reverb tails, pitch glides, stutter edits, distortion on the 808.",
    arrangement: "Hook-first, intro → hook → verse, beat switches, hat-roll builds.",
    transitions: "Hat-roll build + 808 slide + reverse riser into the hook.",
    firstMove: "Tune an 808, write the dark melody, then build hats around the space.",
    commonMistake: "Busy 808 + busy melody fighting; muddy low end.",
    referenceListening: ["808 tuning & glide", "Hat roll patterns", "Space in the beat", "Beat-switch moments"],
  },
  "lofi": {
    drumDensity: "Sparse and soft, lots of swing and wobble.",
    swing: "Loose 16th swing (~58–62%) with intentional timing drift.",
    kickSnareClapHat: "Soft dusty kick, brushed/rim snare, quiet hats; relaxed pocket.",
    rytm: "Low velocities, brush/rim textures, detune, gentle microtiming wobble.",
    mpcSampling: "Detuned Rhodes/jazz chops, vinyl crackle, short simple loops.",
    a4Bass: "Round soft sub/electric bass, simple and warm.",
    a4ChordLead: "Jazzy 7th/9th Rhodes-style chords, slow filter movement, mellow.",
    effects: "Tape wow/flutter, vinyl noise, low-pass filtering, bit reduction.",
    arrangement: "Short loops, minimal changes, ambient intros, found-sound interludes.",
    transitions: "Tape-stop, filter dip, or a vinyl-crackle swell.",
    firstMove: "Find a warm detuned chord loop and add soft swung drums under it.",
    commonMistake: "Too clean / too loud — lo-fi needs softness and imperfection.",
    referenceListening: ["Warmth & noise floor", "Timing looseness", "Chord detune", "Overall softness"],
  },
  "experimental": {
    drumDensity: "Unpredictable — sparse to dense, broken patterns.",
    swing: "Off-grid, polymetric, shifting or unstable.",
    kickSnareClapHat: "Glitched/granular hits, found percussion, odd placements.",
    rytm: "Heavy parameter locks, retrigs, sample mangling per step.",
    mpcSampling: "Resample everything, chop chaotically, automate plugin params.",
    a4Bass: "Distorted/modulated or atonal sub movement.",
    a4ChordLead: "Dissonant clusters, microtonal bends, reversed tones, FM-ish timbres.",
    effects: "Granular, bitcrush, extreme modulation, resampling, feedback.",
    arrangement: "Non-repeating, collage-like, abrupt cuts, evolving textures.",
    transitions: "Abrupt cuts, noise bursts, sudden silence.",
    firstMove: "Resample a sound, mangle it, and build a rhythm from the artifacts.",
    commonMistake: "All chaos, no anchor — keep one stable reference for the ear.",
    referenceListening: ["Sound-design ideas", "How chaos stays musical", "Anchor elements", "Texture evolution"],
  },
  "dark-cinematic": {
    drumDensity: "Sparse but huge — impactful, spacious hits.",
    swing: "Patient, deliberate, often half-time.",
    kickSnareClapHat: "Impactful kicks, reverbed snares, sparse placement, deep toms.",
    rytm: "Cinematic impact hits, reverse cymbals, deep toms, sparse placement.",
    mpcSampling: "Minor string/choir chops, single-note motifs, atmospheric beds.",
    a4Bass: "Deep sustained sub, slow swells, menacing low drones.",
    a4ChordLead: "Drones, slow pad swells, dark single-note motifs, sub reinforcement.",
    effects: "Huge reverbs, risers, sub drops, distortion, reverse swells.",
    arrangement: "Tension/release, long builds, dynamic drops, score-like dynamics.",
    transitions: "Reverse swell + sub drop + reverb wash.",
    firstMove: "Set a dark drone + single motif, then engineer a slow build.",
    commonMistake: "Filling the space — cinematic power comes from restraint.",
    referenceListening: ["Use of space", "Build/release pacing", "Low-end weight", "Reverb size"],
  },
  "west-coast": {
    drumDensity: "Tight and punchy with a confident bounce.",
    swing: "Laid-back bounce, slight swing (~55%).",
    kickSnareClapHat: "Tight punchy kick/snare, clean hats, occasional claps.",
    rytm: "Tight analog kick/snare, crisp clean hats, punchy.",
    mpcSampling: "Funk chops/talkbox vibes; keep drums tight and arranged.",
    a4Bass: "Smooth melodic synth bass following the chords, groovy.",
    a4ChordLead: "Signature high portamento whiny lead, warm minor chords, funky stabs.",
    effects: "Portamento/glide, light chorus, smooth filtering, clean delay.",
    arrangement: "Strong melodic hooks, verse/hook, breakdowns, vocal space.",
    transitions: "Lead-glide pickup + clean drum fill.",
    firstMove: "Write the whiny portamento lead hook, then build bounce under it.",
    commonMistake: "Cluttered low end — keep bass smooth and drums tight.",
    referenceListening: ["Lead synth glide", "Bass-chord lock", "Drum tightness", "Bounce feel"],
  },
  "east-coast": {
    drumDensity: "Hard and tight with authority; dusty breaks.",
    swing: "Hard swing (~55–58%), aggressive pocket.",
    kickSnareClapHat: "Hard-hitting kick/snare, tight swung hats, dusty break layers.",
    rytm: "Reinforce the break with punchy analog drums + ghost notes.",
    mpcSampling: "Dark jazz/soul chops, minor & diminished colors, hard chops.",
    a4Bass: "Dark sub locked to kick; sometimes a sampled bassline.",
    a4ChordLead: "Sub reinforcement, occasional dark stab or filtered key.",
    effects: "Saturation, filtering, vinyl sim, tight delay throws.",
    arrangement: "Loop-driven verses, scratch hooks, drum breaks, hard intros.",
    transitions: "Hard drum break + filter cut into the verse.",
    firstMove: "Chop a dark loop, hard-swing the drums, and lock the verse.",
    commonMistake: "Too polished — keep it gritty and hard.",
    referenceListening: ["Drum hardness", "Loop darkness", "Break usage", "Hook delivery"],
  },
  "southern-bounce": {
    drumDensity: "Lively and syncopated, club energy.",
    swing: "Bouncy syncopation (~53–55%).",
    kickSnareClapHat: "Snappy claps, syncopated kicks, lively hats, hand-clap layers.",
    rytm: "Layered claps, syncopated kick programming, lively hat performance.",
    mpcSampling: "Chantable vocal chops, organ/brass stabs, call-and-response bits.",
    a4Bass: "Punchy synth/808 bass with bounce, syncopated rhythm.",
    a4ChordLead: "Catchy simple riffs, organ/brass stabs, chantable motifs.",
    effects: "Filter sweeps, claps with verb, vocal-chop FX, risers.",
    arrangement: "Chant hooks, call-and-response, energetic drops, breakdowns.",
    transitions: "Riser + clap build + vocal-chop callout.",
    firstMove: "Lock a syncopated kick/clap bounce, then add a chant hook.",
    commonMistake: "Static energy — bounce needs call-and-response dynamics.",
    referenceListening: ["Bounce/syncopation", "Hook chantability", "Clap layering", "Energy drops"],
  },
  "grimy-underground": {
    drumDensity: "Loop-heavy, raw, slightly sloppy on purpose.",
    swing: "Hard, raw (~55–57%).",
    kickSnareClapHat: "Overdriven kick/snare, crunchy hats, distorted breaks.",
    rytm: "Push analog drive, distort the drums, gritty parameter locks.",
    mpcSampling: "Resample to degrade; detuned dark/horror samples; hard chops.",
    a4Bass: "Distorted sub, gnarly and forward in the mix.",
    a4ChordLead: "Detuned dark motifs, overdriven filter resonance, dissonance.",
    effects: "Heavy distortion, bitcrush, aggressive filtering, noise.",
    arrangement: "Loop-heavy, abrupt, raw intros, minimal polish.",
    transitions: "Hard cut or a noise-burst slam.",
    firstMove: "Distort a dark loop and slam raw overdriven drums under it.",
    commonMistake: "Cleaning it up — grit is the aesthetic.",
    referenceListening: ["Distortion character", "Sample darkness", "Rawness", "Low-end grit"],
  },
  "soul-sample": {
    drumDensity: "Warm and supportive of the sample, tasteful swing.",
    swing: "Warm swing (~56–58%), soulful pocket.",
    kickSnareClapHat: "Warm punchy drums supporting the sample; tasteful swing.",
    rytm: "Warm supportive drums tuned to the sample's feel; ghost notes.",
    mpcSampling: "Chop & pitch soul/gospel vocals; time-stretch; filtered intro flip.",
    a4Bass: "Fingered/upright-style bass following the sample chords.",
    a4ChordLead: "Subtle pad to glue chops; bass that follows sample harmony.",
    effects: "Pitch shift, time-stretch, filtering, tape warmth, sidechain to vocal.",
    arrangement: "Sample flips, vocal-chop hooks, filtered intros, verse drops.",
    transitions: "Filter open + vocal-chop throw into the hook.",
    firstMove: "Flip the soul vocal into a hook, then build warm drums + bass.",
    commonMistake: "Bass clashing with the sample's own bass notes.",
    referenceListening: ["Chop musicality", "Pitch/stretch quality", "Bass-sample fit", "Vocal-chop hook"],
  },
  "minimalist-drum-machine": {
    drumDensity: "Sparse with deliberate space and dynamics.",
    swing: "Tight machine groove (~52–54%) with space.",
    kickSnareClapHat: "Pure drum-machine voices, sparse, strong groove.",
    rytm: "The star — craft every analog voice; perform mutes & p-locks.",
    mpcSampling: "Minimal layering; arrange via mutes; capture performance.",
    a4Bass: "One hypnotic repetitive analog bassline.",
    a4ChordLead: "One or two synth elements, motif-driven, slow evolution.",
    effects: "Subtle delay, light reverb, analog character, tasteful filtering.",
    arrangement: "Subtractive — mute/unmute, long evolving sections.",
    transitions: "Mute drop / unmute reveal; slow filter open.",
    firstMove: "Design one perfect drum groove + one bass, then perform mutes.",
    commonMistake: "Adding too many elements — minimalism is the point.",
    referenceListening: ["Groove quality", "Use of space", "Mute performance", "Slow evolution"],
  },
  "industrial-noise": {
    drumDensity: "Rigid mechanical pulse with abrasive noise bursts.",
    swing: "Straight, mechanical (~50%).",
    kickSnareClapHat: "Distorted metallic kicks, clanging snares, white-noise hats, found metal.",
    rytm: "Drive voices hard; design metallic/noise drums; p-lock grit per step.",
    mpcSampling: "Resample noise into rhythmic hits; chop metal; automate distortion.",
    a4Bass: "Overdriven square/sub bass, gritty and saturated.",
    a4ChordLead: "Atonal drones, detuned clusters, single ominous notes over noise.",
    effects: "Heavy distortion, overdrive, bitcrush, metallic delay, gated reverb.",
    arrangement: "Stark blocks, abrupt noise transitions, mechanical repetition.",
    transitions: "Noise-burst slam or sudden gated cut.",
    firstMove: "Build a rhythm out of resampled noise/metal hits, then add a sub.",
    commonMistake: "Harshness with no groove — keep the mechanical pulse locked.",
    referenceListening: ["Noise as rhythm", "Distortion design", "Mechanical pocket", "Use of silence"],
  },
  "jazz-hop": {
    drumDensity: "Live-feel, ride-driven, ghost-note rich.",
    swing: "Relaxed swing (~58–60%) with a breathing pocket.",
    kickSnareClapHat: "Brushed/soft kit, ride-feel hats, ghost snares, loose human swing.",
    rytm: "Soft brushed kit, ride-feel hats, ghost-note p-locks, gentle dynamics.",
    mpcSampling: "Chop jazz/Rhodes/horn samples; swing the grid; chord turnarounds.",
    a4Bass: "Walking upright-style bass, chord-tone movement, melodic.",
    a4ChordLead: "9th/11th/13th chords, ii–V–I motion, modal color, Rhodes stabs.",
    effects: "Warm tape, gentle room reverb, light sidechain, soft saturation.",
    arrangement: "Head/solo-like sections, chord turnarounds, breathing dynamics.",
    transitions: "Turnaround chord + soft ride fill.",
    firstMove: "Set a ii–V–i on the A4, write a walking bass, then add a brushed kit.",
    commonMistake: "Stiff drums under sophisticated harmony — the kit must swing.",
    referenceListening: ["Chord extensions", "Walking bass", "Drum swing/ghosts", "Turnarounds"],
  },
  "synth-modern": {
    drumDensity: "Detailed hats over a clean tuned low end. Half-time.",
    swing: "Mostly straight (~50–52%); detail in hat programming.",
    kickSnareClapHat: "Clean tuned 808, crisp claps, intricate hats, fills.",
    rytm: "Crisp claps/snares, intricate hats, retrig fills into drops.",
    mpcSampling: "Program hats/fills; arrange drops; automate sends.",
    a4Bass: "Melodic 808/sub with glide, doubled by a synth-bass layer.",
    a4ChordLead: "Glossy arps, supersaw-style stabs, emotive leads — the centerpiece.",
    effects: "Wide stereo, lush reverb/delay, sidechain pump, pitch automation.",
    arrangement: "Hook-first, big drops, arped builds, melodic breakdowns.",
    transitions: "Arp build + riser + sidechain swell into the drop.",
    firstMove: "Write the glossy synth hook first, then build drums + 808 around it.",
    commonMistake: "Cluttered mids — give the lead and 808 their own space.",
    referenceListening: ["Synth-lead hook", "Stereo width", "808 + synth-bass layer", "Drop impact"],
  },
  "abstract-instrumental": {
    drumDensity: "Loose, drifting, sparse-to-dense shifts.",
    swing: "Off-grid drift (~57–59%), intentional imperfection.",
    kickSnareClapHat: "Dusty broken kits, off-grid hits, texture over precision.",
    rytm: "Dusty off-grid kits, microtiming drift, evolving p-lock textures.",
    mpcSampling: "Resample & collage; chop loosely; automate filters.",
    a4Bass: "Warm wandering sub, melodic and unhurried, follows the chops.",
    a4ChordLead: "Lush evolving chords, reversed tones, ambient pads, melodic motifs.",
    effects: "Granular, filtering, tape, reverb washes, resampling, modulation.",
    arrangement: "Short evolving vignettes, non-repeating, beat-tape style.",
    transitions: "Filter wash + tape-stop into the next vignette.",
    firstMove: "Loop a lush chord collage and let warm drums drift under it.",
    commonMistake: "No anchor at all — keep one recurring motif for cohesion.",
    referenceListening: ["Texture evolution", "Chord lushness", "Drum looseness", "Collage flow"],
  },
  "memphis-dark": {
    drumDensity: "Loop-driven, hypnotic, lo-fi grit. Half-time.",
    swing: "Half-time drag (~51–53%), cassette-warped.",
    kickSnareClapHat: "Distorted 808 kick, sharp cassette snares, fast dark hats, cowbell.",
    rytm: "Distorted 808 + sharp snares, fast dark hats, cowbell, gritty p-locks.",
    mpcSampling: "Resample to cassette-degrade; chop eerie bells/vocals.",
    a4Bass: "Distorted 808 sub, simple menacing root movement, saturated.",
    a4ChordLead: "Detuned bells, minor cassette melodies, eerie organ/vox color.",
    effects: "Cassette/tape degradation, bitcrush, distortion, dark reverb.",
    arrangement: "Loop-driven, hypnotic repetition, sparse changes, lo-fi grit.",
    transitions: "Tape-warble dip or a simple drum cut.",
    firstMove: "Detune an eerie bell melody, degrade it, and slam a distorted 808 under it.",
    commonMistake: "Too hi-fi — the cassette degradation is the vibe.",
    referenceListening: ["Cassette/tape grit", "Bell melody darkness", "808 distortion", "Hypnotic repetition"],
  },
};

/* ============================================================= COMPOSITION */
export const COMPOSITION = {
  scales: [
    { name: "Major", formula: "W–W–H–W–W–W–H", degrees: "1 2 3 4 5 6 7", mood: "Bright, resolved, uplifting.", use: "Soulful/feel-good flips; use sparingly in dark hip-hop." },
    { name: "Natural Minor (Aeolian)", formula: "W–H–W–W–H–W–W", degrees: "1 2 b3 4 5 b6 b7", mood: "Dark, serious — the hip-hop default.", use: "Works for almost any substyle; safe starting point." },
    { name: "Harmonic Minor", formula: "W–H–W–W–H–W½–H", degrees: "1 2 b3 4 5 b6 7", mood: "Exotic, tense, cinematic.", use: "Dark cinematic, trap melodies, dramatic leads." },
    { name: "Melodic Minor (asc.)", formula: "W–H–W–W–W–W–H", degrees: "1 2 b3 4 5 6 7", mood: "Sophisticated, jazzy minor.", use: "Jazz-hop lines and walking bass color." },
    { name: "Dorian", formula: "W–H–W–W–W–H–W", degrees: "1 2 b3 4 5 6 b7", mood: "Cool minor with a hopeful 6th.", use: "Boom bap, west coast, lo-fi grooves." },
    { name: "Phrygian", formula: "H–W–W–W–H–W–W", degrees: "1 b2 b3 4 5 b6 b7", mood: "Spanish/menacing, very dark.", use: "Dark trap, memphis, cinematic tension." },
    { name: "Minor Pentatonic", formula: "—", degrees: "1 b3 4 5 b7", mood: "Safe, bluesy, no clashes.", use: "Quick hooks/leads — every note works over minor." },
  ],
  keyMoods: [
    { mood: "Dark / menacing", pick: "Minor or Phrygian, lower keys (e.g. F minor, C# minor)." },
    { mood: "Sad / nostalgic", pick: "Natural minor with 9th chords; lo-fi/soul." },
    { mood: "Cool / confident", pick: "Dorian; west coast & boom bap." },
    { mood: "Tense / cinematic", pick: "Harmonic minor / Phrygian." },
    { mood: "Warm / soulful", pick: "Major or Dorian with extended chords." },
  ],
  triads: [
    { name: "Major", recipe: "1 – 3 – 5", sound: "Happy/stable" },
    { name: "Minor", recipe: "1 – b3 – 5", sound: "Sad/dark" },
    { name: "Diminished", recipe: "1 – b3 – b5", sound: "Tense/unstable" },
    { name: "Augmented", recipe: "1 – 3 – #5", sound: "Dreamy/uneasy" },
    { name: "Sus2", recipe: "1 – 2 – 5", sound: "Open/ambiguous" },
    { name: "Sus4", recipe: "1 – 4 – 5", sound: "Suspended/wanting" },
  ],
  sevenths: [
    { name: "Minor 7 (m7)", recipe: "1 – b3 – 5 – b7", sound: "Smooth, jazzy, the hip-hop staple" },
    { name: "Major 7 (maj7)", recipe: "1 – 3 – 5 – 7", sound: "Lush, dreamy, soulful" },
    { name: "Dominant 7 (7)", recipe: "1 – 3 – 5 – b7", sound: "Bluesy, wants to resolve" },
    { name: "Minor 9 (m9)", recipe: "1 – b3 – 5 – b7 – 9", sound: "Rich, moody, lo-fi/soul" },
    { name: "Half-diminished (m7b5)", recipe: "1 – b3 – b5 – b7", sound: "Dark, jazzy tension" },
  ],
  progressions: [
    { name: "Minor vamp", roman: "i – VI", vibe: "Hypnotic, dark, modern.", genres: "trap, memphis, dark", device: "A4 chords or sampled" },
    { name: "Sad classic", roman: "i – VI – III – VII", vibe: "Emotional, nostalgic.", genres: "lo-fi, soul, boom bap", device: "A4 / chopped sample" },
    { name: "Tension loop", roman: "i – iv – i – V", vibe: "Restless, cinematic.", genres: "dark cinematic, trap", device: "A4 pads" },
    { name: "Jazz turnaround", roman: "ii – V – i", vibe: "Sophisticated, smooth.", genres: "jazz-hop, soul", device: "A4 extended chords" },
    { name: "Andalusian", roman: "i – VII – VI – V", vibe: "Descending, dramatic.", genres: "cinematic, memphis", device: "A4 / sample" },
    { name: "Soulful lift", roman: "ii – V – I", vibe: "Warm, resolved, gospel.", genres: "soul, jazz-hop", device: "A4 maj7/9 chords" },
    { name: "Dorian groove", roman: "i – IV", vibe: "Cool, funky, hopeful-minor.", genres: "west coast, boom bap", device: "A4 stabs" },
    { name: "Two-chord trap", roman: "i – v", vibe: "Minimal, menacing.", genres: "trap, synth-modern", device: "A4 / bells" },
  ],
  harmonyMoves: [
    { name: "Modal mixture", what: "Borrow a chord from the parallel key.", why: "Adds unexpected color to a simple loop.", how: "In minor, drop in a bVI or bVII from the parallel major.", simple: "Add a bVII before returning to i.", advanced: "Swap the iv for a IV (Dorian color) on the hook." },
    { name: "Secondary dominant", what: "Use the V of a chord that isn't the tonic.", why: "Creates a strong pull toward the next chord.", how: "Before chord X, play the dominant 7 a 5th above X.", simple: "Add a V7 before the VI.", advanced: "Chain two secondary dominants for a longer pull." },
    { name: "Chromatic mediant", what: "Jump to a chord a 3rd away sharing one tone.", why: "Filmic, surprising shift without a key change.", how: "From C minor, move to Ab major or E major.", simple: "One chromatic-mediant chord at the hook.", advanced: "Alternate two mediant-related chords as the loop." },
    { name: "Altered dominant color", what: "Add b9/#9/#11 to a dominant.", why: "Dark jazzy tension before resolving to minor.", how: "Voice a 7#9 before the i chord.", simple: "Add a #9 on top of an existing 7 chord.", advanced: "Full altered voicing leading to a minor 9." },
    { name: "Chord inversions", what: "Put a non-root note in the bass.", why: "Smoother voice leading and a melodic bassline.", how: "Use the 3rd or 5th in the bass between chords.", simple: "Invert one chord so the bass steps by a 2nd.", advanced: "Voice-lead so only the top note moves." },
    { name: "Sparse voicings", what: "Play fewer notes per chord.", why: "Leaves room for drums, bass, and vocals.", how: "Root + b7 + 9, or just 3rd + 7th (shell).", simple: "Drop the 5th from every chord.", advanced: "Shell voicings (3rd & 7th only) for boom bap/lo-fi." },
  ],
  basslineTips: [
    "Start from chord roots — guaranteed to fit the harmony.",
    "Lock the bass rhythm to the kick for pocket.",
    "Add a passing 5th or octave right before a chord change.",
    "Leave space — the bass shouldn't restate every chord move.",
    "If a root clashes with a sampled bass note, follow the sample.",
    "For 808s: choose sustain OR movement, not both at once.",
  ],
  counterpointRules: [
    "Two busy lines at once = mush. Trade space (call and response).",
    "Move the counterline when the hook holds; rest it when the hook moves.",
    "Contrary motion (one up, one down) maximizes independence.",
    "Keep lines in different registers and timbres so the ear separates them.",
    "Mostly chord tones; one passing tone is plenty of spice.",
  ],
};

/* ============================================================= GROOVE */
export const GROOVE: { patterns: GroovePattern[]; concepts: any[]; troubleshooting: string[] } = {
  patterns: [
    {
      id: "gp-boombap", name: "Boom Bap Skeleton", genre: "boom-bap", feel: "Swung 16ths, behind the beat",
      kick: "x.....x...x.....", snare: "....x.......x...", hat: "x.x.x.x.x.x.x.x.", perc: "................",
      swingNote: "Swing hats ~58%; nudge the snare a hair late for pocket.",
      variants: { safe: "Straighten hats, keep kick/snare.", bouncy: "Add a ghost kick on the 'a' of beat 2.", experimental: "Swing to 62% and add an off-grid open hat." },
    },
    {
      id: "gp-trap", name: "Trap Half-Time", genre: "trap", feel: "Straight, half-time, busy hats",
      kick: "x......x..x.....", snare: "........x.......", hat: "xxxxxxxxxxxxxxxx", perc: "............xxx.",
      swingNote: "Keep straight; groove from hat rolls + triplet bursts.",
      variants: { safe: "Halve the hats to 1/8 for space.", bouncy: "Add a syncopated 808 kick on the 'and' of 3.", experimental: "Triplet hat roll across beat 4 with a retrig." },
    },
    {
      id: "gp-lofi", name: "Lo-Fi Wobble", genre: "lofi", feel: "Loose swing, soft, drifting",
      kick: "x.......x.x.....", snare: "....x.......x...", hat: "x..x.x..x..x.x..", perc: "..............x.",
      swingNote: "Swing ~60% with slight timing drift; low velocities.",
      variants: { safe: "Tighten the swing a touch.", bouncy: "Add a soft ghost snare before beat 4.", experimental: "Detune the hats and nudge them off-grid." },
    },
    {
      id: "gp-westcoast", name: "West Coast Bounce", genre: "west-coast", feel: "Laid-back, confident bounce",
      kick: "x.....x.x.......", snare: "....x.......x...", hat: "x.x.x.x.x.x.x.x.", perc: "................",
      swingNote: "Light swing ~55%; keep drums tight and punchy.",
      variants: { safe: "Four-on-the-floor-ish kick for steadier bounce.", bouncy: "Syncopate the second kick later.", experimental: "Add a talkbox-style perc accent." },
    },
    {
      id: "gp-memphis", name: "Memphis Drag", genre: "memphis-dark", feel: "Half-time drag, gritty",
      kick: "x........x......", snare: "........x.......", hat: "x.x.x.x.x.x.x.x.", perc: "x...x...x...x...",
      swingNote: "Half-time; cowbell on quarters; degrade everything.",
      variants: { safe: "Drop the cowbell for a cleaner drag.", bouncy: "Add a second 808 kick before the snare.", experimental: "Fast 1/32 dark hat roll into the loop point." },
    },
    {
      id: "gp-minimal", name: "Minimal Machine Groove", genre: "minimalist-drum-machine", feel: "Tight, spacious",
      kick: "x.......x.......", snare: "....x.......x...", hat: "..x...x...x...x.", perc: "................",
      swingNote: "Tight ~53% swing; groove comes from space + dynamics.",
      variants: { safe: "Add a steady closed hat on off-beats.", bouncy: "Open hat on the last 16th of the bar.", experimental: "P-lock hat decay per step for evolving motion." },
    },
  ],
  concepts: [
    { name: "Straight vs swung 16ths", what: "The core pocket choice.", how: "Set quantize/swing globally on the MPC and microtime on the Rytm.", device: "mpc", simple: "Straight for trap/synth; ~58% swing for boom bap/lo-fi.", advanced: "Different swing on hats vs snare for a live feel." },
    { name: "Triplet hat movement", what: "Trap's signature hat motion.", how: "Switch hat steps to triplet timing or use Note Repeat triplets.", device: "rytm", simple: "One triplet burst per bar.", advanced: "Accelerating triplet→1/32 retrig into the drop." },
    { name: "3-against-2 polyrhythm", what: "A 3-step figure over 4/4.", how: "Loop a perc/hat figure every 3 sixteenths against a straight kick/snare.", device: "rytm", simple: "On a quiet shaker only.", advanced: "5-over-4 or 7-over-4 on a melodic blip." },
    { name: "Push/pull microtiming", what: "Human ahead/behind feel.", how: "Nudge selected Rytm steps early (push) or late (pull).", device: "rytm", simple: "Snare a hair late.", advanced: "Push hats, pull snare in the same bar." },
    { name: "Ghost notes", what: "Quiet in-between hits.", how: "Low-velocity snares/hats between the main hits.", device: "rytm", simple: "Two ghost snares per bar.", advanced: "Velocity-mod decay so ghosts are shorter too." },
    { name: "Hat probability / variation", what: "Non-repeating hats.", how: "Use trig conditions/variation so some hats don't play every loop.", device: "rytm", simple: "Mute one hat step every other bar by hand.", advanced: "Conditional trigs for evolving hat patterns." },
    { name: "Note Repeat rolls", what: "Played-in hat rolls/stutters.", how: "Hold Note Repeat at 1/16–1/32 and perform on the MPC.", device: "mpc", simple: "One held roll before the hook.", advanced: "Slide between divisions for dynamic rolls." },
    { name: "Track-mute groove testing", what: "Find the groove by subtraction.", how: "Mute/unmute drum elements in time to hear what's essential.", device: "mpc", simple: "Mute hats to test if kick/snare grooves alone.", advanced: "Perform a full mute arrangement and capture it." },
  ],
  troubleshooting: [
    "Groove feels stiff → add swing and a couple of ghost notes.",
    "Groove feels sloppy → reduce swing or tighten microtiming nudges.",
    "Hats feel robotic → add velocity variation or hat probability.",
    "No bounce → syncopate a second kick or push/pull the snare.",
    "Low end clashes → lock bass rhythm to the kick and leave gaps.",
    "Too busy → mute a layer; density should change by section.",
    "Loop feels flat after 8 bars → add a fill or a B-pattern variation.",
  ],
};

/* ============================================================= STUCK MODE */
export const STUCK_PRESETS: StuckPreset[] = [
  {
    id: "stuck-drum", label: "I need a drum idea",
    immediate: ["Start with a 2-bar kick/snare skeleton only", "Add swing before adding hats", "Reference the substyle's kick/snare/hat guidance"],
    deviceMoves: { mpc: "Lay the skeleton on its own track; set mute quantize for testing.", rytm: "Design kick+snare, then layer analog+sample; add ghost snares.", a4: "Stay out of the way — leave the low end for the kick/808 for now." },
    musicalAlternatives: ["Try a half-time feel", "Move the snare to beat 3 (trap) or keep 2 & 4 (boom bap)", "Swing the hats to ~58%"],
    arrangementMove: "Keep this as your Verse A drum pattern before building anything else.",
    mixMove: "Set kick and snare levels first; everything references them.",
    constraint: "Finish an 8-bar drum loop before designing new sounds.",
  },
  {
    id: "stuck-loop", label: "My loop is boring",
    immediate: ["Add one variation in bar 8", "Mute an element to create space", "Introduce a response phrase"],
    deviceMoves: { mpc: "Chop a duplicate sample into a response phrase for the hook.", rytm: "Add quiet ghost-snare lock trigs and nudge hats slightly late.", a4: "Add a one-note filtered bass movement every 4 bars." },
    musicalAlternatives: ["Reharmonize one chord", "Add a countermelody that answers the main line", "Filter-open the loop into the hook"],
    arrangementMove: "Remove the bass for bar 8 right before the hook for contrast.",
    mixMove: "Automate a short delay throw on the last snare of the loop.",
    constraint: "Commit to the 8-bar A section before making new sounds.",
  },
  {
    id: "stuck-hook", label: "My hook is weak",
    immediate: ["Make the hook contrast the verse (add/remove a layer)", "Simplify to one memorable motif", "Raise the energy by one notch"],
    deviceMoves: { mpc: "Bring in a chopped vocal/sample phrase that only plays in the hook.", rytm: "Open the hats / add a clap layer to lift hook energy.", a4: "Add the lead motif or a brighter chord voicing here only." },
    musicalAlternatives: ["Use a call-and-response between two sounds", "Lift the hook with a reharmonized chord", "Put the hook melody up an octave"],
    arrangementMove: "Reserve one element exclusively for the hook so it feels like an arrival.",
    mixMove: "Widen the hook (chorus/stereo) vs a more mono verse.",
    constraint: "The hook must differ from the verse by at least two elements.",
  },
  {
    id: "stuck-bass", label: "My bassline is not moving",
    immediate: ["Extract the bass from chord roots", "Lock the rhythm to the kick", "Add a passing note before chord changes"],
    deviceMoves: { mpc: "Confirm the bass rhythm sits in the kick's gaps, not on top of it.", rytm: "Make room — shorten the kick decay so the bass speaks.", a4: "Add a filter-envelope punch or a glide between two notes." },
    musicalAlternatives: ["Walk between roots with scale tones (jazz-hop)", "Add an octave jump on the turnaround", "Try a 5th before returning to the root"],
    arrangementMove: "Drop the bass entirely for one bar to make its return hit.",
    mixMove: "Keep the bass mono and below the chords' register.",
    constraint: "Bass plays root notes only until the loop grooves, then add motion.",
  },
  {
    id: "stuck-chop", label: "My sample chop needs variation",
    immediate: ["Re-slice on different transients", "Reverse one slice", "Pitch a slice for a melodic answer"],
    deviceMoves: { mpc: "Duplicate the chop to new pads and rearrange the slice order.", rytm: "Re-trigger a percussive chop slice as a rhythmic layer.", a4: "Double a chopped note with a sub for weight." },
    musicalAlternatives: ["Pitch the response chop a 3rd/5th", "Time-stretch a slice to half speed", "Stutter a single slice as a fill"],
    arrangementMove: "Use the original chop in the verse and the re-sliced version in the hook.",
    mixMove: "Filter the verse chop and open it up in the hook.",
    constraint: "Create the variation from the same source — keep tonal cohesion.",
  },
  {
    id: "stuck-contrast", label: "The verse and hook sound too similar",
    immediate: ["Remove an element in the verse", "Add an element only in the hook", "Change the drum density between them"],
    deviceMoves: { mpc: "Mute chords in the verse; unmute + add a chop in the hook.", rytm: "Sparser hats in the verse, fuller + claps in the hook.", a4: "Save the lead/bright chords for the hook only." },
    musicalAlternatives: ["Drop to half drums in the verse", "Reharmonize the hook", "Raise the hook melody an octave"],
    arrangementMove: "Engineer a clear energy step: verse = 3, hook = 5.",
    mixMove: "Verse more mono/filtered; hook wider and brighter.",
    constraint: "Verse and hook must differ by at least two elements.",
  },
  {
    id: "stuck-transition", label: "I need a transition",
    immediate: ["Add a one-bar drum fill", "Filter-sweep across the seam", "Drop everything for a beat before the change"],
    deviceMoves: { mpc: "Throw a delay/reverb tail on the last hit; perform a mute drop.", rytm: "Retrig snare/hat fill in the last bar before the change.", a4: "Open or close a filter across the transition bar." },
    musicalAlternatives: ["Reverse-cymbal riser", "Sub drop", "Vocal-chop callout into the hook"],
    arrangementMove: "Use the transition to signal the energy change that's coming.",
    mixMove: "Automate a riser's volume/filter to peak exactly on the downbeat.",
    constraint: "Pick one or two transition types per seam, not all of them.",
  },
  {
    id: "stuck-earcandy", label: "I need ear candy",
    immediate: ["Add a once-per-section detail", "Pan a small element off-center", "Add a reversed or filtered blip"],
    deviceMoves: { mpc: "Drop in a one-shot foley/vinyl crackle/vocal ad-lib.", rytm: "P-lock a perc voice's pitch/decay for a glitchy accent.", a4: "Add a slow LFO-modulated texture or a reversed pad swell." },
    musicalAlternatives: ["3-against-2 shaker figure", "A single grace-note lead lick", "An off-beat answer to the main motif"],
    arrangementMove: "Place ear candy at section starts to reward the listener.",
    mixMove: "Keep ear candy quiet and panned — felt, not front-and-center.",
    constraint: "One new detail per section repeat — don't add five at once.",
  },
  {
    id: "stuck-darker", label: "I need a darker sound",
    immediate: ["Switch to a minor/Phrygian scale", "Lower the key", "Detune a melodic element"],
    deviceMoves: { mpc: "Resample to degrade; low-pass and saturate the loop.", rytm: "Drive the analog voices harder; deepen the kick, darken hats.", a4: "Use Phrygian/harmonic-minor motifs; add overdrive + lower the cutoff." },
    musicalAlternatives: ["Add a b2 (Phrygian) tension note", "Use a diminished or m7b5 color", "Drop the melody an octave"],
    arrangementMove: "Strip to a sparse, ominous core and build tension slowly.",
    mixMove: "Roll off highs; add a dark reverb and subtle distortion.",
    constraint: "Change mood with one strong move (scale or saturation), not ten.",
  },
  {
    id: "stuck-bounce", label: "I need more bounce",
    immediate: ["Syncopate a second kick", "Add swing", "Add a clap layer"],
    deviceMoves: { mpc: "Test groove by muting hats — does kick/snare bounce alone?", rytm: "Push/pull microtiming; layer claps; lively syncopated kicks.", a4: "Make the bass bouncy and syncopated, locked to the kick." },
    musicalAlternatives: ["Call-and-response between drums and a stab", "Off-beat bass note", "Open hat on the last 16th"],
    arrangementMove: "Add a breakdown that strips to the bounce, then bring it back.",
    mixMove: "Punchy transients on kick/clap; light sidechain to the kick.",
    constraint: "Get the 2-bar groove bouncing before adding melody.",
  },
  {
    id: "stuck-finish", label: "I need to finish the arrangement",
    immediate: ["Pick an arrangement template", "Order your loops in Arrange mode", "Set an energy curve, no two sections equal"],
    deviceMoves: { mpc: "Use Track Mute to perform the arrangement, then capture it.", rytm: "Add fills before each section change.", a4: "Add filter/FX movement between sections." },
    musicalAlternatives: ["Add one new element each repeat", "Subtract before the drop", "Insert a short breakdown for relief"],
    arrangementMove: "Commit to a total length (e.g. 96 bars) and fill the timeline.",
    mixMove: "Do a rough balance pass once the structure is fixed.",
    constraint: "Finish the structure before perfecting any single sound.",
  },
  {
    id: "stuck-mix", label: "I need mix-prep decisions",
    immediate: ["Balance levels around kick + lead", "Check the mix in mono", "Carve frequency overlap"],
    deviceMoves: { mpc: "Resample external parts to audio; set static levels/pans.", rytm: "Tame clashing drum frequencies; control the kick's low end.", a4: "Keep bass mono and below the chords; high-pass pads off the sub." },
    musicalAlternatives: ["Mute anything that doesn't earn its place", "Simplify a busy section", "Give the lead its own register"],
    arrangementMove: "Make sure something changes every 4–8 bars before you mix.",
    mixMove: "Leave headroom (~-6 dB) and save notes for mastering.",
    constraint: "Mix-prep only — don't chase a final master now.",
  },
];

/* ============================================================= ARRANGEMENT TEMPLATES */
export const ARRANGEMENT_TEMPLATES = [
  {
    id: "tpl-short-instr", name: "64-bar Short Instrumental", genres: "all", totalBars: 64,
    sections: [
      { name: "Intro", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "none", melodicActivity: "motif", notes: "One element; set the mood." },
      { name: "Main A", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Full groove established." },
      { name: "Hook", bars: 16, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Peak energy; add the lead." },
      { name: "Main B", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Variation of A." },
      { name: "Outro", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad", notes: "Filter down and out." },
    ],
  },
  {
    id: "tpl-beat-tape", name: "96-bar Beat-Tape Arrangement", genres: "all", totalBars: 96,
    sections: [
      { name: "Intro", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "none", melodicActivity: "pad", notes: "Atmospheric open." },
      { name: "A", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "First idea." },
      { name: "Hook", bars: 16, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Main hook." },
      { name: "Breakdown", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad", notes: "Relief." },
      { name: "B (switch)", bars: 16, energy: 4, devices: ["mpc", "rytm", "a4"], drumDensity: "busy", bassActivity: "active", melodicActivity: "lead", notes: "Beat switch / new idea." },
      { name: "Hook 2", bars: 16, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Return, bigger." },
      { name: "Outro", bars: 16, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad", notes: "Long fade-out idea." },
    ],
  },
  {
    id: "tpl-rap-full", name: "120-bar Full Rap Arrangement", genres: "all", totalBars: 120,
    sections: [
      { name: "Intro", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "none", melodicActivity: "motif", notes: "Set mood; leave vocal space." },
      { name: "Hook 1", bars: 8, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Hook-first." },
      { name: "Verse 1", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Pull back for the rapper." },
      { name: "Hook 2", bars: 8, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Repeat hook." },
      { name: "Verse 2", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Variation." },
      { name: "Hook 3", bars: 8, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Hook." },
      { name: "Bridge", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad", notes: "Contrast / breakdown." },
      { name: "Verse 3", bars: 16, energy: 4, devices: ["mpc", "rytm", "a4"], drumDensity: "busy", bassActivity: "active", melodicActivity: "lead", notes: "Highest-energy verse." },
      { name: "Hook Out", bars: 16, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Final hooks + outro." },
      { name: "Outro", bars: 16, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad", notes: "Wind down." },
    ],
  },
  {
    id: "tpl-2v2h", name: "2-Verse / 2-Hook Structure", genres: "all", totalBars: 80,
    sections: [
      { name: "Intro", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "none", melodicActivity: "motif", notes: "Open." },
      { name: "Verse 1", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Verse." },
      { name: "Hook 1", bars: 8, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Hook." },
      { name: "Verse 2", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Variation." },
      { name: "Hook 2", bars: 8, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Hook." },
      { name: "Bridge", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad", notes: "Breather." },
      { name: "Outro", bars: 16, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad", notes: "Out." },
    ],
  },
  {
    id: "tpl-loop-underground", name: "Loop-Based Underground", genres: ["grimy-underground", "memphis-dark", "boom-bap", "east-coast"], totalBars: 64,
    sections: [
      { name: "Intro Loop", bars: 8, energy: 3, devices: ["mpc"], drumDensity: "sparse", bassActivity: "groove", melodicActivity: "motif", notes: "Raw loop, no polish." },
      { name: "Loop A", bars: 24, energy: 4, devices: ["mpc", "rytm", "a4"], drumDensity: "busy", bassActivity: "active", melodicActivity: "motif", notes: "Hypnotic main loop." },
      { name: "Break", bars: 8, energy: 2, devices: ["mpc"], drumDensity: "none", bassActivity: "sustained", melodicActivity: "motif", notes: "Drums out, sample only." },
      { name: "Loop B", bars: 24, energy: 4, devices: ["mpc", "rytm", "a4"], drumDensity: "busy", bassActivity: "active", melodicActivity: "motif", notes: "Loop returns harder." },
    ],
  },
  {
    id: "tpl-trap", name: "Trap Intro/Drop/Verse/Hook", genres: ["trap", "synth-modern", "memphis-dark"], totalBars: 96,
    sections: [
      { name: "Intro", bars: 8, energy: 2, devices: ["mpc", "a4"], drumDensity: "none", bassActivity: "none", melodicActivity: "motif", notes: "Melody only, no drums." },
      { name: "Hook (Drop)", bars: 16, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "808 + hats drop in." },
      { name: "Verse 1", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Half the drums; space for vocals." },
      { name: "Hook", bars: 16, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Hook." },
      { name: "Verse 2", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Variation; maybe a beat switch." },
      { name: "Hook Out", bars: 24, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Final hooks + outro." },
    ],
  },
  {
    id: "tpl-boombap", name: "Boom-Bap Intro/Verse/Hook/Outro", genres: ["boom-bap", "east-coast", "soul-sample", "jazz-hop"], totalBars: 88,
    sections: [
      { name: "Intro", bars: 8, energy: 2, devices: ["mpc"], drumDensity: "none", bassActivity: "none", melodicActivity: "motif", notes: "Filtered sample intro." },
      { name: "Verse 1", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Drums + bass + loop." },
      { name: "Hook", bars: 8, energy: 4, devices: ["mpc", "rytm", "a4"], drumDensity: "busy", bassActivity: "active", melodicActivity: "full", notes: "Scratch/chop hook." },
      { name: "Verse 2", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Variation." },
      { name: "Hook", bars: 8, energy: 4, devices: ["mpc", "rytm", "a4"], drumDensity: "busy", bassActivity: "active", melodicActivity: "full", notes: "Hook." },
      { name: "Break", bars: 8, energy: 2, devices: ["mpc", "rytm"], drumDensity: "busy", bassActivity: "none", melodicActivity: "none", notes: "Drum-only break." },
      { name: "Verse 3 / Outro", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "medium", bassActivity: "groove", melodicActivity: "motif", notes: "Out." },
    ],
  },
  {
    id: "tpl-cinematic", name: "Cinematic Build/Drop/Breakdown", genres: ["dark-cinematic", "experimental", "abstract-instrumental", "industrial-noise"], totalBars: 96,
    sections: [
      { name: "Atmosphere", bars: 16, energy: 1, devices: ["a4"], drumDensity: "none", bassActivity: "sustained", melodicActivity: "pad", notes: "Drone + single motif." },
      { name: "Build", bars: 16, energy: 3, devices: ["mpc", "rytm", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "motif", notes: "Add elements; riser." },
      { name: "Drop", bars: 16, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Impact; full weight." },
      { name: "Breakdown", bars: 16, energy: 2, devices: ["mpc", "a4"], drumDensity: "sparse", bassActivity: "sustained", melodicActivity: "pad", notes: "Tension release." },
      { name: "Drop 2", bars: 16, energy: 5, devices: ["mpc", "rytm", "a4"], drumDensity: "full", bassActivity: "active", melodicActivity: "full", notes: "Bigger return." },
      { name: "Outro", bars: 16, energy: 1, devices: ["a4"], drumDensity: "none", bassActivity: "sustained", melodicActivity: "pad", notes: "Fade to drone." },
    ],
  },
];

/* ============================================================= HEALTH RULES */
// Data only — evaluation lives in the UI, keyed by `id`.
export const HEALTH_RULES = [
  { id: "mood", label: "Track has a clear mood", weight: 1, fixDevice: "Pick a mood word and let it guide every sound choice.", fixMusical: "Choose a scale that matches the mood (minor/Phrygian for dark).", fixArrangement: "Keep only sections that serve the mood." },
  { id: "bpm", label: "BPM is chosen", weight: 1, fixDevice: "Set the master BPM on the MPC before sound design.", fixMusical: "Use the substyle's BPM range as a starting point.", fixArrangement: "Lock tempo before building sections." },
  { id: "key", label: "Key / scale is chosen", weight: 1, fixDevice: "Set pad/keyboard scale mode on MPC/A4.", fixMusical: "Default to natural minor if unsure.", fixArrangement: "Tune samples and 808 to the key." },
  { id: "drums", label: "Drum foundation exists", weight: 2, fixDevice: "Build a 2-bar kick/snare skeleton on the Rytm.", fixMusical: "Match drum feel to the substyle.", fixArrangement: "Establish the groove before melody." },
  { id: "bass", label: "Bassline exists", weight: 2, fixDevice: "Design an A4 bass locked to the kick.", fixMusical: "Extract the bass from chord roots.", fixArrangement: "Bass should anchor every full section." },
  { id: "hook", label: "There is a hook", weight: 2, fixDevice: "Write an A4 lead motif or a chopped-sample hook on the MPC.", fixMusical: "Keep the hook simple and memorable.", fixArrangement: "Give the hook its own dedicated element." },
  { id: "contrast", label: "Verse and hook contrast", weight: 1, fixDevice: "Mute/add elements between sections.", fixMusical: "Reharmonize or re-voice the hook.", fixArrangement: "Verse and hook should differ by 2+ elements." },
  { id: "transitions", label: "Transitions are present", weight: 1, fixDevice: "Add Rytm fills + A4 filter sweeps at the seams.", fixMusical: "Use risers / drops to signal changes.", fixArrangement: "Place a transition before each section change." },
  { id: "movement", label: "Something changes every 4–8 bars", weight: 1, fixDevice: "Add a lock-trig variation or a B-pattern.", fixMusical: "Introduce or remove one element per repeat.", fixArrangement: "Avoid long identical loops." },
  { id: "roles", label: "Devices have clear roles", weight: 1, fixDevice: "Rytm = drums, A4 = bass/melody, MPC = chops + arrangement.", fixMusical: "Keep each part in its own register.", fixArrangement: "Assign active devices per section." },
  { id: "overlap", label: "Low end isn't overcrowded", weight: 1, fixDevice: "High-pass pads/chops off the sub region.", fixMusical: "Bass and kick share the low end — give them gaps.", fixArrangement: "Don't stack multiple low elements in one section." },
  { id: "arrangement", label: "Rough arrangement captured", weight: 2, fixDevice: "Order loops in MPC Arrange mode.", fixMusical: "Plan an energy curve.", fixArrangement: "Use an arrangement template to finish the structure." },
  { id: "reference", label: "Compared to a reference track", weight: 1, fixDevice: "A/B your beat against the reference.", fixMusical: "Borrow the concept, never the audio.", fixArrangement: "Match the reference's energy curve, not its sounds." },
  { id: "review", label: "Feedback / review note saved", weight: 1, fixDevice: "Resample and bounce, then listen on phone speakers.", fixMusical: "Note what to improve next time.", fixArrangement: "Review after a short break for fresh ears." },
];

/* ============================================================= REFERENCE CHECKLIST */
export const REFERENCE_CHECKLIST = [
  { id: "rc-tempo", label: "Tempo estimate", hint: "Tap it out or estimate BPM and half-time feel." },
  { id: "rc-groove", label: "Groove / swing", hint: "Straight or swung? Behind or on the beat?" },
  { id: "rc-density", label: "Drum density", hint: "Sparse or busy? How do hats move?" },
  { id: "rc-kicksnare", label: "Kick / snare relationship", hint: "Where's the snare? How punchy is the kick?" },
  { id: "rc-bass", label: "Bass role", hint: "Sub, 808, melodic, or sampled? How active?" },
  { id: "rc-harmony", label: "Sample / chord role", hint: "Sampled loop, played chords, or both?" },
  { id: "rc-hook", label: "Hook device or sound", hint: "What carries the hook — vocal, lead, chop?" },
  { id: "rc-sections", label: "Section lengths", hint: "How long are intro/verse/hook?" },
  { id: "rc-transitions", label: "Transition types", hint: "Fills, sweeps, drops, throws?" },
  { id: "rc-effects", label: "Effects palette", hint: "Reverb size, delay, distortion, lo-fi?" },
  { id: "rc-width", label: "Stereo width", hint: "Wide or mono? What's panned?" },
  { id: "rc-lowend", label: "Low-end density", hint: "How much sub? Clean or saturated?" },
  { id: "rc-vocalspace", label: "Vocal space", hint: "Is there room left for a rapper/singer?" },
  { id: "rc-energy", label: "Arrangement energy curve", hint: "Where are the peaks and valleys?" },
  { id: "rc-borrow", label: "What to borrow conceptually", hint: "The feeling/approach to chase." },
  { id: "rc-avoid", label: "What NOT to copy", hint: "Stay original — never copy the audio." },
];

/* ============================================================= PRACTICE PROMPTS */
export const PRACTICE_PROMPTS = [
  { id: "pp-goal", label: "What is the main goal for this track?", placeholder: "e.g. finish a moody boom-bap beat-tape opener" },
  { id: "pp-deadline", label: "What is the deadline?", placeholder: "e.g. end of the week" },
  { id: "pp-stronger", label: "What 3 elements from your last track should be stronger?", placeholder: "e.g. drum swing, hook contrast, low-end clarity" },
  { id: "pp-ghost", label: "What reference / ghost track will you use?", placeholder: "Artist – Track (for feel only)" },
  { id: "pp-inspire", label: "What exact element from the reference inspires you?", placeholder: "e.g. the patient drum swing and tape warmth" },
  { id: "pp-feedback", label: "Where will feedback come from?", placeholder: "e.g. a producer friend, a Discord, fresh ears tomorrow" },
  { id: "pp-review", label: "What will you review after a break?", placeholder: "e.g. does the hook contrast the verse?" },
  { id: "pp-next", label: "What will you improve on the next track?", placeholder: "carry one lesson forward" },
];

/* ============================================================= SOURCE NOTES */
export const SOURCE_NOTES = [
  { id: "sn-clock", text: "MPC Live III sends MIDI clock + start/stop; the Elektrons receive clock/transport so the rig stays in sync from one master." },
  { id: "sn-trackmute", text: "MPC Live III Track Mute Mode supports muting tracks from pads with quantized mute timing — useful for testing musical combinations before building structure." },
  { id: "sn-arrange", text: "MPC Live III Arrange Mode provides a linear sequencer for recording MIDI/audio performances into a timeline and exporting/mixing down." },
  { id: "sn-qlink", text: "MPC Live III Q-Link controls, XY pad, and crossfader can be assigned to parameters and used to record automation performances." },
  { id: "sn-noterepeat", text: "MPC Live III Note Repeat retriggers a pad at selected timing divisions for played-in rolls and stutters." },
  { id: "sn-locktrig", text: "Analog Rytm MKII sequencing distinguishes note trigs from lock trigs; lock trigs allow parameter changes without triggering a note." },
  { id: "sn-microtiming", text: "Analog Rytm MKII supports per-step microtiming and retrig editing from trig operations for push/pull groove and rolls/fills." },
  { id: "sn-rytmvoice", text: "Analog Rytm MKII pairs an analog drum engine with sample playback per voice, enabling analog+sample layering." },
  { id: "sn-a4arch", text: "Analog Four MKII architecture includes oscillators, sub oscillator, noise generator, ladder and multimode filters, amp, envelopes, LFOs, and sends to chorus/delay/reverb." },
  { id: "sn-a4ext", text: "Analog Four MKII can process external audio through its input/FX path, acting as an analog filter/FX unit for outboard sources." },
  { id: "sn-roman", text: "Chord-progression cheat sheets use Roman numerals so progressions are key-independent and transposable." },
  { id: "sn-scalemap", text: "Scale mapping and chord voicing/inversion techniques can quickly generate basslines, hooks, and chord variations." },
  { id: "sn-advharmony", text: "Advanced harmony references cover modal mixture, secondary dominants, chromatic mediants, and altered dominants as color tools." },
  { id: "sn-polyrhythm", text: "Polyrhythm material covers cross-rhythms like 3:2, 5:4, and 7:4 layered over a steady pulse." },
  { id: "sn-counterpoint", text: "Counterpoint/Fux principles emphasize independence of lines, contrary motion, and avoiding two busy lines at once." },
  { id: "sn-workflow", text: "Production workflow should move from concept, sound selection, idea development, arrangement, initial mix, benchmarking/feedback, final mix/master, and review." },
  { id: "sn-speedwrite", text: "Speed-writing guidance favors committing to a seed and an 8-bar loop quickly before deep sound design." },
];

/* Convenience: unique category list for the knowledge browser, in display order. */
export const KNOWLEDGE_CATEGORIES: string[] = [
  "Project Setup and Clocking",
  "MIDI Routing and Sync",
  "MPC Arranging and Recording",
  "MPC Sampling and Chop Workflow",
  "MPC Track Mute / Pad Mute Performance",
  "MPC Q-Link / XY / Crossfader / Pad Grid Macros",
  "Rytm Drum Programming",
  "Rytm Sound Design",
  "Rytm Parameter Locks and Lock Trigs",
  "Rytm Microtiming / Retrigs / Fills",
  "Analog Four Bass Design",
  "Analog Four Chords / Pads / Stabs",
  "Analog Four Leads / Hooks / Countermelodies",
  "Analog Four Modulation / Envelopes / LFO",
  "Analog Four FX Track / External Processing",
  "Scale and Key Mapping",
  "Chord Construction",
  "Chord Progression Development",
  "Advanced Harmony",
  "Polyrhythm and Groove Design",
  "Song Inspiration / Concept Development",
  "Workflow / Speed-Writing / Completion",
  "Arrangement / Transitions / Energy Management",
  "Mix-Prep / Export / Review",
];
