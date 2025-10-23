# KRINHJ Portfolio Folder Structure (v1.0)

This document outlines how the portfolio repository is organized. Use it as the source of truth when adding new modules, assets, or documentation.

---

## Top-Level Layout

```
krinhj.github.io/
  docs/                 # Product and design documentation
  public/               # Static assets (audio, icons, favicons, etc.)
  src/                  # React + TypeScript source
  README.md             # Project overview and instructions
  package.json          # npm scripts and dependency manifest
  package-lock.json     # npm lockfile
  tsconfig*.json        # TypeScript configuration files
  vite.config.ts        # Vite build configuration
```

Keep project assets and source code within these directories. Avoid creating parallel `apps/` or `services/` folders - this is a single-page React app.

---

## `src/`

```
src/
  assets/               # Screenshots, imagery, and shared media
  components/
    CLI/                # Terminal interface and command handling
    Effects/            # Visual effects (background, boot sequence, transitions)
    Portfolio/          # Portfolio sections (hero, about, projects, etc.)
    UI/                 # Shared modals and neon primitives
  data/                 # Structured content (projects, experiences, strengths, etc.)
  pages/                # Route components for terminal and portfolio modes
  App.css               # Global font imports and motion preferences
  App.tsx               # Router configuration
  index.css             # Design tokens, Tailwind layers, custom utilities
  index.tsx             # Root render
  main.tsx              # Application bootstrap
```

Guidelines:
- Keep each component folder cohesive (UI, logic, local styles). Add tests alongside components if introduced (`Component.test.tsx`).
- Centralize reusable tokens and animations in `index.css`; update `docs/style-guide.md` when tokens change.
- Place new data structures in `src/data/` and export typed modules for the portfolio sections.

---

## `docs/`

- `PRD.md` - Product requirements and roadmap.
- `style-guide.md` - Visual language, color tokens, motion rules.
- `spacing-guidelines.md` - Layout rhythm and spacing scale.
- `ai-chat-implementation.md` - Plan for the AI chat assistant.
- `folder-structure.md` - This guide.
- Add supporting docs here as new features land; cross-link from `AGENTS.md` when contributors need to read them.

Working screenshots or design explorations should live in a gitignored folder (e.g., `docs/screenshots/`). Include only final assets in version-controlled directories.

---

## `public/`

- Audio soundtrack files (`soundtrack.mp3`, `soundtrack.ogg`).
- Icons, favicons, and static imagery not managed via import statements.
- Any generated knowledge base for AI chat (`ai-knowledge.json`, once created).

Keep filenames descriptive and maintain consistent casing.

---

## Dependency & Config Files

- `package.json` / `package-lock.json` - npm package definitions and exact dependency tree.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript settings for build, app, and tooling.
- `vite.config.ts` - Vite build and dev server configuration.
- `.gitignore`, `eslint.config.js`, and related linters/configs remain at the root.

Update this section if new tooling or build targets are added.

---

## Maintenance Tips

- When reorganizing folders, update this guide and `AGENTS.md` in the same PR.
- Keep documentation aligned with the codebase; remove stale sections promptly.
- Prefer incremental folder additions over sweeping restructures to preserve component discoverability.

---

**Version:** v1.0  
**Last Updated:** October 2025  
**Owner:** KRINHJ Portfolio maintainers

