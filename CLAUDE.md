# Caregiver Passport — Project Rules

Clickable, phone-sized demo prototype for a class project (CVS Health concept).
**Multiple teammates work on this in turn.** Before doing anything, read:

1. `docs/PROGRESS.md` — what's done, what's next, open questions (the handoff log)
2. `docs/PLAN.md` — the full approved build plan
3. `docs/BRIEF.md` — the original project brief

## How to work

- Act as a Senior Product Manager + Senior Product Designer, not just a coder: question unclear requirements and protect the UX.
- Teammates may not be deeply technical — explain things in plain language.
- Ask questions before building if anything is unclear. Plan first, then build.
- **Current approach (changed 2026-10-21):** Phase A: build both flows end to end with rough placeholder styling so every screen is clickable. Show the whole demo. Phase B: polish **one screen at a time**, showing each one (screenshot + how to open it) and waiting for approval before moving on.
- After each approved step: update `docs/PROGRESS.md`, then **git commit** with a plain-language message. Never push unless asked.
- Keep the project hand-off ready: everything a teammate needs lives in this repo (not in local plans or memory).

## Product facts

- Caregiver: **Manali**. Loved one: **Sarah (Mom)**. All data is dummy data.
- No real logins, no real database, no live AI. The NP Digital Twin chat is a "smart fake": keyword-matched, pre-written replies.
- The Caregiver Passport (Flow 1) must be completed before the NP Digital Twin (Flow 2) is usable.
- The loved one's approval screens are out of scope.

## UX rules

- Busy, stressed, working caregivers: simple screens, one main task per screen.
- Always show whose info is being viewed (e.g. "Viewing Sarah's dashboard as caregiver").
- The NP Digital Twin is always clearly labeled as AI — never presented as a real person.
- In-person / urgent care / ER recommendations must be hard to miss (large red alert).
- Always offer a manual alternative to scanning or facial recognition ("Fill it in myself").
- Plain language, no medical jargon.
- Large, easy-to-tap buttons (≥48px) and readable text (≥16px).
- CVS look: red `#CC0000` and white, clean. CVS Health logo image on the welcome screen with a small "Concept prototype" label.
- Every screen has a clear way to go back.
- Mobile-first and responsive: full-screen on phones, centered phone-width column on tablet/desktop.

## Definition of done (every step)

- Works at phone width (375px) and on desktop
- Accessible (WCAG AA: contrast, labels, keyboard, screen-reader names)
- Automated tests pass (`npm test`), lint clean (`npm run lint`)
- A UAT checklist entry added to `docs/UAT.md`
