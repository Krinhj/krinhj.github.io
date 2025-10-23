# KRINHJ Portfolio Agent Guidelines

Best practices for anyone (human or AI) contributing to the `dYO+ KRINHJ Portfolio`. Keep this doc nearby when planning updates, reviewing code, or answering questions about the site.

---

## Product Context

- The site delivers an immersive synthwave experience with two modes: the command-line terminal (default route, now serving as the AI chat interface) and the visual portfolio (`/index`).
- Goals: spotlight flagship work, demonstrate technical depth, stay memorable, and maintain performance/accessibility.
- Core documentation:
  - `docs/PRD.md` - product requirements and roadmap.
  - `docs/style-guide.md` - visual language, color tokens, motion patterns.
  - `docs/spacing-guidelines.md` - spacing scale and layout rhythm.
  - `docs/ai-chat-implementation.md` - plan for the upcoming OpenAI chat assistant.
  - `docs/folder-structure.md` - authoritative folder layout.

---

## Repository Overview

- `src/` - React + TypeScript source.
  - `components/CLI` - terminal UI and command handling.
  - `components/Portfolio` - hero, about, projects, experience, skills, contact.
  - `components/UI` - shared modals and neon primitives.
  - `components/Effects` - background, boot sequence, matrix transition.
  - `data/` - structured copy (projects, experiences, strengths, etc.).
  - `pages/` - route components for terminal and portfolio modes.
  - `index.css` - design tokens, animations, custom utilities.
  - `App.css` - font imports and motion-preference rules.
- `public/` - audio, icons, and other static assets.
- `docs/` - product and design documentation (see references above).
- `package.json` - scripts and dependencies (npm workflow).

Keep new assets and data organized within these folders. Update related docs when introducing reusable patterns or changing behavior.

---

## Local Development & Build Commands

- `npm install` - install dependencies.
- `npm run dev` - start the Vite dev server.
- `npm run build` - produce a production bundle; fails on type/lint errors.
- `npm run preview` - serve the production bundle locally.
- `npm run lint` - run ESLint.
- `npm run test` - placeholder until Vitest/RTL coverage is added.

Use Node 18 or newer to match the deployment stack.

---

## Coding Style & Patterns

- TypeScript with strict typing; avoid `any` and model domain data explicitly (projects, experiences, timeline entries, etc.).
- Favor functional components and hooks; keep state localized unless cross-cutting by design.
- Styling guidelines:
  - Combine Tailwind utilities with the custom classes and tokens in `index.css`.
  - Reuse neon variables (`--primary`, `--shadow-neon`, etc.) rather than hard-coding colors.
  - Follow the spacing guide for padding/gap values.
- Add concise comments when logic is non-obvious (e.g., audio analysis math or animation timing).
- Keep imports ordered (React, third-party, local) for readability.

---

## CLI & AI Assistant Expectations

- The terminal remains the landing experience and serves as the AI chat interface.
- Preserve the existing command suite (see `src/components/CLI/CommandHandler.tsx`); slash commands like `/help`, `/boot`, `/clear`, `/exit` must remain functional alongside the assistant.
- Ensure the assistant can execute local commands when requested - typed `/boot` or natural language such as "open the portfolio" should both trigger the boot sequence and transition to the visual mode.

---

## Testing Expectations

- Smoke-test UI changes in both terminal and portfolio modes.
- For new logic-heavy utilities/hooks, add unit tests using Vitest + React Testing Library.
- Document manual QA steps in PR descriptions, especially for interactivity (audio toggles, modals, upcoming AI chat).
- Run `npm run build` and `npm run lint` before requesting review to catch regressions early.

---

## Documentation & Knowledge Sharing

- Reflect behavior or API changes in the relevant doc within the same PR.
- Add new visual or spacing patterns to `docs/style-guide.md` or `docs/spacing-guidelines.md`.
- Update `docs/PRD.md` when roadmap items advance or product scope changes.

---

## Security & Secrets

- Never commit API keys, secrets, or populated `.env` files.
- The AI chat must call a Vercel serverless endpoint (see `docs/ai-chat-implementation.md`); keep the OpenAI key in Vercel environment variables only.
- Scrutinize third-party scripts or embeds to preserve performance and privacy.

---

## Collaboration & Git Hygiene

- Use focused branches; write scoped, descriptive commits (Conventional Commit prefixes like `feat:`, `fix:`, `chore:` are preferred).
- PR descriptions should summarize intent, link related docs/issues, include screenshots or clips for notable UI changes, and list manual/automated tests.
- Seek review for substantial UI/UX or architectural changes.
- Avoid staging unrelated modifications. Confirm before altering files the user may be editing concurrently.

---

Following these guidelines keeps the KRINHJ portfolio fast, cohesive, and true to the neon vision. Update this document as norms or architecture evolve.
