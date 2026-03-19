# GitHub Copilot — Repository Instructions (Pokemon Team Builder)

> **Scope**: Repo‑wide rules for **Copilot Chat** in VS Code and on GitHub.  
> **Goal**: Help Copilot generate correct, consistent code and content for a **SvelteKit (static)** Pokémon Team Builder with a prebuilt data layer, top‑tier performance, licensing compliance, and a clean path to future AI features.

---

## 0) TL;DR for Copilot

- **Framework**: Use **SvelteKit + adapter‑static** (no React). All UI examples in **Svelte + TypeScript**.  
- **Styling**: **Tailwind CSS** utilities; avoid heavy component libs.  
- **Language**: **TypeScript (strict)** everywhere.  
- **Data**: Read from prebuilt **versioned JSON** bundles (species, moves, abilities, learnsets, items, natures, types). **Never scrape at runtime**.  
- **Features to support**: team editor (species/form/item/ability/moves), **EV/IV/nature**, legality checks, **type coverage**, **Showdown import/export**, offline (SW + IndexedDB).  
- **i18n**: English + Spanish. **Don’t hardcode text** in components—use dictionaries.  
- **A11y**: Keyboardable UI, proper roles/labels, color‑contrast, `prefers-reduced-motion`.  
- **Testing**: Vitest (unit), Playwright (e2e).  
- **Perf**: lazy‑load datasets; use Web Workers for heavy compute (e.g., damage calc) and keep bundles small.

If instructions conflict, prefer **SvelteKit + Tailwind + TypeScript** and **static generation** conventions defined here.

---

## 1) Project Context

- **App**: Responsive **static** Pokémon Team Builder (SPA) with offline use.  
- **Stack**: SvelteKit (`adapter-static`), TypeScript, Tailwind, Vite.  
- **Hosting**: GitHub Pages.  
- **Core datasets** (prebuilt JSON; loaded at runtime):
  - `species.json` (id, slug, names {en, es}, types, baseStats, abilities, forms, eggGroups…)
  - `moves.json` (id, type, category, power, accuracy, pp, flags, priority, target)
  - `abilities.json` (id, name {en, es}, shortEffect)
  - `learnsets.json` (per species, per gen, acquisition: level/tm/tutor/egg → move ids)
  - `items.json` (competitive items with effects)
  - `natures.json` (25 natures: up/down stats + localized names)
  - `types.json` (18×18 matchup matrix)

**Never fabricate data.** If a field is missing, add a `// TODO(data):` note and surface a non‑blocking UI message.

---

## 2) Code & Architecture Conventions

### 2.1 SvelteKit
- Use **+page.svelte / +page.ts / +layout.svelte**; colocate component code under `src/lib`.  
- Keep components small and **pure** (derive state from stores/props).  
- Use **Svelte stores** for cross‑page state (`teamStore`, `filtersStore`, `datasetStore`).  
- Prefer **immutable updates** and **derived stores** (e.g., computed coverage grid).

### 2.2 TypeScript standards
- Enable strictness: `strict`, `noImplicitAny`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.  
- Type all public functions. Export **types** from `src/lib/types` (e.g., `Species`, `Move`, `Learnset`, `Team`, `NatureId`, `StatId`).  
- Avoid `any`; use **discriminated unions** and **enums as string unions** (not numeric enums).

### 2.3 Styling with Tailwind
- Use utility classes; prefer composition via `@apply` only for repeated patterns.  
- Define tokens (spacing, radius, colors) in `tailwind.config.js`.  
- Support **dark mode** with class strategy; respect `prefers-color-scheme`.

### 2.4 Data access
- Implement a small **dataset loader**:
  - Lazy‑load JSON bundles on demand.
  - Validate with Zod (or similar) once per version and cache in IndexedDB.
  - Expose **pure functions**: `getSpeciesById`, `getLearnset(speciesId)`, `isMoveLearned(speciesId, moveId, gen)`, etc.
- Keep **format validators** pure and side‑effect free so they can run in Web Workers.

### 2.5 Performance & offline
- Code‑split routes; defer non‑critical JSON until needed.  
- Use a **Service Worker** to cache `manifest.json` + datasets.  
- Offload expensive computations (e.g., damage calc, mass legality scans) to **Web Workers**.

---

## 3) Feature Requirements (what to build/generate)

1) **Team editor (6 slots)**  
   - Select species/form → pick item, ability, **4 moves**.  
   - **EV/IV editors** with 510 cap, 252 per stat; **nature** selection applying ±10% to the correct stats.  
2) **Legality checks**  
   - Flag illegal moves/abilities/forms per gen/format using `learnsets.json` and rules module.  
3) **Coverage analysis**  
   - Defensive grid (stacked resist/weak counts by type) + **offensive coverage** based on chosen moves.  
4) **Import/Export**  
   - Parse and serialize **Pokémon Showdown** team text (lossless round‑trip).  
5) **Persistence**  
   - IndexedDB for teams, recent species, and last dataset hash.  
6) **Internationalization**  
   - English + Spanish strings in a lightweight i18n layer; no hardcoded UI strings.  
7) **Accessibility**  
   - Fully keyboard navigable: roving tab index where appropriate; visible focus; ARIA roles/labels; color contrast ≥ WCAG AA; honor `prefers-reduced-motion`.

---

## 4) Data & Licensing Rules (must‑follow)

- The ETL **prebuilds textual facts** from permitted sources; **do not** fetch or scrape at runtime.  
- **WikiDex textual content** is **CC‑BY‑SA 3.0**: keep attribution and **share‑alike** in `/data/LICENSE` and the app **/credits** page. **Do not bundle WikiDex images** (typically fair use only).  
- If we also include **PokéAPI** facts, it’s **BSD‑3‑Clause**; keep its notice.  
- Always show a **trademark disclaimer** (“Pokémon and related names are trademarks of Nintendo, etc.”).  
- Any code Copilot generates that embeds content must honor these licenses; otherwise, produce placeholders and a TODO.

> If unsure about license scope, prefer referencing existing fields in our JSON and **avoid copying prose** into the UI. Link to source instead.

---

## 5) Security, Privacy, Compliance

- **No PII** collection.  
- Do **not** add client‑side scraping or remote fetches to third‑party wikis.  
- Sanitize all user‑pasted **Showdown** text; never execute it.  
- Treat dataset URLs as **same‑origin** only; no remote code execution.  
- Avoid prompt‑injection vectors in any future AI endpoints: validate inputs and block file/network side effects unless explicitly allowed.

---

## 6) Testing & Quality

- **Vitest** for unit tests (pure validation, parsing, coverage math).  
- **Playwright** for e2e (team flow, import/export, offline behavior).  
- Minimum coverage: 85% for core pure modules (parsers, validators).  
- Use **Conventional Commits** (`feat:`, `fix:`, `refactor:`) and keep PRs < 400 lines diff unless justified.

---

## 7) Preferred Libraries / Utilities

- **Type validation**: Zod (or native TS + runtime guards).  
- **State**: Svelte stores.  
- **Storage**: idb-keyval (or small wrapper).  
- **Testing**: Vitest + Playwright.  
- **Formatting**: Prettier; lint with ESLint (Svelte + TS).  
- Keep dependencies lean; avoid heavyweight UI frameworks.

---

## 8) README Maintenance

`README.md` in the repo root **must be kept up to date** at all times. Whenever you add, remove, or change any of the following — prerequisites, scripts, environment variables, VS Code configuration, or project structure — update `README.md` in the same commit/PR.

### 8.1 Required README structure

The README must contain these sections **in this order**:

```
# <Project Title>

> One‑line description of the app.

## Features
Bullet list of the main user‑facing features.

## Prerequisites
Exact versions or minimum versions for every tool that must be installed before the project can run:
- Node.js ≥ X.Y (specify LTS)
- pnpm X.Y (or npm/yarn with the exact command to enable it)
- Any other global tooling (e.g. Playwright browsers)

## Getting Started

### Installation
Step‑by‑step shell commands to clone and install dependencies.

### Environment variables
Table or list of every `.env` variable (name, default, purpose). If none: state "No environment variables required."

### Running locally
Commands to start the dev server and the URL to open.

### Building for production
Command to build + how to preview the static output.

## Running & Debugging in VS Code

### Recommended extensions
List the extension IDs from `.vscode/extensions.json` (if present).

### Launch configurations
Describe each entry in `.vscode/launch.json`:
- Name, what it does, any required preconditions (e.g. "dev server must be running").

### Tasks
Describe each entry in `.vscode/tasks.json` used for build, lint, or test.

## Testing
How to run unit tests (Vitest) and e2e tests (Playwright), including any setup steps.

## Project Structure
Short annotated directory tree of the most important folders/files.

## Credits & License
Trademark disclaimer + data‑source attributions (WikiDex CC‑BY‑SA 3.0, PokéAPI BSD‑3‑Clause, etc.).
```

### 8.2 README update rules

- **Never leave the README stale.** If a script name, port, or prerequisite version changes, update the README in the same diff.
- **Prerequisite versions must be exact** (e.g. `Node.js >= 20.11.0 LTS`), not vague ("install Node").
- **VS Code launch configs and tasks** must be documented whenever `.vscode/launch.json` or `.vscode/tasks.json` are created or modified.
- **Do not duplicate** content that lives in other files — link to them instead (e.g., link to `CONTRIBUTING.md`, `/data/LICENSE`).
- Keep the README under **300 lines**; move deep detail (architecture decisions, API reference) to `docs/`.

---

## 9) Patterns & Examples (generate code like this)

### 9.1 Team store (Svelte + TS)
```ts
// src/lib/stores/team.ts
import { writable, derived } from 'svelte/store';
import type { Team, TeamSlot } from '$lib/types';

const emptySlot: TeamSlot = { speciesId: null, formId: null, itemId: null, abilityId: null,
  natureId: 'jolly', evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, moves: [] };

export const team = writable<Team>({ slots: Array.from({ length: 6 }, () => structuredClone(emptySlot)) });

export const totalEVs = derived(team, ($t) =>
  $t.slots.reduce((sum, s) => sum + Object.values(s.evs).reduce((a, b) => a + b, 0), 0)
);
