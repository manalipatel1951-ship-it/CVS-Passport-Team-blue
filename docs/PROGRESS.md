# Progress / Handoff Log

**Picking this up?** Read `CLAUDE.md`, then this file, then `docs/PLAN.md`.
Update this file at the end of every step, before committing.

## Status by step
| # | Step | Status |
|---|------|--------|
| — | Project rules, plan, brief, handoff docs | ✅ Done |
| 0 | Setup (scaffold, theme, phone shell, back button, routing) | ✅ Done |
| 1 | Welcome screen | ⬜ Next |
| 2 | My Fam | ⬜ |
| 3 | Add family member form | ⬜ |
| 4 | Scan ID + "Fill it in myself" | ⬜ |
| 5 | My Fam (Sarah added + confirmation) | ⬜ |
| 6 | Sarah's dashboard | ⬜ |
| 7 | Chat start | ⬜ |
| 8 | Chat conversation (smart-fake AI) | ⬜ |
| 9 | Video screen | ⬜ |
| 10 | Visit summary | ⬜ |
| 11 | Final responsive/accessibility pass, UAT, README | ⬜ |

## Open items
- **Logo received** → `public/brand/cvs-health-logo.png` (688×352). It has a lot of empty space
  around it (especially on top); trim it in step 1 so it sits centered.

## Log
- **2026-10-21** — Agreed working rules and plan with Manali. Added `CLAUDE.md`, `docs/PLAN.md`,
  `docs/BRIEF.md`, and this file.
- **2026-10-21** — Step 0 approved. React + Vite + Tailwind set up; `PhoneShell` (phone frame) and
  `BackButton` in `src/components/`. Temporary `SetupCheck` screen at `/` will be replaced by Welcome.
  Tip: headless Chrome can't make a window narrower than ~500px, so phone screenshots need the app
  inside a 375px-wide iframe.
