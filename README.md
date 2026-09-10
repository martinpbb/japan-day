# Japan Day Chýně

JSON-driven React/Vite event website for **Japan Day Chýně — Festival japonské kultury, gastronomie a tradic**.

## Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build runs Vite and then generates static SEO route documents, `sitemap.xml`, and `robots.txt`.

## Content without component edits

- `src/data/site.json` — event identity, date, venue, high-level copy, navigation, video, practical information and contact placeholders
- `src/data/seo.json` — canonical routes, SEO titles/descriptions, social preview configuration and semantic topic guidance
- `src/data/program.json` — programme
- `src/data/performers.json` — performer profiles
- `src/data/gastronomy.json` — food and drink
- `src/data/exhibitors.json` — exhibitors and sellers
- `src/data/gallery.json` — previous-year photographs
- `src/data/partners.json` — organisers, partners and patronage

## SEO routes

- `/`
- `/program`
- `/ucinkujici`
- `/gastronomie`
- `/vystavovatele`
- `/prakticke-informace`
- `/galerie`
- `/o-akci`
- `/kontakt`

See `docs/seo/SEO_STRATEGY.md`.

## Images

Add final assets to:

- `public/images/performers/`
- `public/images/gallery/`
- `public/images/partners/`
- `public/images/social/`

The current social preview is a temporary 1200 × 630 placeholder. Replace it before launch while preserving the filename.

## YouTube

Put only the video ID in `src/data/site.json`:

```json
"youtubeId": "abc123XYZ"
```

The iframe is created only after the visitor clicks the video thumbnail.

## AI development support

Repository AI guidance is prepared for Codex and GitHub Copilot:

- `AGENTS.md` — authoritative repository rules
- `.github/copilot-instructions.md` — Copilot bridge
- `.github/instructions/` — scoped frontend/content/SEO/security/deployment/Graphify rules
- `.agents/skills/japanese-day-handoff/` — reusable handoff skill
- `docs/ai/` — workflow, context/cost, Graphify, and handoff documentation
- `docs/codex/tasks/` — authoritative implementation tasks
- `docs/notes/` — concise implementation/handoff notes

Useful commands:

```powershell
npm run ai:state
npm run ai:validate
```

### Graphify

Graphify is optional development tooling for cross-file dependency and blast-radius analysis.

```powershell
./scripts/ai/setup-graphify.ps1 -BuildGraph
```

The generated `graphify-out/` directory is ignored by Git. Agents should query Graphify narrowly and then verify returned source files rather than loading the raw graph into context.
