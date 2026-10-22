# Handoff: Caregiver Passport + MinuteTwin

Hi Ellis! This is everything you need to take over. It should take about 5 minutes to read.

## 1. What this is
A clickable concept prototype for our **MPD-400 CVS Health** project, sized for a phone and running in the browser.
- **Caregiver Passport:** a caregiver (Manali) gets verified access to her mom Sarah's CVS health info.
- **MinuteTwin:** an AI digital twin of a MinuteClinic nurse practitioner, for everyday concerns like rashes, colds and allergies.

Everything is scripted. There's no real AI, no logins and no real data.

## 2. How to run it
You need Node.js 20 or newer (https://nodejs.org, choose "LTS"). In a terminal, in this folder:
```
npm install
npm run dev
```
Open **http://localhost:5173**. To see it as a phone, open Chrome DevTools (right-click → Inspect), click the phone icon and pick an iPhone. Refreshing the page restarts the demo.

## 3. The demo path
1. **Splash:** CVS heart animation (tap to skip)
2. **Welcome** → Get started
3. **My Fam** (home) → Add someone
4. **Who are you adding?** (pre-filled with Sarah) → Next
5. **Is this Sarah?** → Yes, that's her
6. **Verify it's you:** Scan front → Scan back → selfie (wait for the oval to fill) → Take selfie
7. **You're verified** → Send request to Sarah
8. **Approval:** Sarah shows *Pending*, then "Sarah approved your access" after about 3 seconds → tap Sarah
9. **Sarah's Health** → Start a MinuteTwin visit
10. **MinuteTwin chat:** tap Send → camera button → Send → Start video call
11. **Video:** ends by itself after about 8 seconds
12. **Visit summary** → Close → back to **Sarah's Health** ("Visit summary saved", *New* on Previous visits)

## 4. Key decisions and why
- **The caregiver verifies her own identity, and the loved one approves access.** This protects Sarah's privacy. The approval is shown as Pending, then approved, but Sarah's side isn't built.
- **"MinuteTwin" is always labeled as AI and never called a nurse.** "Not a real person" stays on the video because some states require AI disclosure in patient communication.
- **The form went from 7 questions to 4**, and the icon picker moved to the success screen. "Enter manually" and "Verify in store" are the fallbacks for scanning.
- **The chat is short:** message, photo, video, then straight to the visit summary. The "Checked Sarah's medications" card ties MinuteTwin back to the Passport access.
- **It matches the current CVS app style:** dark blue buttons, with red only for brand accents and urgent 911 messages.
- **Scripted conversation paths:** rash (the main demo), cut/scrape, cold, fever and allergies. Typing emergency words like "chest pain" always shows the 911 alert.

## 5. Open items
- **Small phones (375×740):** the verify steps' privacy note and My Fam's MinuteTwin button need a short scroll.
- **Placeholders:**
  - The NP video is an animated illustration. Swap in a real video in `src/config/media.js`.
  - The rash photo and the illustrations are simple drawings.
  - The other tabs and buttons show "Not part of this demo".
- **Pronouns:** the scripts say "her", because they were written for Sarah.

## 6. Where to find more
- `CLAUDE.md`: the full rules (UX, naming, visual style, definition of done). Cursor reads these too.
- `docs/PROGRESS.md`: the progress log, a map of the code and every decision so far.
- `docs/UAT.md`: the step-by-step test checklist.
- Script wording lives in `src/ai/twinScripts.js`, and timings are at the top of `Splash.jsx`, `Video.jsx` and `src/config/demo.js`.

## 7. Keep working in Cursor
- **Project rules load automatically** (`.cursor/rules/project.mdc`), so the agent follows `CLAUDE.md`.
- **Before you start:** ask the agent to read this file and `docs/PROGRESS.md`.
- **After each change:**
  - Run `npm test` and `npm run lint`.
  - Check the screen in the browser at phone size.
  - Add a line to `docs/PROGRESS.md`, then commit.
