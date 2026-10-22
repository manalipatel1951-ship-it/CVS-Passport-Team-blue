# User Acceptance Testing (UAT) Checklist

Walk through each check by hand in the browser, on a phone-sized view (375px wide) **and** a desktop window.
Tick a box when it passes. Add a section here every time a new screen is built.

## Step 0: Phone frame
- [ ] On a phone-sized view, the white frame fills the whole screen, with no sideways scrolling
- [ ] On a desktop window, the frame is a centered, phone-width column with rounded corners
- [ ] The **Back** button is easy to see, red, and big enough to tap comfortably
- [ ] Pressing **Tab** on the keyboard shows a clear red outline on the Back button

## Step 1: Welcome screen
- [ ] The CVS Health logo is sharp and centered, with no big empty gap around it
- [ ] A small "Concept prototype" label is visible at the top
- [ ] There is no Back button (this is the first screen)
- [ ] The three benefit lines are easy to read and in plain language
- [ ] The red **Get started** button sits at the bottom, within easy thumb reach
- [ ] Tapping **Get started** opens the next screen (currently a "Coming soon" page with a Back button to return)

## Phase A: Both flows, end to end (rough styling)
Flow 1 (Caregiver Passport)
- [ ] Welcome → **Get started** opens My Fam (Alex and Maya, plus **Add someone**)
- [ ] Tapping Alex or Maya explains that caregiver access isn't set up for them
- [ ] **Add someone** opens the form, pre-filled with Sarah's details. Clearing First name and tapping **Next** shows an error
- [ ] **Next** → **Scan ID** → **Start face check** → **Add Sarah** returns to My Fam with "Sarah has been added"
- [ ] Repeat using **Fill it in myself** instead of scanning: it also ends with "Sarah has been added"

Flow 2 (NP Digital Twin)
- [ ] Before adding Sarah, going to `#/care/sarah` sends you back to My Fam
- [ ] Tap Sarah → the dashboard shows "Viewing Sarah's dashboard as caregiver"
- [ ] **Talk to AI** → "How can we help?" with the AI label ("Not a real person")
- [ ] Type "she has a rash" → the AI asks follow-up questions. The camera button sends a sample photo
- [ ] Type "it's spreading" → a red **Get seen in person today** box appears
- [ ] Type "chest pain" (in a new chat) → a red **Call 911 or go to the ER now** box appears
- [ ] **Video call** → AI placeholder, "You" box in the corner, AI label, Mute/Unmute, **End call**
- [ ] The summary shows "Sent to NP", the red box (if any), notes and what to do. **Close** returns to Sarah's dashboard
- [ ] Every screen has a working **Back** button
