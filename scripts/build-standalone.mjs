#!/usr/bin/env node
/**
 * Builds the single-file standalone version of Beatsmith.
 *
 * Compiles the TypeScript seed-data modules to CommonJS, extracts the data,
 * and injects it into standalone/template.html, producing
 * standalone/beatsmith.html — a fully offline app you can open by
 * double-clicking it in any browser.
 *
 * Usage: node scripts/build-standalone.mjs
 */
import { execSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = mkdtempSync(join(tmpdir(), "bts-data-"));

execSync(
  `npx tsc lib/substyles.ts lib/stages.ts lib/creativeOptions.ts lib/devices.ts lib/knowledge.ts ` +
    `--module commonjs --target es2020 --outDir ${out} --skipLibCheck`,
  { cwd: root, stdio: "inherit" }
);

const req = (await import("node:module")).createRequire(pathToFileURL(join(out, "x.js")));
const subs = req(join(out, "substyles.js"));
const stages = req(join(out, "stages.js"));
const opts = req(join(out, "creativeOptions.js"));
const devs = req(join(out, "devices.js"));
const kb = req(join(out, "knowledge.js"));

const data = {
  SUBSTYLES: subs.SUBSTYLES,
  STAGES: stages.STAGES,
  COMPLETION_CHECKLIST: stages.COMPLETION_CHECKLIST,
  CATEGORY_LABELS: stages.CATEGORY_LABELS,
  CREATIVE_OPTIONS: opts.CREATIVE_OPTIONS,
  DEFAULT_DEVICES: devs.DEFAULT_DEVICES,
  DEFAULT_ROUTING: devs.DEFAULT_ROUTING,
};

// Reference-grounded knowledge library (transformed guidance, no source excerpts).
const knowledge = {
  KNOWLEDGE: kb.KNOWLEDGE,
  KNOWLEDGE_CATEGORIES: kb.KNOWLEDGE_CATEGORIES,
  PLAYBOOKS: kb.PLAYBOOKS,
  GENRE_PROFILES: kb.GENRE_PROFILES,
  COMPOSITION: kb.COMPOSITION,
  GROOVE: kb.GROOVE,
  STUCK_PRESETS: kb.STUCK_PRESETS,
  ARRANGEMENT_TEMPLATES: kb.ARRANGEMENT_TEMPLATES,
  HEALTH_RULES: kb.HEALTH_RULES,
  REFERENCE_CHECKLIST: kb.REFERENCE_CHECKLIST,
  PRACTICE_PROMPTS: kb.PRACTICE_PROMPTS,
  SOURCE_NOTES: kb.SOURCE_NOTES,
};

const tpl = readFileSync(join(root, "standalone/template.html"), "utf8");
// "</" must be escaped so the JSON can never terminate the inline <script>.
const embed = (obj) => JSON.stringify(obj).replace(/<\//g, "<\\/");
const html = tpl
  .replace("/*__DATA__*/", embed(data))
  .replace("/*__KNOWLEDGE__*/", embed(knowledge));
writeFileSync(join(root, "standalone/beatsmith.html"), html);

console.log(
  `standalone/beatsmith.html written (${(html.length / 1024).toFixed(0)} KB) — ` +
    `${data.CREATIVE_OPTIONS.length} options, ${data.SUBSTYLES.length} substyles, ` +
    `${knowledge.KNOWLEDGE.length} knowledge items, ${knowledge.PLAYBOOKS.length} playbooks, ` +
    `${Object.keys(knowledge.GENRE_PROFILES).length} genre profiles`
);
