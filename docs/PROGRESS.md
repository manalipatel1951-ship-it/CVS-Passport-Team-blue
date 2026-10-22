# Progress / Handoff Log

**Picking this up?** Read `CLAUDE.md`, then this file, then `docs/PLAN.md`.
Update this file at the end of every step, before committing.

## Current status
Both flows work end to end, and Manali's feedback round 3 has been applied (see the log).
**Next:** Manali reviews round 3.

## Screens
| Screen | Route | File |
|--------|-------|------|
| Splash animation (over Welcome) → Welcome | `/` | `src/screens/Splash.jsx`, `Welcome.jsx` |
| My Fam (home / profile picker; Pending → approved; "Who needs care?") | `/fam` | `MyFam.jsx` |
| Who are you adding? (Step 1 of 3) | `/fam/add` | `AddMember.jsx` |
| Is this Sarah? (searching → found card) | `/fam/add/found` | `FoundAccount.jsx` |
| Verify it's you: ID front → back → selfie (Step 2 of 3) | `/fam/add/verify` | `ScanId.jsx` |
| Enter manually (your own ID details) | `/fam/add/manual` | `ManualEntry.jsx` |
| You're verified (stamp, timeline, pick an icon) | `/fam/add/verified` | `Verified.jsx` |
| Sarah's Health (Your Health tab) | `/care/sarah` | `Dashboard.jsx` |
| A record (Prescriptions, Previous visits, …) | `/care/sarah/records/:recordId` | `RecordDetail.jsx` |
| MinuteTwin chat | `/care/sarah/chat` | `Chat.jsx` |
| MinuteTwin video call | `/care/sarah/video` | `Video.jsx` |
| Preparing Sarah's visit summary… | `/care/sarah/preparing` | `Preparing.jsx` |
| Visit summary | `/care/sarah/summary` | `Summary.jsx` |

## How it works (quick map)
- **Demo memory:** `src/state/AppState.jsx`. Nothing is saved, so refreshing the page restarts the demo (and replays the splash).
- **Flow 2 lock:** `src/screens/RequireLovedOne.jsx` sends you to My Fam until Sarah has approved.
- **MinuteTwin scripts:** `src/ai/twinScripts.js` holds all wording, paths and summaries, and is easy to edit.
  `src/ai/twin.js` decides which line comes next.
- **Animation timings, at the top of each file:** splash `src/screens/Splash.jsx`, stamp
  `src/components/PassportStamp.jsx`, video call `src/screens/Video.jsx`. Other waits are in `src/config/demo.js`.
- **Real MinuteTwin video later:** set `npVideoSrc` (and captions) in `src/config/media.js`. It replaces
  the animated illustration (`src/components/NpIllustration.jsx`).
- **Fake data:** `src/data/` (Manali, Alex, Maya, Sarah's form answers, records).
- **Look and feel:** colors in `src/index.css`, profile icons in `src/components/ProfileIcon.jsx`,
  illustrations in `src/components/*Illustration.jsx`, references in `reference/`.
- **Logo:** `public/brand/cvs-health-logo.png`, made transparent so it sits on light blue. The heart ends at
  88/538 of the width (`src/components/CvsLogo.jsx`). That's how the splash and header heart clip it.

## Polish notes (ideas, not yet requested)
- Verify steps: the privacy note can sit just below the fold on small phones (375×740), because the camera is large.
- My Fam at 375×740: the MinuteTwin card's button needs a small scroll (it fits on taller phones).
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
- **2026-10-22: Feedback round 2 applied.**
  - Animated CVS splash (recreates `reference/cvs-splash-reference.png`), gliding into the Welcome logo.
  - Welcome: light blue hero with an original illustration, 4 bullets (lock bullet added), gray icon circles,
    bigger headline, pinned "Get started".
  - Naming: "MinuteTwin, our AI care assistant". Never "AI NP" or nurse. "Everyday concerns like
    rashes, colds, and allergies" everywhere.
  - My Fam: "You" tile first, header icons, "Add a parent or anyone you care for", "Who needs care?" picker,
    dismissable banner that fades out, bottom padding.
  - Passport: "Who are you adding?" (4 fields, chips, US date) → "We found Sarah's account" → verify
    (progress row, tips, liveness, "Verify another way") → "You're verified" (stamp animation, timeline,
    icon picker, no Back). Shared branding: header heart, light blue top section, red accents.
  - MinuteTwin: greeting, quick starts, growing text box, typing dots, 911 line. Rash = message → photo +
    caption → video → summary. Other paths are short with a summary card. Infection path replaced by an
    infected cut/scrape. New allergy path.
  - Video: illustrated NP with subtle animation, two captions, auto-end → "Preparing…" → summary.
  - Dashboard: new illustration and card text. "Visit summary saved" banner after Close.
  - Fixes found in browser checks: logo had a white box on light blue (made transparent), and main
    buttons were below the fold (now pinned).
- **2026-10-22: Feedback round 3 applied.**
  - My Fam: three columns, uniform tiles (You: "Your health" / "Account owner"; "Add a parent or loved one"),
    equal header padding, safe-area fix for iPhone notch (the cause of clipped header icons).
  - Scrollbars hidden inside the phone frame and the chat text box.
  - Passport: header heart moved left of the title. Relationship chips on one row. "Is this Sarah?" with a
    searching moment, person icon, Chicago area and privacy line.
  - Verify: short per-step headlines, Front/Back/Selfie icon row, "Front"/"Back" labels, "Scan front"/"Scan back",
    "Enter manually" · "Verify in store" links (no pop-up). Selfie: wider portrait camera, liveness runs when the camera
    opens (it was hidden below the fold before), then Take selfie → Matching → success.
  - You're verified: no checklist box, timeline subline "ID and selfie matched", picker fits above the button,
    progress bar fills through step 2 (in thirds) and shows a check when done.
  - Icon bug ("moon instead of airplane"): couldn't reproduce. Likely an accidental tap while scrolling over the
    half-hidden picker. The picker now fits without scrolling, and tests check the icon on My Fam, header and banner.
  - Chat: quick starts outlined until tapped, pill-icon medication card on every path, video icon on Start video call.
  - Summary: fixed demo time (Thu, Oct 22, 2026, 2:15 PM, also in Previous visits), "NP review: Pending" tag,
    identical action rows, "…at CVS Pharmacy".
  - Video: blurred clinic background, redrawn professional NP with stethoscope and "MinuteTwin" badge, placed
    so the badge stays clear of captions and buttons.
- **2026-10-22:** Sarah's Health title never wraps: 17px on phones under 400px wide, just "Sarah" under 350px
  (screen readers always hear "Sarah's Health"). Checked at 430/390/375/360/320px.
