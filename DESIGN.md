# NexTrip Global — Homepage Design

**World — THE INDIGO REGISTRY / "THE INDIGO DIP"**: a departure document being drawn up, not a sales pitch. Study abroad is framed as a formal registry entry — a file with a number, a route, and a seal — on stone-paper stock in deep indigo ink, with one porcelain-blue accent reserved for "China open".

## Story

The visitor lands on a stone-paper spread: an open departure record on the left (`FILE NO. 2026-CN-001`), and a self-drawing indigo route map plate on the right — route arcs ink themselves in from African hubs to Beijing/Shanghai/Hangzhou. China reads as OPEN (porcelain-blue live dots), Canada and Germany as SOON. The page moves like a document being filed: each section carries a registry coordinate (`REC. 02 · NETWORK`, `REC. 05 · THE PROCESS`…) and a mono caption. African indigo and Chinese porcelain blue read as one blue — the brand's visual thesis. The footer dips into full indigo night, closing the document like the ink pool under a stamp.

The old world (warm ink/vermilion/gold + cobe globe + split-flap + seal-stamps + numbered section markers) is **replaced, not polished**. The anti-generic audit tells: warm-cream-with-terracotta, near-black-with-neon, and the overused departure-board/split-flap all removed. Chinese characters are now quiet paper-watermark supergraphics, not stamps.

## First viewport

- Eyebrow: `rr-tab` **NEXTRIP · REGISTRY** + mono `FILE NO. 2026-CN-001`
- H1 (Archivo Expanded, `font-stretch:125%`): "Study in **China** / as a documented route." — `China` in porcelain blue
- Right column: indigo **route map plate** (`dye-dip` ground, faint ledger grid, 3 quad-arc routes drawn via stroke-dashoffset, hub dots) + **DEPARTURES · 2026** ledger (Dakar→Beijing OPEN, Lagos→Shanghai OPEN, Nairobi→Hangzhou SOON) with live-dot pulses
- Twin CTAs: porcelain "Begin your file" → `/apply`, ghost "Browse universities" → `/universities`
- Stats as registry entries: 2000+ files opened, 40+ hubs reached, 95% files sealed
- Huge `途` paper-watermark supergraphic right-of-frame; parallax scroll
- Scroll cue "Scroll the file"

## Section rhythm (data-section labels)

| # | Section | Ground | Registry tab |
|---|---------|--------|--------------|
| 01 | Hero (departure record + route map) | stone paper + dye-wash | NEXTRIP · REGISTRY |
| 02 | Network (route ticker + hub ledger) | stone paper | REC. 02 · NETWORK |
| 03 | The Route (waypoints + intelligence panel) | paper-2 | REC. 03 · THE ROUTE |
| 04 | Services (concierge) | stone paper + dye-wash | REC. 04 · SERVICES |
| 05 | How it works (four stages) | paper-2 | REC. 05 · THE PROCESS |
| 06 | Universities (the roster) | stone paper | REC. 06 · THE ROSTER |
| 07 | Testimonials (transit notes) | paper-2 | REC. 07 · TRANSIT NOTES |
| 08 | Begin (sign the file) | stone paper | REC. 08 · SIGN THE FILE |
| — | Footer | **indigo night** | FILE NO. 2026-CN-001 — OPEN |

Sections alternate stone paper / paper-2 for quiet banding. Hairline registry rules (`rr-line`) separate; the footer is the single dark beat — the ink pool.

## Tokens

- `--color-rr-paper #f4f2ec` stone paper · `--color-rr-paper-2 #eae7de` · `--color-rr-paper-3 #e1ddd2`
- `--color-rr-ink #20263e` deep indigo ink · `--color-rr-ink-2 #454c68` · `--color-rr-ink-3 #6e7489`
- `--color-rr-blue #2b5da8` porcelain blue (China open / action) · `--color-rr-blue-deep #1e4278` hover
- `--color-rr-indigo #3e4a7a` route arcs · `--color-rr-night #20263e` footer dip
- `--font-registry` Archivo (body) · `--font-registry-display` Archivo variable @ `font-stretch:125%` (display) · `--font-registry-mono` Fragment Mono (data) · Noto Serif SC retained for Chinese

## Utilities added in globals.css (INDIGO REGISTRY WORLD block)

`rr-paper`, `rr-line`, `rr-line-deep`, `rr-label` (mono caption + leading rule), `text-porcelain`, `text-indigo-ink`, `doc-frame` (document card), `rr-perforation` (dashed rule), `rr-route` (SVG arc stroke), `dye-wash` (porcelain radial wash), `dye-dip` (route-map plate gradient), `live-dot` (+ `rr-pulse` keyframes), `rr-tab` (registry coordinate), `rr-stamp` (flat double-border ink rectangle), `rr-route--draw` (dashoffset draw state), plus all legacy `atlas`/`nx-*` classes kept intact for dark inner pages.

## Components

- `HeroSection` — `RouteMap` (SVG quad arcs, GSAP `matchMedia` stroke-dashoffset draw + hub-dot pop, grid fade) and `DepartureStatus` (open-departure ledger, anime.js row entrance + pulse), GSAP timeline, count-up stats.
- `NetworkSection` — `route-ticker` marquee (paused on hover), destination rows (China OPEN porcelain / Canada·Germany SOON), right column is a **Hub Ledger** sheet (AFRICA HUBS ↔ CHINA · OPEN) replacing the cobe globe.
- `NexTripJourney` — "Every milestone, entered in order." waypoints 01–03 + university intelligence panel (porcelain CTA, white doc plate, chips).
- `ServicesSection` — 6 concierge cards, scholarship card featured in porcelain; "Open the file" CTAs.
- `HowItWorksSection` — four stages 01–04 with timeline connector line, porcelain first node.
- `UniversitiesSection` — QS-certified roster cards, porcelain scholarship badges, filter chips.
- `TestimonialsSection` — transit notes with outcome badges, `TRANSIT · DAKAR → BEIJING` route markers, dots pagination.
- `CtaSection` — "Your departure is one signature away." white doc plate with porcelain corner accents.
- Navbar/Footer — paper masthead (works over dark inner pages), porcelain progress bar + active state, hairline rules, porcelain CTA "File application"; footer is indigo night with porcelain status strip.

## Interaction & motion

- Lenis smooth scroll (existing provider).
- One authored motion moment: the self-drawing indigo route map + departure ledger at load (respects `prefers-reduced-motion` via `gsap.matchMedia`).
- GSAP ScrollTrigger reveals per section; scrub parallax on hero.
- Route ticker marquee (pause on hover), live-dot pulse rings.

## Accessibility / craft floor

- Contrast on paper: ink `#20263e` on `#f4f2ec` (~13:1); ink-2 `#454c68` (~7:1); porcelain `#2b5da8` (~5.7:1). All above 4.5:1.
- Display type ≤ 5rem; tracking tight; paragraph measure ≤ 65ch.
- `prefers-reduced-motion` respected (global media query + `gsap.matchMedia`).
- Real link targets (`/apply`, `/universities`, `/destinations/china`, `/scholarships`, `/admissions`, `/about`, `/blog`, `/contact`).
- Decorative supergraphics are `aria-hidden` + `pointer-events-none`; buttons have aria-labels; mobile menu has close/open aria-labels.

## Verification performed

- `npm run build` and `npx tsc --noEmit` clean.
- Headless CDP audit at 1440px + 390px: **no horizontal overflow** either size; body ground = `rgb(244,242,236)` with ink text; split-flap = 0, canvas/cobe = 0, seal-stamps = 0 (all legacy signatures gone); 9 `rr-tab`s, 34 `rr-label`s, 9 `doc-frame`s, 9 `live-dot`s, 3 route arcs present; **0 console errors**; inner dark pages (`/universities`) still render atlas ground with paper navbar overlay and no overflow.

## Flags for approval

- Stats (2000+ placed / 40+ hubs / 95% sealed) are carried over from the incumbent site and presented in the new vocabulary — kept as supplied truth, pending your confirmation they're current.
- Testimonials and university QS ranks are incumbent content, unchanged.
