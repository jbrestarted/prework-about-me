# 🎛️ Beatsmith — MPC × Elektron Hip-Hop Production Copilot

A **local-first web app** that guides you through the complete hip-hop production
process on a hardware-centered setup:

- **Akai MPC Live III** — master clock, main sequencer, arranger, sampler & song hub
- **Elektron Analog Rytm MKII** — drums, percussion, fills, parameter locks, analog drum design
- **Elektron Analog Four MKII** — bass, chords, leads, pads, textures & analog melodic synthesis

It is **not** a generic note-taking app. It's a structured production assistant built around the
MPC-as-master-clock-and-arranger workflow, continuously answering _"what should I create next, on
which device, and what creative options could work?"_

---

## ✨ What it does

- **15-stage guided workflow** — Project Setup → Tempo/Groove → Reference → Drums → Bass → Harmony
  → Hooks → Texture → Effects → Arrangement → Performance Automation → Transitions → Mix Prep →
  Export → Final Review. Each stage gives you an objective, **per-device guidance** (MPC / Rytm / A4),
  creative option cards, an idea generator, a checklist, notes, and a "mark complete" control.
- **11 hip-hop substyles** with BPM ranges, groove feel, drum/bass/harmony characteristics, effects
  & arrangement tendencies, and device-specific suggestions (boom bap, trap, lo-fi, experimental,
  dark cinematic, west coast, east coast, southern bounce, grimy underground, soul sample-based,
  minimalist drum-machine).
- **Rule-based creative idea generator** — context-aware ideas based on substyle, stage, BPM, mood,
  active devices, and what you've already saved. Hit **Generate more** for endless variations.
- **166 seed creative options** (15+ per category) across drums, bass, chords, melody, samples,
  textures, effects, transitions, arrangement, performance automation, and mix prep — each with
  recommended device, difficulty, style fit, when-to-use, implementation steps, and variations.
- **Arrangement builder** — a visual energy-coded timeline plus per-section editors for bars, active
  devices, drum/bass/melody activity, energy, and notes on mutes/fills/drops/automation.
- **Hardware workflow planner** — editable device roles, MIDI channels, clock roles, audio routing,
  and pattern-to-song / performance-capture strategies. Everything is an **editable assumption**.
- **Song completion checklist** + **local persistence** + **JSON backup export/import**.

---

## 🧱 Tech stack

| Layer        | Choice                                   |
| ------------ | ---------------------------------------- |
| Framework    | Next.js 14 (App Router)                  |
| Language     | TypeScript (strict)                      |
| Styling      | Tailwind CSS (dark-mode-first)           |
| State / data | React Context + `localStorage` (no auth, no backend) |

---

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build             # production build (also type-checks)
npm run start             # serve the production build
npm run lint              # eslint
npm run build:standalone  # regenerate the single-file standalone app
```

> Requires Node 18+ (developed on Node 22).

### 📄 Standalone single-file version (no install needed)

Don't want to run Node? **`standalone/beatsmith.html`** is the entire app in one
file — open it by double-clicking it in any modern browser. It works fully
offline, persists projects to that browser's localStorage under the **same key
as the web app**, and its JSON backups are interchangeable with the web app's.

It is generated from the same TypeScript seed data (`lib/`) by
`scripts/build-standalone.mjs`; after changing substyles/stages/options, run
`npm run build:standalone` to refresh it. The UI shell lives in
`standalone/template.html`.

---

## 🗺️ Architecture overview

```
app/                         # Next.js App Router pages (all client components)
  page.tsx                   # Home / dashboard
  projects/                  # list · new · [id] overview
  projects/[id]/workflow     # the 15-stage guided workflow (centerpiece)
  projects/[id]/arrangement  # timeline + section editors
  projects/[id]/ideas        # idea generator + full creative library
  projects/[id]/hardware     # editable routing/clock/MIDI planner
  settings/                  # data export/import, default rig reference

components/                  # ProjectCard, StageStepper, ProductionStagePanel,
                             # DeviceGuidanceCard, CreativeOptionCard, IdeaGeneratorPanel,
                             # Checklist, ArrangementTimeline, ArrangementSectionEditor,
                             # HardwareRoutingPlanner, SongCompletionChecklist, NotesPanel,
                             # SubstyleSelector, ProjectSettingsForm, ProjectNav, ProjectGate, ui

lib/
  types.ts                   # strong domain types (Project, Device, ProductionStage,
                             #   CreativeOption, ArrangementSection, HipHopSubstyle,
                             #   ChecklistItem, HardwareRoutingProfile, …)
  substyles.ts               # 11 substyle definitions
  creativeOptions.ts         # 166 seed creative options (15+ per category)
  stages.ts                  # the 15 production stages + completion checklist
  devices.ts                 # default (editable) device profiles + routing
  ideaGenerator.ts           # rule-based, context-aware idea scoring/generation
  projectFactory.ts          # creates a fully-seeded project
  store.tsx                  # localStorage-backed React context (CRUD + cross-tab sync)
```

**Data flow:** `StoreProvider` (in `app/layout.tsx`) hydrates projects from `localStorage`, exposes
CRUD via `useStore()`, and re-persists on every change. Pages resolve a project through
`ProjectGate` (which handles the hydration window) and mutate it with `updateProject(id, updater)`.

**Persistence is intentionally swappable** — replacing the load/save functions in `lib/store.tsx`
with `fetch` calls or a SQLite-backed API route is the entire migration path to a server backend.

---

## 🔧 Design assumptions (all editable in-app)

These are **sensible defaults, not verified hardware specs.** The app never hard-codes hardware
behavior as fact — you can edit device capabilities, MIDI channels, clock roles, and routing per
project on the **Hardware** page.

- MPC Live III is the **master clock** and sends MIDI clock + start/stop.
- Rytm & A4 **receive** clock + transport (CLOCK/TRANSPORT receive on the Elektrons).
- MPC MIDI out → Rytm and A4 (default A4 on ch 1–4, Rytm on its Auto channel — verify your config).
- Rytm = drums; A4 = bass/melody; MPC = arranger + sampler + audio capture of the external gear.
- Default new-project BPM is the midpoint of the chosen substyle's range; swing uses the substyle
  default.

If your routing differs (USB vs DIN, different channels, A4 as clock, etc.), just edit it — the
guidance text and planner are data, not assumptions baked into code.

---

## 🛣️ Future enhancements

- **WebMIDI** — send real MIDI clock/transport and program changes to the hardware from the browser.
- **MIDI clock diagnostics** — verify sync, jitter, and latency between MPC and the Elektrons.
- **AI-assisted generation** — swap the rule-based generator for an LLM that proposes full
  patterns/progressions from the project context.
- **Sample library tagging** — catalog chops/one-shots/breaks with key/BPM/mood tags and surface
  them inside relevant stages.
- **Export templates** — generate stem/track naming sheets and session recall docs automatically.
- **SQLite / server sync** — optional account-based sync by swapping the persistence layer.

---

## 📦 Notes

The repository's previous static "About Me" page (`index.html`, `css/`, `img/`) is left untouched;
the Next.js app lives alongside it and is the active project.
