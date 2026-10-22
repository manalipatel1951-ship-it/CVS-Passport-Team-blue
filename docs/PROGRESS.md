# Progress / Handoff Log

**Picking this up?** Read `CLAUDE.md`, then this file, then `docs/PLAN.md`.
Update this file at the end of every step, before committing.

## Current status
Both flows work end to end, and Manali's first round of feedback has been applied
(see the 2026-10-21 log entry). **Next:** Manali reviews this round, then polishing continues
screen by screen.

## Screens
| Screen | Route | File |
|--------|-------|------|
| Welcome | `/` | `src/screens/Welcome.jsx` |
| My Fam (home / profile picker; Pending → approved) | `/fam` | `MyFam.jsx` |
| Add family member (Step 1 of 3, pick an icon) | `/fam/add` | `AddMember.jsx` |
| Verify it's you: ID front → back → selfie → "You're verified" (Step 2 of 3) | `/fam/add/verify` | `ScanId.jsx` |
| Fill it in myself (caregiver's own ID details) | `/fam/add/manual` | `ManualEntry.jsx` |
| Sarah's Health (Your Health tab) | `/care/sarah` | `Dashboard.jsx` |
| A record (Prescriptions, Previous visits, …) | `/care/sarah/records/:recordId` | `RecordDetail.jsx` |
| MinuteTwin chat | `/care/sarah/chat` | `Chat.jsx` |
| MinuteTwin video call | `/care/sarah/video` | `Video.jsx` |
| Visit summary | `/care/sarah/summary` | `Summary.jsx` |

## How it works (quick map)
- **Demo memory:** `src/state/AppState.jsx`. Nothing is saved, so refreshing the page restarts the demo.
- **Flow 2 lock:** `src/screens/RequireLovedOne.jsx` sends you to My Fam until Sarah has approved.
- **MinuteTwin scripts:** `src/ai/twinScripts.js` holds all wording and is easy to edit. `src/ai/twin.js` decides
  which line comes next. Each path's `summary` feeds the summary screen and "Previous visits".
- **Real MinuteTwin video later:** set `npVideoSrc` (and captions) in `src/config/media.js`.
- **Demo timing:** `src/config/demo.js` (scan time, "typing…", Sarah's approval, video caption).
- **Fake data:** `src/data/` (Manali, Alex, Maya, Sarah's form answers, records).
- **Look and feel:** colors in `src/index.css`, profile icons in `src/components/ProfileIcon.jsx`,
  reference screenshot in `reference/`.

## Polish notes (ideas, not yet requested)
- Verify screens: "Fill it in myself" sits half below the fold on a 375×740 phone.
- Dashboard hero illustration is a simple placeholder.
- Script text says "her" (written for Sarah). Make it neutral if the loved one changes.

## Log
- **2026-10-21:** Agreed working rules and plan with Manali. Added `CLAUDE.md`, `docs/PLAN.md`,
  `docs/BRIEF.md`, and this file.
- **2026-10-21:** Step 0 (setup) approved. Welcome screen built.
  Tip: headless Chrome can't make a window narrower than ~500px, so phone screenshots need device
  emulation (DevTools protocol) or a 375px-wide iframe.
- **2026-10-21:** Approach changed (Manali): build both flows end to end roughly first, then polish.
  Fixed a Chrome-only crash: never return `scrollIntoView(...)` from `useEffect`, because it returns a Promise in Chrome.
- **2026-10-21: Feedback round 1 applied.**
  - "AI nurse" → "AI NP" (general) / "MinuteTwin (AI)" (chat and video). Never "nurse".
  - Alex and Maya are Manali's kids (Son/Daughter, Full access).
  - Verification is for the **caregiver**: ID front + back + selfie, why-line, Step 2 of 3,
    "You're verified" with a checklist, "Send request to Sarah".
  - My Fam is now a profile picker with Pending → "Sarah approved your access", a New tag and ring,
    access status per person, a MinuteTwin teaser card, and a bottom nav instead of Back.
  - New CVS-app look from `reference/cvs-app-dashboard.png`: dark blue pill buttons, light blue hero,
    gray background, white cards, floating bottom nav, round header icons. Fun profile icons everywhere.
  - Sarah's Health dashboard: MinuteTwin hero card and a Records list (Previous visits shows "New").
  - MinuteTwin chat follows Manali's rash script (pre-typed messages, photo, video only when asked,
    the "When to get more care" box, and a summary card), plus infection/cold/fever paths.
  - Video call: full screen, timer, "Connected", live caption, round mute/flip/end buttons,
    self-view switches to Sarah's arm, End call returns to the chat.
  - Summary: visit details with a photo thumbnail, matching notes, the care-level box, action buttons,
    and "Created by MinuteTwin (AI). This is not a diagnosis."
  - Decisions: the "When to get more care" list uses the fuller summary wording in both chat and
    summary. "Infection" = possible UTI. Off-script messages follow keyword paths. 911 only when typed.
