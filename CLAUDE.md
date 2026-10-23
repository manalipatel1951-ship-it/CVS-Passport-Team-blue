# Caregiver Passport — Project Rules

Clickable, phone-sized demo prototype for a class project (CVS Health concept).
**Multiple teammates work on this in turn.** Before doing anything, read:

0. `HANDOFF.md`: one-page overview (what it is, how to run it, the demo path, key decisions)
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
- **Start of the demo:** an animated CVS Health splash (heart fades in → two heartbeats → heart slides left while "CVSHealth" slides out from behind it → hold → the logo glides up into its Welcome spot while Welcome fades in). About 2.4s, plays every time the demo starts, tap to skip. Timings at the top of `src/screens/Splash.jsx`. Uses the real logo file split by clipping; **never redraw the logo**.
- **Flow 1, Caregiver Passport** (3 steps):
  1. "Who are you adding?": first name, last name, date of birth (US format 04/12/1958), relationship chips on one row. Then "Searching for Sarah's CVS account…" (~1s) → "Is this Sarah?" card (person icon, Sarah M., born April 1958, Chicago, IL area, privacy note) → "Yes, that's her".
  2. Verify it's you: the **caregiver** verifies **herself**. Each step has one short headline and a Front · Back · Selfie icon row. ID front → "Front scanned" → ID back → selfie: the liveness cue ("Slowly turn your head", the oval fills) runs as soon as the camera opens, and **Take selfie** unlocks when it's done → "Matching your selfie to your ID…" → "You're verified" (stamp animation, timeline starting "You're verified · ID and selfie matched", **pick an icon for Sarah** fully visible, "Send request to Sarah"). Under the main button: "Enter manually" · "Verify in store" (selfie step: "Verify in store" only).
  3. Approval: Sarah shows as **Pending** on My Fam, then "Sarah approved your access" slides in after ~3 seconds. Sarah's own approval screens are out of scope.
- **Flow 2, MinuteTwin:** Sarah's Health → MinuteTwin chat → (rash path) video call → "Preparing Sarah's visit summary…" → visit summary → Close → Sarah's Health with "Visit summary saved" and "New" on Previous visits. My Fam's "Start a MinuteTwin visit" opens a "Who needs care?" picker.
- Flow 2 is locked until Sarah has approved access.
- **MinuteTwin chat is scripted** (`src/ai/twinScripts.js`). It opens with MinuteTwin introducing itself as AI, plus quick-start buttons (Rash or skin issue · Cold or flu · Allergies · Something else). They're all outlined until one is tapped (then it fills dark blue), and they disappear once the first message is sent. The caregiver's next message is always pre-typed, so the presenter just taps Send. Every path has the same short shape: message → one combined question → pre-filled answer → wrap-up.
  - **Rash** (main demo): message → photo + caption sent together → pill-icon card "Checked Sarah's medications: no recent changes." + "Can we do a quick video call?" (button with a video camera icon) → video → summary (no more chat after the call).
  - Every path shows the pill-icon medications card before MinuteTwin's conclusion.
  - **Infected cut/scrape, cold, fever, allergies:** wrap-up message plus a "View summary" card in the chat.
  - "When to get more care" appears **only on the summary screen**. No quick-reply buttons for now.
  - A message that matches no path gets "I can help with that. Can you tell me what Sarah is experiencing and when it started?" The 911 alert appears **only** when emergency words are actually typed.

## Naming

- The feature is **MinuteTwin**: "our AI care assistant trained by MinuteClinic nurse practitioners". In the chat and video it's labeled **"MinuteTwin (AI)"**, "Not a real person".
- **Never** call it a nurse, an "AI nurse", or an "AI NP".
- Describe what it helps with as **"everyday concerns like rashes, colds, and allergies"**, not "minor issues".

## UX rules

- Busy, stressed, working caregivers: simple screens, one main task per screen. Keep the main button visible (pin it to the bottom when a screen scrolls).
- Always show whose info is being viewed with a **neutral** banner (gray/white, not pink or red) showing the person's icon, e.g. "Viewing Sarah's health as caregiver". On the video call, a small neutral "Sarah's visit" label instead.
- MinuteTwin is always clearly labeled as AI, never presented as a real person.
- "When to get more care" (MinuteClinic → Urgent care → Call 911) must be hard to miss, with **Call 911 visually strongest**. "For emergencies, call 911." sits above the chat box.
- Always offer a manual alternative to scanning or face matching ("Verify another way").
- Plain language, no medical jargon.
- Large, easy-to-tap buttons (≥48px) and readable text (≥16px).
- Every profile tile (My Fam, "Who needs care?") has the same structure and height: icon · name · subtitle · tag. My Fam uses three columns.
- Headers: equal left and right padding, title vertically centered with the icons. Titles never wrap: on Sarah's Health the title is slightly smaller on narrow phones, and just the first name under 350px wide. On Caregiver Passport steps, the small CVS heart sits **just left of the title** (never top right, where it looks like a favorite button).
- No visible scrollbars inside the phone (scrolling still works). Respect the iPhone notch and home indicator (safe areas).
- The visit uses a fixed demo date and time: **Thu, Oct 22, 2026, 2:15 PM** (`DEMO.visitTime` in `src/config/demo.js`), on the summary and in Previous visits.
- Every screen has a clear way to go back. **Exceptions:** My Fam is the home screen (bottom nav instead of Back), "You're verified" has no Back (the ID is already verified), and the video call has no Back (End call ends it).
- Features outside the demo (other tabs, header icons, summary actions, "You", Alex/Maya, "Not her?", in-person verification) show a "Not part of this demo" pop-up.
- Green success banners can be closed with × and fade out on their own.
- Animations respect the phone's "reduce motion" setting.
- Mobile-first and responsive: full-screen on any phone size. On tablet/desktop, a centered phone the shape of a regular iPhone (390×844) with a thick black edge.

## Visual style (match `reference/cvs-app-dashboard.png`, but don't copy its illustrations)

- Big bold headlines; light gray page background; light blue hero sections; white rounded cards.
- **Primary buttons are dark blue** (`cvs-blue`), pill-shaped. **Red is for the brand and small accents only**: icons, the active tab, progress bars, step check marks, the privacy shield. Large red areas are reserved for urgent messages like the 911 alert.
- Caregiver Passport steps share branding: a small CVS heart in the header, a light blue top section behind the step indicator and intro, and small flat illustrations (ID card, face).
- Floating rounded bottom nav: Home (My Fam) · Your Health · Find Care · Vaccine Records.
- My Fam and health screens' header: round chat / messages / cart buttons on the right. Health screens also show the person's profile icon on the left (tap → My Fam).
- People are shown with fun, original **profile icons** (You = star, Sarah = whatever was picked, airplane by default; Alex = rocket; Maya = sunflower), never letter initials.
- Illustrations are original flat drawings (`CaregiverIllustration.jsx`, `NpIllustration.jsx`). The NP on the video call is a professional adult in a white coat with a visible stethoscope and a "MinuteTwin" name badge, on a soft blurred light blue clinic background. She has subtle "live" movement and a digital-twin glow.
- Summary action buttons are identical list rows (icon · label · arrow). A "NP review: Pending" tag sits in the green confirmation banner.
- Colors live in `src/index.css`; profile icons in `src/components/ProfileIcon.jsx`; the logo is `public/brand/cvs-health-logo.png` (transparent background).

## Definition of done (every step)

- Works at phone width (375px) and on desktop
- Accessible (WCAG AA: contrast, labels, keyboard, screen-reader names)
- Automated tests pass (`npm test`), lint clean (`npm run lint`)
- A UAT checklist entry added to `docs/UAT.md`
