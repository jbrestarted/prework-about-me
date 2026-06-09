"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui";

const DEVICES = [
  { tag: "MPC Live III", role: "Master clock · arranger · sampler", cls: "text-mpc border-mpc/40 bg-mpc/10" },
  { tag: "Analog Rytm MKII", role: "Drums · percussion · fills", cls: "text-rytm border-rytm/40 bg-rytm/10" },
  { tag: "Analog Four MKII", role: "Bass · chords · leads · texture", cls: "text-a4 border-a4/40 bg-a4/10" },
];

export default function HomePage() {
  const { projects, hydrated } = useStore();
  const recent = projects.slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="card overflow-hidden p-0">
        <div className="bg-gradient-to-br from-ink-850 to-ink-900 p-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent-soft">
            Hip-hop production copilot
          </p>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-gray-50">
            From idea to arrangement to mix prep — guided for your MPC + Elektron rig.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">
            A structured, 15-stage workflow that tells you what to build next, what each
            device should do, and gives you endless context-aware creative options along the way.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/projects/new" className="btn-primary px-4 py-2.5 text-sm">
              ＋ Start a new beat
            </Link>
            <Link href="/projects" className="btn-ghost px-4 py-2.5 text-sm">
              View projects
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {DEVICES.map((d) => (
              <div key={d.tag} className={`rounded-xl border p-3.5 ${d.cls}`}>
                <div className="text-sm font-semibold">{d.tag}</div>
                <div className="mt-0.5 text-xs text-gray-400">{d.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent projects */}
      <section>
        <SectionHeading
          title="Recent projects"
          subtitle="Pick up where you left off"
          right={
            <Link href="/projects" className="btn-subtle px-2 py-1 text-xs">
              All projects →
            </Link>
          }
        />
        {!hydrated ? (
          <div className="py-10 text-center text-sm text-gray-500">Loading…</div>
        ) : recent.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 px-6 py-12 text-center">
            <div className="text-4xl">🎚️</div>
            <h3 className="text-base font-semibold text-gray-200">No projects yet</h3>
            <p className="max-w-md text-sm text-gray-400">
              Create your first production and the copilot will guide you stage by stage.
            </p>
            <Link href="/projects/new" className="btn-primary mt-1 px-4 py-2 text-sm">
              ＋ Start a new beat
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section>
        <SectionHeading title="How it works" subtitle="A complete production, broken into clear moves" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { n: "01", t: "Set the target", b: "Pick a substyle, BPM, key, and mood. The app seeds smart defaults for your rig." },
            { n: "02", t: "Work the stages", b: "15 guided stages from drums to mix prep — each with per-device actions and idea cards." },
            { n: "03", t: "Arrange & finish", b: "Build sections on the timeline, capture performances, and run the completion checklist." },
          ].map((s) => (
            <div key={s.n} className="card p-5">
              <div className="mb-2 font-mono text-xs text-accent-soft">{s.n}</div>
              <h3 className="mb-1 text-sm font-semibold text-gray-100">{s.t}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{s.b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
