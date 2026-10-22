# Caregiver Passport: Build Plan

## Context
This is a clickable, phone-sized demo prototype for a class project, for CVS Health. **Manali** (the caregiver) gets access to her mother **Sarah**'s CVS Health information (Flow 1: Caregiver Passport). She then gets help for a minor health issue from an AI "digital twin" of a nurse practitioner instead of taking time off for a MinuteClinic walk-in (Flow 2: NP Digital Twin). Everything is fake: no real logins, database or live AI. The repo is currently empty apart from CLAUDE.md.

The user is not deeply technical. Explain everything in plain language.

## Working agreement
- **Role:** act as a Senior Product Manager and Senior Product Designer, not just a coder. Question unclear requirements and protect the UX.
- **Understand before building:** ask questions whenever anything is unclear.
- **Plan first, then build one screen at a time:** after each screen, show it to the user (screenshot plus how to open it) and stop until they approve.
- **Git:** commit after each approved piece, with a plain-language commit message. Never push unless asked.
- **Dummy data only.**
- **Mobile-first and responsive:** full screen on phones; on tablet and desktop, a centered phone-width column (about 430px max).
- **Definition of done for each piece:** works at 375px and on desktop, meets WCAG AA (contrast, labels, keyboard, screen-reader names), automated tests pass, no lint errors, and a UAT checklist entry exists.

## UX rules (from the brief)
- One main task per screen, for busy and stressed caregivers.
- A persistent context banner such as "Viewing Sarah's dashboard as caregiver" on every screen for the loved one.
- The NP twin is always labeled as AI (badge plus name, e.g. "AI Nurse Practitioner (Digital Twin)"), never presented as a real person.
- Escalation (in-person care, urgent care or ER) appears as a large red alert card that's hard to miss.
- A manual alternative ("Fill it in myself") wherever scanning or face recognition is used.
- Plain language and no jargon. Tap targets of at least 48px and body text of at least 16px.
- CVS look: red #CC0000 on white, clean. The real CVS Health logo goes on the Welcome screen, with a small "Concept prototype" label.
- A visible Back control on every screen.

## Tech stack (plain-language version)
- **React + Vite**: builds the screens as reusable pieces and previews instantly in the browser.
- **Tailwind CSS**: styling, which makes mobile-first, responsive layouts easy. CVS red is defined once as a theme color.
- **React Router (HashRouter)**: moves between screens, and works if the demo is later hosted as plain files.
- **Vitest + Testing Library + vitest-axe**: automated tests, including accessibility checks.
- **ESLint + Prettier**: catches errors and keeps code formatting consistent.

## Project layout
- `public/brand/cvs-health-logo.png`: the logo as its own file, easy to swap or resize. The user shared it in chat (red heart, "CVS" in red, "Health" in black, on white), but a chat image can't be saved to disk. The user will drop the file into the project folder and I'll move it here. Until then, a placeholder with the same dimensions is used.
- `src/data/family.js`: fake family members (two existing members, plus Sarah (Mom) once she's added).
- `src/data/sarah.js`: fake dashboard data (prescriptions, appointments, vaccines).
- `src/ai/responses.js`: the "smart fake" AI's reply library.
- `src/ai/matchReply.js`: picks a reply by matching keywords in what the caregiver types.
- `src/config/media.js`: `npVideoSrc: null`. Set it to a video file later and the video screen plays it instead of the placeholder.
- `src/state/AppState.jsx`: whether Sarah has been added, plus the chat transcript and detected topic, which the summary uses.
- `src/components/`: PhoneShell, ContextBanner, BackButton, BigButton, AIBadge, EscalationAlert, BottomNav, Avatar.
- `src/screens/`: one file per screen (listed below).
- `docs/UAT.md`: a step-by-step test script for the user to sign off.

## "Smart fake" AI (open-ended, no live AI)
- The caregiver can type anything. `matchReply` checks for keywords and returns a scripted, plain-language reply. Each topic has 2–3 follow-up turns and a summary.
- **Topics covered:** rash or skin, sore throat, cough or cold, fever, minor cut or burn, pink eye, earache, upset stomach, headache, and medication questions.
- **Emergency words** (chest pain, trouble breathing, face drooping, fainting, severe bleeding) return an immediate red **"Call 911 / go to the ER"** alert.
- **Warning words** (high fever, spreading, worsening, several days) return an "urgent care / in-person" alert.
- **Fallback:** a gentle clarifying question. If there's still no match, it offers an in-person visit.
- **Photo:** an attach button inserts a sample photo with dummy art, and the AI acknowledges it.
- The chat shows a "typing…" pause, and every AI bubble carries the AI badge.
- A "Switch to video" button opens the video screen. The NP's line adapts to the topic, e.g. "Hi there, can you show me where it hurts?"
- The summary is built from the detected topic: notes, recommendations, any escalation alert, and a "Sent to NP" confirmation.

## Build order (one step at a time; stop for approval and commit after each)
0. **Setup:** scaffold the project, theme, PhoneShell, Back button and routing. Show a blank shell on phone and desktop.
1. **Welcome screen:** logo, "Concept prototype" label, Get started.
2. **My Fam:** existing avatars and a + button. Existing members show "Caregiver access not set up".
3. **Add family member form:** CVS-account yes/no, name and personal info, Back and Next, with validation.
4. **Scan ID:** camera frame mockup, simulated scan and face check, and a "Fill it in myself" option that opens a manual entry form.
5. **My Fam (updated):** Sarah (Mom) appears with a "Sarah has been added" confirmation. Approval screens are out of scope.
6. **Sarah's dashboard:** context banner, a "Talk to AI" tile, health cards and bottom navigation. It can only be reached after Flow 1 is complete.
7. **Chat start:** "How can we help?" plus the input bar.
8. **Chat conversation:** the smart-fake engine, photo attach and escalation alerts.
9. **Video screen:** swappable NP media, self-view in the corner, mute and end-call buttons, the AI label and a caption.
10. **Summary:** notes, recommendations, "Sent to NP", and Close, which returns to Sarah's dashboard.
11. **Final pass:** full responsive and accessibility sweep, the complete UAT script, and README instructions for running it.

## After approval, before step 0
- Replace CLAUDE.md's "test" content with the working agreement and UX rules above, so they carry over to future sessions.
- Save the user's working-style preferences to memory.

## Verification
- `npm run dev`: open in the browser at phone width (375px in device mode) and at desktop width.
- `npm test`: unit tests (including `matchReply` emergency detection), component tests and axe accessibility checks.
- `npm run lint`: clean.
- After each step, a screenshot for the user. At the end, the user walks through `docs/UAT.md` covering Welcome → add Sarah → dashboard → chat → video → summary → back to dashboard, including the manual-entry path and an emergency-keyword path.
