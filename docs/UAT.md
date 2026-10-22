# User Acceptance Testing (UAT) Checklist

Walk through each check by hand in the browser, on a phone-sized view (375px wide) **and** a desktop window.
Tick a box when it passes. Update this list whenever a screen changes.

## General
- [ ] On a phone-sized view, the app fills the whole screen, with no sideways scrolling
- [ ] On a desktop window, it's a centered, phone-width column with rounded corners
- [ ] Main buttons are dark blue pills, always visible without scrolling. Large red areas appear only for 911/urgent messages
- [ ] Pressing **Tab** on the keyboard shows a clear outline on whatever is selected
- [ ] The AI is never called a nurse, "AI nurse" or "AI NP". It's "MinuteTwin (AI)" / "our AI care assistant"

## Splash and Welcome
- [ ] Reload the page: white screen, the red heart fades in and beats twice, then slides left as "CVSHealth" slides out ("lth" first, "CVS" last)
- [ ] The full logo holds, then glides up into the Welcome screen with no jump, as Welcome fades in. About 2.5 seconds total
- [ ] Tapping during the splash skips it
- [ ] Welcome: light blue hero (Concept prototype label, logo with no white box, big "Caregiver Passport", illustration)
- [ ] Four bullets with gray circles and red icons, including the lock bullet. **Get started** is always visible

## Flow 1: Caregiver Passport
- [ ] My Fam: "My Fam" and the chat/messages/cart icons have equal side padding, are vertically centered, and nothing is cut off at the top (also on an iPhone with a notch)
- [ ] Three-column tiles that all line up (icon, name, subtitle, tag): **You** (Your health · Account owner), Alex (Son · Full access), Maya (Daughter · Full access), **Add someone** ("Add a parent or loved one")
- [ ] No scrollbar is visible inside the phone on any screen (scrolling still works)
- [ ] Tapping You, Alex, Maya or a header icon shows "Not part of this demo"
- [ ] **Add someone** → "Who are you adding?" with the small CVS heart just **left of the title**. Step 1 of 3 on a light blue top section
- [ ] Only first name, last name, date of birth (04/12/1958) and relationship chips, all five on **one row**. Full-width **Next**
- [ ] Clearing First name or typing a partial date shows a helpful error
- [ ] **Next** → "Searching for Sarah's CVS account…" for about a second → "Is this Sarah?" card: person icon, Sarah M., Born April 1958, Chicago, IL area, and the privacy line. "Not her?" shows "Not part of this demo"
- [ ] **Yes, that's her** → Step 2 of 3: headline "Scan your driver's license or state ID", Front · Back · Selfie icons (Front highlighted)
- [ ] **Scan front** → "✓ Front scanned" → "Now scan the back" (barcode tip; Front is checked, and the progress bar has grown) → **Scan back**
- [ ] Under the button: "Enter manually" · "Verify in store" ("Not part of this demo")
- [ ] Selfie: a wide, portrait camera. "Slowly turn your head" shows straight away while the oval fills in. **Take selfie** stays gray until it's done, and only "Verify in store" is offered
- [ ] **Take selfie** → "Matching your selfie to your ID…" (about 1.5s) → success
- [ ] "You're verified": the stamp animation plays. Step 2 shows complete (✓), with no Back button and no separate checklist
- [ ] Timeline: "You're verified · ID and selfie matched", then Sarah approves, then "You can see her info"
- [ ] All of "Pick an icon for Sarah" (two rows) is visible above **Send request to Sarah** without scrolling. Airplane is selected
- [ ] **Enter manually** → your own ID details → **Verify me** → "You're verified · ID details matched"
- [ ] My Fam: "Step 3 of 3, Request sent", Sarah **Pending** with a ring and **New**. About 3s later, "Sarah approved your access" slides in and she shows **Full access**
- [ ] The green banner closes with × and fades out on its own
- [ ] The airplane (or whichever icon you picked) is Sarah's icon on My Fam, the dashboard header and the caregiver banner

## Flow 2: MinuteTwin
- [ ] My Fam card: "Talk to MinuteTwin, our AI care assistant trained by MinuteClinic nurse practitioners…" → **Start a MinuteTwin visit** opens "Who needs care?". Sarah opens her visit, and the others show "Not part of this demo"
- [ ] Sarah's Health: the title stays on one line next to the three icons, even on a narrow phone (just "Sarah" on the narrowest)
- [ ] Sarah's Health: illustration, MinuteTwin card ("everyday concerns like rashes, colds, and allergies"), and the profile icon (tap → My Fam)
- [ ] Chat opens with MinuteTwin's AI greeting, **outlined** quick-start buttons and "For emergencies, call 911." Tapping one fills it dark blue
- [ ] The rash message is pre-typed and fully visible, with no scrollbar in the box. **Send** → the quick starts disappear → typing dots → MinuteTwin asks for a photo and details
- [ ] The camera is highlighted. Tap it: the photo preview appears and the caption is pre-typed. **Send** → one bubble with photo and caption
- [ ] Pill card "Checked Sarah's medications: no recent changes." then the short message → **Start video call** (with a video camera icon) appears only there
- [ ] Video: soft blurred clinic background (no red heart or edge panels). A professional NP with a stethoscope and a "MinuteTwin" badge, both clear of the caption and buttons. Glow, breathing and blinking
- [ ] First caption → the self-view switches to Sarah's arm → second caption with a small nod → the call ends by itself
- [ ] "Preparing Sarah's visit summary…" → summary: green banner with **NP review: Pending**, "Thu, Oct 22, 2026, 2:15 PM", "Likely contact dermatitis", "Photo and video reviewed", care box, three identical action rows ("Find hydrocortisone cream at CVS Pharmacy", …)
- [ ] **Close** → Sarah's Health with "Visit summary saved". Previous visits shows **New** and "MinuteTwin visit, Oct 22, 2:15 PM: rash. Summary sent to NP."

## Other MinuteTwin paths
- [ ] **Cold or flu** / **Allergies** quick starts → two taps of Send → pill card, wrap-up message and a "View summary" card → matching summary
- [ ] Type "infected scrape on her knee" → the cut/scrape path. "she has a fever" → the fever path
- [ ] **Something else** → type "she seems off today" → "I can help with that. Can you tell me what Sarah is experiencing…"
- [ ] Type "chest pain" at any point before the video → red **Call 911 or go to the ER now** alert (and only then)
