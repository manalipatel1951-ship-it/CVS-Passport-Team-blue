# Caregiver Passport — Project Rules

Clickable, phone-sized demo prototype for a class project (CVS Health concept).
**Multiple teammates work on this in turn.** Before doing anything, read:

1. `docs/PROGRESS.md` — what's done, what's next, open questions (the handoff log)
2. `docs/PLAN.md` — the original build plan (later feedback in `docs/PROGRESS.md` wins over it)
3. `docs/BRIEF.md` — the original project brief
4. `reference/cvs-app-dashboard.png` — the real CVS Health app screen we match the look of

## How to work

- Act as a Senior Product Manager + Senior Product Designer, not just a coder: question unclear requirements and protect the UX.
- Teammates may not be deeply technical — explain things in plain language.
- Ask questions before building if anything is unclear. Plan first, then build.
- When Manali sends feedback in several messages, **wait until all of it is in** before editing, then ask any open questions together.
- Polish **one screen at a time** where possible, show it (screenshot + how to open it), and wait for approval.
- After each approved step: update `docs/PROGRESS.md`, then **git commit** with a plain-language message. Never push unless asked.
- Keep the project hand-off ready: everything a teammate needs lives in this repo (not in local plans or memory).
- Check changes in a real browser at phone width, not only with tests (some bugs only show up in Chrome).

## Product facts

- Caregiver: **Manali**, a mom of two (**Alex**, son; **Maya**, daughter) who is now also caring for her mother **Sarah** (Sarah Miller). All data is dummy data.
- No real logins, no real database, no live AI.
- **Flow 1, Caregiver Passport** (3 steps): 1) About your loved one (form + pick an icon) → 2) Verify it's you: the **caregiver** scans the front and back of **her own** ID, then takes a selfie matched to the ID photo (or "Fill it in myself") → 3) Approval: Sarah shows as **Pending** on My Fam, then "Sarah approved your access" appears after ~3 seconds. Sarah's own approval screens are out of scope.
- **Flow 2, MinuteTwin** (the NP digital twin feature): Sarah's Health dashboard → MinuteTwin chat → video call (only when the script asks) → back to chat → visit summary → Close → Sarah's Health ("Previous visits" shows "New").
- Flow 2 is locked until Sarah has approved access.
- **MinuteTwin chat is scripted** (`src/ai/twinScripts.js`): the caregiver's next message is pre-typed so the presenter just taps Send. Paths: **rash** (the main demo, with photo + video), **infection** (possible UTI), **cough/cold**, **fever**. A message that matches no path gets "I can help with that. Can you tell me what Sarah is experiencing and when it started?" The 911 alert appears **only** when emergency words are actually typed.

## Naming

- The feature is **MinuteTwin**. In the chat and video, the AI is labeled **"MinuteTwin (AI)"** with "Digital twin of a MinuteClinic nurse practitioner. Not a real person."
- In general copy (e.g. the Welcome screen) it's an **"AI NP"**. **Never** call it a nurse or "AI nurse".

## UX rules

- Busy, stressed, working caregivers: simple screens, one main task per screen.
- Always show whose info is being viewed with a **neutral** banner (gray/white, not pink or red) showing the person's icon, e.g. "Viewing Sarah's health as caregiver". On the video call, a small neutral "Sarah's visit" label instead.
- MinuteTwin is always clearly labeled as AI, never presented as a real person.
- "When to get more care" (MinuteClinic → Urgent care → Call 911) must be hard to miss, with **Call 911 visually strongest**.
- Always offer a manual alternative to scanning or face matching ("Fill it in myself").
- Plain language, no medical jargon.
- Large, easy-to-tap buttons (≥48px) and readable text (≥16px).
- Every screen has a clear way to go back. **Exceptions:** My Fam is the home screen (bottom nav instead of Back), and the video call has no Back button (End call returns to the chat).
- Features outside the demo (other tabs, header icons, summary actions, Alex/Maya) show a "Not part of this demo" pop-up.
- Mobile-first and responsive: full-screen on phones, centered phone-width column on tablet/desktop.

## Visual style (match `reference/cvs-app-dashboard.png`, but don't copy its illustrations)

- Big bold headlines; light gray page background; light blue hero sections; white rounded cards.
- **Primary buttons are dark blue** (`cvs-blue`), pill-shaped. **Red is for the brand, icons, the active tab, and emergencies** only.
- Floating rounded bottom nav: Home (My Fam) · Your Health · Find Care · Vaccine Records.
- Health screens' header: the person's profile icon on the left (tap to switch profiles via My Fam), title, and round chat / messages / cart buttons on the right.
- People are shown with fun, original **profile icons** (Sarah = airplane, Alex = rocket, Maya = sunflower), never letter initials.
- Colors live in `src/index.css`; profile icons in `src/components/ProfileIcon.jsx`.

## Definition of done (every step)

- Works at phone width (375px) and on desktop
- Accessible (WCAG AA: contrast, labels, keyboard, screen-reader names)
- Automated tests pass (`npm test`), lint clean (`npm run lint`)
- A UAT checklist entry added to `docs/UAT.md`
