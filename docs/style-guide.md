# KRINHJ Portfolio UI Style Guide (v1.0)

This guide keeps the synthwave `dYO+ KRINHJ Portfolio` visually and behaviorally consistent. It reflects the current React 19 + Vite + Tailwind 4.1 stack, plus the custom tokens declared in `src/index.css`. Reference it whenever you introduce new UI, refresh an existing section, or update animation behavior.

---

## Brand Identity

- **Experience Pillars:** Futuristic confidence, hands-on technical mastery, and welcoming hacker energy. Surfaces should feel like a premium command center—not a generic landing page.
- **Visual Language:** Pure-black canvas illuminated by neon red energy, holographic grid overlays, and decisive motion that doubles as feedback.
- **Color Tokens (HSL, defined in `:root`):**
  - `--background`: `0 0% 0%`
  - `--foreground`: `0 0% 95%`
  - `--primary`: `0 84% 60%`
  - `--primary-glow`: `0 100% 70%`
  - `--primary-dim`: `0 60% 40%`
  - `--secondary`: `0 0% 15%`
  - `--muted-foreground`: `0 0% 60%`
  - `--border`: `0 84% 60%`
  - Accent, destructive, and focus rings reuse the primary hue to maintain a single-color narrative.
- **Glow & Shadow Tokens:** `--shadow-neon`, `--shadow-glow`, and `--shadow-pulse` deliver the signature bloom. Stack them only on dark backgrounds to avoid washing out light imagery.

---

## Typography

- **Font Stack:**
  - Headlines & glyphs: `Orbitron`, fallback `'Share Tech Mono', monospace`
  - Body content & CLI output: `Share Tech Mono`, fallback `'Courier New', monospace`
- **Recommended Scale (`clamp` values already in components):**
  - Hero nameplate: `clamp(2.5rem, 8vw, 6rem)`
  - Section headings: `clamp(2rem, 5vw, 3.5rem)`
  - Subheadings: `clamp(1.125rem, 2.5vw, 1.5rem)`
  - Body copy: `1rem`–`1.125rem`, line-height ≥ `1.6`
- **Styling Notes:**
  - Use uppercase with `0.1em`–`0.2em` letter-spacing for major headings; keep descriptive text in sentence case to preserve readability.
  - Prefer monospace styling for chips, command names, and metadata so they feel terminal-native.
  - Keep holographic gradients for marquee text only; fall back to solid red for secondary copy.

---

## Layout & Backgrounds

- **Background Engine:** Wrap portfolio pages in `SynthwaveBackground` (see `src/components/Effects/SynthwaveBackground.tsx`) to inherit parallax grids, particle pulses, and audio-reactive layers.
- **Grid Overlay:** `.cyberpunk-grid` adds a luminous lattice. Cap opacity at `0.8` and avoid stacking multiple grid layers in the same viewport.
- **Scanning Elements:** `.scan-line` and gradient bars signal live systems. Use them sparingly—one per section or modal is enough.
- **Terminal Shell:** The CLI lives inside a centered container (`max-width: min(64rem, 95vw)`). Reuse the same border (`2px solid hsl(var(--primary) / 0.3)`), glass backdrop, and header layout for any future terminal panels.

---

## Core Components

- **Energy Card (`.energy-card`):**
  - Border radius `12px`, padding `clamp(1.5rem, 3vw, 3rem)`.
  - Background: translucent red overlay on black; boost with `box-shadow: var(--shadow-neon)` for highlight states.
  - Flagship projects in `ProjectMatrix` add thicker borders and subtle scale (`transform: scale(1.02)`)—reserve this treatment for one hero item per grid.
- **Neon Button (`.neon-button`):**
  - Transparent base, `2px` red border, glow via `--shadow-glow`.
  - Hover: intensify glow and add `background: hsl(var(--primary) / 0.08)`.
  - Keep labels uppercase, ≤ 16 characters; split longer actions across stacked buttons.
- **Chips & Tags:**
  - Use red outlines and monospace text (`font-size: 0.75rem–0.875rem`). The `energy-pulse` animation is reserved for live or production states.
- **Modals (`ExperienceDetailModal`, `ProjectDetailModal`):**
  - Max width `min(900px, 92vw)`, padding `clamp(1.5rem, 4vw, 3rem)`.
  - Dim backdrop with `background: hsl(var(--background) / 0.9)` so neon accents stay readable.
- **CLI View:**
  - History lines stick to `clamp(0.75rem, 2vw, 0.875rem)` with `line-height: 1.6`.
  - Maintain `1rem` gutters inside the scroll region and keep boot-sequence overlays within the terminal bounds to avoid layout shift.

---

## Motion & Interaction

- **Animation Palette:** `grid-pulse`, `energy-pulse`, `textGlow`, `gradientShift`, and `typewriter` provide the core motion language. Keep durations between `0.3s` (feedback) and `4s` (ambient).
- **Responsive Behavior:** Hero sections stay at `100vh`; later sections use `clamp`-based padding so the layout breathes on ultra-wide and mobile screens alike. Reduce glow blur on small screens to prevent clipping.
- **Feedback Loops:** Motion should communicate state. Example patterns already in use:
  - Audio toggle updates copy (`AUDIO: ON/OFF`) and animates the waveform.
  - Live status pills pulse via `energy-pulse`.
  - Modal entrances combine scale (`0.98 → 1`) with glow flare.
- **Reduced Motion:** Honor `prefers-reduced-motion` overrides (wired in `src/App.css`). New animations must either check the media query or lean on Tailwind `motion-safe`.

---

## Accessibility & Content

- Keep contrast at WCAG AA or better. Primary red on black passes; double-check any text layered on gradients or screenshots.
- Provide `aria-label` copy for icon-only controls (audio toggle, external links, modal close buttons).
- Treat glitch characters as decorative. Supply plain-language equivalents for screen readers (`aria-label="Audio: On"`).
- Tone: confident and energetic but actionable. Terminal responses stay terse (e.g., `/boot → launching portfolio`), while portfolio sections can expand into narrative case studies without losing clarity.

---

## Implementation Reference

- Tokens & animations: `src/index.css`
- Global font imports: `src/App.css`
- CLI experience: `src/components/CLI/Terminal.tsx`
- Portfolio sections: `src/components/Portfolio/*`
- Shared UI patterns: `src/components/UI/*`

Update this guide whenever you add a reusable token, component treatment, or animation family.

---

**Version:** v1.0  
**Last Updated:** October 2025  
**Owner:** KRINHJ Portfolio maintainers
