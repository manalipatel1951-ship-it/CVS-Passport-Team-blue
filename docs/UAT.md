# User Acceptance Testing (UAT) Checklist

Walk through each check by hand in the browser, on a phone-sized view (375px wide) **and** a desktop window.
Tick a box when it passes. Update this list whenever a screen changes.

## General
- [ ] On a phone-sized view, the app fills the whole screen, with no sideways scrolling
- [ ] On a desktop window, it's a centered, phone-width column with rounded corners
- [ ] Main buttons are dark blue pills. Red appears only on the logo, icons, the active tab and emergencies
- [ ] Pressing **Tab** on the keyboard shows a clear outline on whatever is selected
- [ ] The words "nurse" and "AI nurse" never describe the AI (it's "MinuteTwin (AI)" or "AI NP")

## Welcome
- [ ] The CVS Health logo is sharp and centered, with a small "Concept prototype" label
- [ ] The benefit lines say "AI NP", not "AI nurse"
- [ ] **Get started** opens My Fam

## Flow 1: Caregiver Passport
- [ ] My Fam looks like a profile picker: Alex (Son, Full access), Maya (Daughter, Full access), **Add someone**
- [ ] My Fam has the bottom nav (Home highlighted), not a Back button
- [ ] Tapping Alex or Maya, Find Care or Vaccine Records shows "Not part of this demo"
- [ ] **Add someone** → "Step 1 of 3", pre-filled with Sarah's details, plus a "Pick an icon" row (airplane selected)
- [ ] Clearing First name and tapping **Next** shows an error
- [ ] **Next** → "Step 2 of 3", "Prove you're you", and the why-line about keeping Sarah's info safe
- [ ] **Scan front of ID** → **Scan back of ID** → **Take selfie** (round face frame)
- [ ] "You're verified" on a white screen with a green check, a checklist (ID scanned, Selfie matched), and what happens next
- [ ] **Send request to Sarah** → My Fam shows "Step 3 of 3, Request sent", and Sarah with a **Pending** tag, a ring and **New**
- [ ] After about 3 seconds, "Sarah approved your access" slides in, and Sarah becomes **Full access** and tappable
- [ ] Repeat with **Fill it in myself**: it asks for *your own* ID details → "You're verified" → the same ending

## Flow 2: MinuteTwin
- [ ] Before Sarah approves, going to `#/care/sarah` sends you back to My Fam
- [ ] Sarah's Health: Sarah's airplane icon at the top left (tap → My Fam), and chat/messages/cart buttons at the top right
- [ ] Neutral banner "Viewing Sarah's health as caregiver", light blue hero, MinuteTwin card with an AI badge
- [ ] Records list: Prescriptions, Upcoming appointments, Vaccine history, Previous visits. Each opens
- [ ] **Start a MinuteTwin visit** → title "MinuteTwin", "MinuteTwin (AI)" with the "Not a real person" subtitle
- [ ] The first message is already typed. Tap **Send** through the script, with no Video/Summary buttons early on
- [ ] When MinuteTwin asks for a photo, the camera button is highlighted. Tap it to send the rash photo
- [ ] **Start video call** appears only under the "quick video call?" message
- [ ] Video: full screen, "Connected" and a timer, the "MinuteTwin (AI). Not a real person" label, the "Sarah's visit" tag, and no Back button
- [ ] The caption "Hi there, can you show me the rash on Sarah's left upper arm?" appears, then the small view switches to Sarah's arm
- [ ] Mute and flip camera toggle. The red **End call** returns to the chat
- [ ] MinuteTwin explains contact dermatitis, followed by the "When to get more care" box (Call 911 strongest)
- [ ] "Thank you for the information" → closing message and a summary card → **View full summary**
- [ ] Summary: "Sent to Sarah's account…", visit details with today's date and a photo thumbnail, "Likely contact dermatitis", matching notes, what to do, the care box, three action buttons ("Not part of this demo"), and the "not a diagnosis" line
- [ ] **Close** → Sarah's Health. Previous visits shows **New**, and opening it shows "MinuteTwin visit today: rash. Summary sent to NP."

## Off-script checks (MinuteTwin)
- [ ] Clear the box and type "she has a cough" → the cold path, ending in its own summary
- [ ] "burning when she pees" → the possible UTI path (recommends a MinuteClinic visit)
- [ ] "she has a fever" → the fever path
- [ ] "she seems off today" → "I can help with that. Can you tell me what Sarah is experiencing…"
- [ ] "chest pain" → a red **Call 911 or go to the ER now** alert (and only then)
