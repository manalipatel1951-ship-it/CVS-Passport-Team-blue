# Progress / Handoff Log

**Picking this up?** Read `CLAUDE.md`, then this file, then `docs/PLAN.md`.
Update this file at the end of every step, before committing.

## Current phase
**Phase A (rough end-to-end build): ✅ done, waiting for Manali's review.**
Next: **Phase B**, polishing one screen at a time, with approval after each.

## Screens
| # | Screen | Route | File | Built | Polished |
|---|--------|-------|------|-------|----------|
| 1 | Welcome | `/` | `src/screens/Welcome.jsx` | ✅ | ✅ |
| 2 | My Fam (+ "added" confirmation) | `/fam` | `MyFam.jsx` | ✅ rough | ⬜ |
| 3 | Add family member form | `/fam/add` | `AddMember.jsx` | ✅ rough | ⬜ |
| 4 | Scan ID → face check | `/fam/add/verify` | `ScanId.jsx` | ✅ rough | ⬜ |
| 4b | Fill it in myself (manual ID entry) | `/fam/add/manual` | `ManualEntry.jsx` | ✅ rough | ⬜ |
| 6 | Sarah's dashboard | `/care/sarah` | `Dashboard.jsx` | ✅ rough | ⬜ |
| 7–8 | Chat ("How can we help?" → conversation) | `/care/sarah/chat` | `Chat.jsx` | ✅ rough | ⬜ |
| 9 | Video visit | `/care/sarah/video` | `Video.jsx` | ✅ rough | ⬜ |
| 10 | Visit summary | `/care/sarah/summary` | `Summary.jsx` | ✅ rough | ⬜ |
| — | Final responsive/accessibility pass, UAT, README | | | | ⬜ |

## How it works (quick map)
- **Demo memory:** `src/state/AppState.jsx`. Nothing is saved, so refreshing the page restarts the demo.
- **Flow 2 lock:** `src/screens/RequireLovedOne.jsx` sends you to My Fam until Sarah has been added.
- **Smart-fake AI:** replies live in `src/ai/responses.js` (easy to edit). `src/ai/matchReply.js` picks one.
  Emergency words → red "Call 911 / ER" alert. Warning words → red "Get seen in person today" alert.
- **Real NP video later:** set `npVideoSrc` (and captions) in `src/config/media.js`.
- **Demo timing:** `src/config/demo.js` (scan time, "typing…" time).
- **Fake data:** `src/data/` (family, Sarah's form answers, dashboard cards).

## Polish notes (ideas for Phase B)
- Chat: "See summary" wraps onto two lines at phone width.
- My Fam: the "Add someone" button wraps to its own row once Sarah is added.
- Bottom nav: only Home works; the others open a "Coming soon" page.
- AI replies say "her" (written for Sarah). Make them neutral if the loved one changes.
- Existing family members (Alex, Maya) only show an "access isn't set up" note when tapped.

## Open items
- None blocking.

## Log
- **2026-10-21:** Agreed working rules and plan with Manali. Added `CLAUDE.md`, `docs/PLAN.md`,
  `docs/BRIEF.md`, and this file.
- **2026-10-21:** Step 0 approved. React + Vite + Tailwind set up; `PhoneShell` (phone frame) and
  `BackButton` in `src/components/`.
  Tip: headless Chrome can't make a window narrower than ~500px, so phone screenshots need device
  emulation (DevTools protocol) or a 375px-wide iframe.
- **2026-10-21:** Welcome screen built. The logo was trimmed to remove empty space.
- **2026-10-21:** Approach changed (Manali): build both flows end to end roughly first, then polish.
  Phase A done: all screens are clickable, with 22 automated tests (including a full click-through
  and accessibility checks). Fixed a Chrome-only crash: never return `scrollIntoView(...)` from
  `useEffect`, because it returns a Promise in Chrome.
