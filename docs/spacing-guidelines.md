# KRINHJ Portfolio Spacing Guidelines (v1.0)

These rules align our synthwave portfolio’s CLI and visual modes. Use them with the UI style guide to maintain rhythm as you iterate on sections in `src/components/Portfolio`, terminal surfaces in `src/components/CLI`, and shared UI in `src/components/UI`.

---

## Base Scale

- **Root unit:** 4px (`0.25rem`). Build spacing in multiples of this unit.
- **Common stack:** `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`, `5rem`.
- Prefer `clamp` when a dimension must flex between breakpoints (e.g., `clamp(1.5rem, 3vw, 3rem)` inside energy cards).
- Favor container `gap` / `space-y` utilities over stacking margins; reserve explicit margins for intentional offsets.

---

## Page Shell

- **Hero Section:** Occupies the full viewport (`height: 100vh`). Keep padding to a minimum (`padding-inline: 1rem`) so the nameplate and waveform stay centered.
- **Portfolio Sections:** For anything after the hero, use `padding-block: clamp(4rem, 8vw, 6rem)` and `padding-inline: clamp(1rem, 6vw, 2.5rem)`. Existing sections use `5rem 1rem`; migrate older code to the clamp pattern as you refactor.
- **Content Width:** Limit inner wrappers to `max-width: 80rem` (About, Projects) or `64rem` (Experience) and center them with auto margins to keep the interface tight on ultrawide screens.

---

## Cards & Modules

- **Energy Cards:** Default padding `clamp(1.5rem, 3vw, 3rem)` with `1.5rem`–`2rem` gaps between internal blocks. Keep border radii at `12px` and allow breathing room around headings (`margin-bottom: 1.5rem`).
- **Flagship / Highlight States:** Add `0.5rem` additional padding only if the content density demands it. Otherwise rely on glow and border weight for emphasis.
- **Modals:** Maintain `clamp(1.5rem, 4vw, 3rem)` padding inside modal content. Separate modal sections with `gap: 1.5rem` and keep footer actions aligned to a `1rem` horizontal gap.

---

## Grids & Lists

- **Project Matrix:** Use `grid-template-columns: repeat(auto-fit, minmax(min(500px, 100%), 1fr))` with `gap: 2rem`. Never drop below `1.5rem` gaps or cards will feel cramped.
- **Technical Arsenal:** Space skill badges with `gap: 0.75rem` and `padding: 0.25rem 0.75rem` per chip to keep the monospace labels legible.
- **About Strength Grid:** Follow the `repeat(auto-fit, minmax(250px, 1fr))` pattern with `gap: 1rem`. Maintain `1rem` padding inside each strength card.

---

## Timeline Layout

- **Vertical Rhythm:** Each experience block uses `margin-bottom: 4rem`. Do not go below `3rem` or the timeline line will feel congested.
- **Card Dimensions:** Keep timeline cards at `padding: clamp(1.5rem, 3vw, 2.5rem)` and `min-height: 400px`. `margin-left/right: 58%` splits the card from the center line—match this when adding new nodes.
- **Node Alignment:** Timeline nodes stay `16px` in diameter with `4px` borders. Maintain at least `48px` vertical spacing around nodes to retain the neon glow.

---

## CLI Mode

- **Container:** `max-width: min(64rem, 95vw)` with `1rem` padding on all sides. Keep the header at `padding: 1rem` and align control clusters using `gap: 0.75rem`.
- **History Window:** `height: min(500px, 60vh)` with `padding: 1rem`. Preserve `line-height: 1.6` and `margin-bottom: 0.5rem` between printed lines for readability.
- **Input Row:** Use `gap: 0.75rem` between prompt icon and text input; provide `margin-top: 1rem` above the input to visually separate it from history output.

---

## Responsive Adjustments

- Reduce section padding one step on screens below `768px` (`padding-block: clamp(3rem, 12vw, 4rem)`).
- Collapse multi-column grids into single columns below `640px`, but keep `gap` values at least `1.25rem` to avoid elements touching.
- Lower glow spreads on mobile (`box-shadow` blur radius ~30% smaller) so highlights stay within card bounds.

---

## QA Checklist

1. Section gutters align visually when scrolling from Portfolio mode back to the CLI.
2. Cards never double up on padding (either the parent container or the card controls outer spacing, not both).
3. Timeline nodes stay centered and equidistant at all breakpoints.
4. CLI history remains legible without horizontal scroll on narrow screens.
5. Audio controls and return-to-CLI button stay within the `1rem` fixed inset and do not overlap hero content.

Update this guide as we standardize additional sections or introduce new layout primitives.
