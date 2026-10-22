# Caregiver Passport (Concept Prototype)

A clickable, phone-sized demo for a class project. It's a student concept, not a real CVS Health product.
A caregiver (Manali) gets access to her mom Sarah's health information, then gets help from a clearly
labeled **AI** nurse practitioner "digital twin". All data and AI replies are fake.

**New to the project?** Read [CLAUDE.md](CLAUDE.md) (rules), then [docs/PROGRESS.md](docs/PROGRESS.md) (what's done and what's next).

## Run it on your computer

1. Install **Node.js** (version 20 or newer) from https://nodejs.org (choose "LTS").
2. Open a terminal in this project folder and run:
   ```
   npm install
   npm run dev
   ```
3. Open the link it prints (usually http://localhost:5173) in your browser.
4. To see the phone view on a computer, open your browser's developer tools and turn on device mode (in Chrome: right-click → Inspect → the phone/tablet icon), then pick an iPhone.

## Useful commands

| Command          | What it does                                                 |
| ---------------- | ------------------------------------------------------------ |
| `npm run dev`    | Starts the demo in your browser and updates it as you edit   |
| `npm test`       | Runs the automated checks, including accessibility           |
| `npm run lint`   | Looks for code mistakes                                      |
| `npm run format` | Tidies code formatting                                       |
| `npm run build`  | Makes a finished copy in `dist/` that can be hosted anywhere |

## Where things live

| Folder / file     | What's in it                                                    |
| ----------------- | --------------------------------------------------------------- |
| `src/screens/`    | One file per screen                                             |
| `src/components/` | Shared building blocks (phone frame, Back button, …)            |
| `src/index.css`   | Brand colors (CVS red `#CC0000`). Change them here once         |
| `public/brand/`   | The logo image                                                  |
| `docs/`           | Brief, plan, progress log, and the user-testing checklist (UAT) |
