# dYO+ KRINHJ Portfolio PRD (v1.0)

Product requirements for the synthwave-inspired portfolio that showcases Ronnie Talabucon Jr.'s full-stack, AI, and systems engineering work. This PRD captures the current experience and outlines the expectations for near-term feature work.

---

## 1. Product Overview

- **Elevator Pitch:** An immersive cyberpunk portfolio with dual modes - a command-line terminal and a visual showcase - designed to signal technical depth, creative polish, and production readiness.
- **Primary Outcomes:**
  - Convert curious visitors into interview calls, collaboration requests, or direct messages.
  - Demonstrate breadth (projects, experience, tech stack) and depth (case studies, AI/audio integrations).
  - Leave a memorable brand impression through motion, audio, and neon styling.
- **Current Deployment:** `https://krinhj.vercel.app`
- **Source of Truth:** Repository root (`README.md`), data modules in `src/data`, and visual assets in `src/assets/screenshots`.

---

## 2. Goals & Success Metrics

- **Hiring Conversion:** >= 3 targeted messages per month via email or LinkedIn originating from the site.
- **Engagement:** Median time-on-site > 2 minutes; >= 60% of visitors interact with at least one project detail modal or CLI command.
- **Performance:** Lighthouse scores >= 90 for Performance and Accessibility on desktop and mobile.
- **Maintainability:** New sections can be added without breaking the neon visual language, backed by the updated style and spacing guides.

---

## 3. Audience & Key Use Cases

- **Hiring Managers / Recruiters:** Need quick validation of skill depth, shipped projects, and contact paths.
- **Engineering Leads / Collaborators:** Evaluate technical rigor, architecture thinking, and problem-solving approach.
- **Peers & Community Members:** Explore inspiration, grab reusable patterns, or connect for open-source work.

### Primary User Stories
1. As a hiring manager, I want to scan flagship projects with proof of production so I can justify an interview.
2. As a technical peer, I want to dive into detailed project write-ups and tech stacks so I can assess engineering strength.
3. As a recruiter in a hurry, I want a quick summary (skills, availability, contact) without navigating multiple pages.
4. As a fan of the aesthetic, I want to interact with audio-reactive visuals and terminal commands to experience the vibe.

---

## 4. Experience Pillars

- **Dual Interface:** Terminal mode (default at `/` and `/terminal`) provides a hacker-grade introduction and shortcuts. Portfolio mode (`/index`) offers rich visuals, audio, and storytelling.
- **Audio-Visual Feedback:** Background soundtrack, waveform visualizer, grid pulses, and scan lines reinforce the sci-fi narrative.
- **Narrative Depth:** Each section stays focused: Hero = identity, About = strengths, Projects = outcomes, Experience = timeline, Technical Arsenal = skills, Contact = calls to action.

---

## 5. Functional Requirements

### 5.1 Global
- Wrap all portfolio content in `SynthwaveBackground` with audio-reactive layers when soundtrack is active.
- Persistent floating controls (top corners) include:
  - Audio toggle: reflects state (`AUDIO: ON/OFF`), disabled until audio buffers (`audioLoaded`).
  - Return-to-CLI button: visible on portfolio pages, routes to `/terminal`.
- Respect `prefers-reduced-motion`, disabling non-essential animations.
- Provide responsive layout from 320px to 1440px+, keeping hero text legible and sections centered.
- Implement the integrated AI chat assistant (see `docs/ai-chat-implementation.md`) so the landing CLI can answer portfolio questions and trigger slash commands.

### 5.2 Terminal Mode
- Default landing experience doubles as the AI chat interface; render conversation history inside the terminal shell.
- Provide a persistent input field and send button alongside `Enter` shortcuts for quick submissions.
- On submit, send chat exchanges to `/api/ai-chat` and stream assistant responses into the history.
- Allow the assistant to invoke slash commands (e.g., automatically run `/boot` when a visitor asks to open the visual portfolio) using the existing command handler.
- Treat typed `/boot` commands and natural-language requests ("open the portfolio", "launch the interface") as equivalent triggers for the boot sequence.
- Preserve manual commands:
  - `/help`, `/boot`, `/clear`, `/exit`.
- Maintain scrollable history (`min(500px, 60vh)` tall), ensure input auto-focus, and keep energy-pulse/overlay feedback for transitions.

### 5.3 Portfolio Sections

1. **HeroSection**
   - Full viewport height, centered identity text, audio waveform or scan line, animated cursor typing effect.
   - Provide glitch-themed flourishes while keeping accessible labels.
2. **AboutSection**
   - Section header plus summary paragraphs sourced from `aboutSummary`.
   - Key Strengths grid with icons, responsive auto-fit columns, and neon microcards.
3. **ProjectMatrix**
   - Grid of projects from `src/data/projects`. Each card shows name, subtitle, description, tech stack chips, status pill, and action buttons.
   - Open `ProjectDetailModal` with expanded information (screenshots, roles, outcomes).
   - Flagship project receives enhanced border/glow treatment.
4. **ExperienceTimeline**
   - Alternating left/right cards anchored to a neon spine.
   - Each entry shows title, organization, location, date range, highlights, and a modal trigger for deeper details.
5. **TechnicalArsenal**
   - Categorized skill clusters with energy cards, chips, and highlight items for AI/audio specialties.
6. **ContactPortal**
   - Provide email, LinkedIn, GitHub, and CTA buttons. Include copy encouraging direct collaboration.

### 5.4 Modals & Detail Views
- `ProjectDetailModal` and `ExperienceDetailModal` must include:
  - Clear headers with project/role name and context.
  - Bullet outcomes, tooling stack, and links (live site, repo, case study).
  - Carousel or gallery placeholders for screenshots (`src/assets/screenshots/*`).
- Modals respect spacing rules and close on ESC, backdrop click, and explicit close button.

---

## 6. Content & Data Sources

- **Data Modules:** `src/data` exports `projects`, `experiences`, `aboutSummary`, `keyStrengths`, and other structured content. Update these modules to keep presentation components lean.
- **Media Assets:** Stored in `src/assets/screenshots/<ProjectName>`. Provide fallback handling if an image is missing.
- **Copywriting:** Follow tone guidance in `docs/style-guide.md` and keep section descriptions concise (<= 140 characters for subtitles, richer detail within paragraphs).
- **Unicode / Glyphs:** Decorative characters are acceptable in visual copy but ensure screen reader alternatives are present.

---

## 7. Visual & Interaction Standards

- Follow `docs/style-guide.md` for typography, color tokens, component treatments, and motion patterns.
- Use `docs/spacing-guidelines.md` to enforce consistent gutters, card padding, timeline rhythm, and responsive breakpoints.
- New interactions must:
  - Provide neon focus states.
  - Avoid jarring transitions when switching between terminal and visual modes.
  - Maintain at least `1rem` hit targets for buttons and chips.

---

## 8. Technical Considerations

- **Stack:** React 19, TypeScript, Vite, Tailwind 4.1, inline styles for specialized effects, Lucide icons, Three.js/Spline hooks for visuals, Web Audio API for analysis.
- **Routing:** React Router 7 with `/` -> terminal, `/index` -> portfolio, `/terminal` alias. Ensure direct navigation to either route works without reload glitches.
- **Performance:** Lazy-load heavy assets (Three.js models, audio) where possible. Throttle audio visualization to avoid pegging CPU. Optimize screenshot images for web (<= 300kb preferred).
- **A11y:** Keep tab order logical. Provide `aria-label`s for icon-only controls and descriptive text for modals. Honor `prefers-reduced-motion` and `prefers-reduced-transparency`.
- **Analytics (optional future):** Hook into lightweight analytics (e.g., Plausible) to track command usage, modal opens, and outbound link clicks.

---

## 9. Testing & QA

- **Functional Tests:** Verify all CLI commands, audio toggle behavior, modal open/close paths, responsive breakpoints, and navigation between modes.
- **Visual Regression:** Spot-check glow intensity, clip paths, and scan-line alignment across Chrome, Firefox, Safari, and mobile browsers.
- **Accessibility Audit:** Run Lighthouse + manual keyboard navigation; ensure focus is trapped within modals and that audio playback is user-initiated.
- **Performance Checks:** Confirm `npm run build` produces a bundle that meets size expectations and that `npm run preview` loads without runtime errors.

---

## 10. Roadmap & Backlog

1. **AI Chat Assistant (in progress):** Ship the CLI-integrated assistant per `docs/ai-chat-implementation.md`, including command delegation (`/boot`) and grounded responses.
2. **Case Study Deep Dives:** Dedicated modal sections for flagship projects with metrics, architecture diagrams, and lessons learned.
3. **Achievement Badges:** Visual counters for shipped projects, AI integrations, hackathon wins.
4. **Blog / Changelog Feed:** Lightweight MDX-driven updates accessible via CLI command (`/updates`) and portfolio section.
5. **Audio Suite Enhancements:** User-selectable tracks, volume slider, and visualizer themes.
6. **Internationalization:** Optional toggle for localized copy or translated summaries.
7. **Dark-Grey Accessibility Theme:** Reduced contrast option while retaining neon highlights.

Update this PRD when scope expands beyond the current sections or when metrics/goals shift.
