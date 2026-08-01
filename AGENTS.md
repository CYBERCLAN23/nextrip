# Coding Standards

## Mandatory Skill Checks Before Writing UI Code

Whenever writing or modifying UI/frontend code, load and verify against ALL of the following skills first:

1. **impeccable** — `/home/almight/.agents/skills/impeccable/SKILL.md` (UX review, visual hierarchy, polish, responsive behavior, design anti-patterns)
2. **ui-ux-pro-max** — `/home/almight/.opencode/skills/ui-ux-pro-max/SKILL.md` (design systems, 67 styles, color palettes, typography, UX guidelines). Use its `color` domain for palette decisions.
3. **senior-frontend** — `/home/almight/.agents/skills/senior-frontend/SKILL.md` (React / Next.js / TypeScript / Tailwind best practices, performance, a11y)
4. **color theory** — no standalone skill; use `ui-ux-pro-max --domain color` plus `design-system` (`/home/almight/.agents/skills/design-system/SKILL.md`) for token architecture. Validate every color pair against WCAG (min 4.5:1 normal text, 3:1 large/UI).

Apply the relevant guidance from these skills before finalizing any frontend change.
