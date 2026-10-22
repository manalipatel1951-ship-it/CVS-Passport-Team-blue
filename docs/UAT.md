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
- [ ] My Fam: header with chat/messages/cart icons. Tiles in order: **You**, Alex (Son, Full access), Maya (Daughter, Full access), **Add someone** ("Add a parent or anyone you care for")
- [ ] Tapping You, Alex, Maya or a header icon shows "Not part of this demo"
- [ ] **Add someone** → "Who are you adding?", Step 1 of 3 on a light blue top section, small CVS heart in the header
- [ ] Only first name, last name, date of birth (04/12/1958) and relationship chips. Full-width **Next**, with Back only at the top
- [ ] Clearing First name or typing a partial date shows a helpful error
- [ ] **Next** → "We found Sarah's account: Sarah M., born April 1958". "Not her?" shows "Not part of this demo"
- [ ] **Yes, that's her** → Step 2 of 3, progress row "ID front · ID back · Selfie", ID card illustration
- [ ] **Scan front of ID** → "✓ Front scanned" → back of ID (barcode tip) → selfie (portrait, face oval, hats/sunglasses tip, selfie privacy note)
- [ ] **Take selfie** → "Slowly turn your head" with the oval filling in → "Matching your selfie to your ID…" → success
- [ ] "You're verified": passport appears, the red VERIFIED stamp drops with a bounce, the passport shakes, then the screen fades in. No Back button
- [ ] Checklist, the "What happens next" timeline, "Pick an icon for Sarah" (airplane selected), **Send request to Sarah**
- [ ] **Verify another way** → "Enter your ID details manually" (your own ID) or "Verify in person at any CVS Pharmacy" ("Not part of this demo")
- [ ] My Fam: "Step 3 of 3, Request sent", Sarah **Pending** with a ring and **New**. About 3s later, "Sarah approved your access" slides in and she shows **Full access**
- [ ] The green banner closes with × and fades out on its own. The MinuteTwin card isn't hidden behind the bottom bar
- [ ] Pick a different icon for Sarah: it's used on My Fam, the dashboard header and the caregiver banner

## Flow 2: MinuteTwin
- [ ] My Fam card: "Talk to MinuteTwin, our AI care assistant trained by MinuteClinic nurse practitioners…" → **Start a MinuteTwin visit** opens "Who needs care?". Sarah opens her visit, and the others show "Not part of this demo"
- [ ] Sarah's Health: new illustration, MinuteTwin card ("everyday concerns like rashes, colds, and allergies"), and the profile icon (tap → My Fam)
- [ ] Chat opens with MinuteTwin's AI greeting, quick-start buttons and "For emergencies, call 911."
- [ ] The rash message is pre-typed and fully visible. **Send** → "MinuteTwin is typing" with dots → asks for a photo and details
- [ ] The camera is highlighted. Tap it: the photo preview appears and the caption is pre-typed. **Send** → one bubble with photo and caption
- [ ] MinuteTwin asks for a quick video call. **Start video call** appears only there
- [ ] Video: illustrated NP with a soft glow, breathing and blinking, the "MinuteTwin (AI). Not a real person" label, timer, "Sarah's visit"
- [ ] First caption ("Thanks for the photo… closer to the rash…"), the self-view switches to Sarah's arm, second caption with a small nod, and the call ends by itself
- [ ] "Preparing Sarah's visit summary…" → summary ("Likely contact dermatitis", photo thumbnail, "Photo and video reviewed", care box, actions, not-a-diagnosis line)
- [ ] **Close** → Sarah's Health with "Visit summary saved". Previous visits shows **New** and "MinuteTwin visit today: rash…"

## Other MinuteTwin paths
- [ ] **Cold or flu** / **Allergies** quick starts → two taps of Send → wrap-up message and a "View summary" card → matching summary
- [ ] Type "infected scrape on her knee" → the cut/scrape path. "she has a fever" → the fever path
- [ ] **Something else** → type "she seems off today" → "I can help with that. Can you tell me what Sarah is experiencing…"
- [ ] Type "chest pain" at any point before the video → red **Call 911 or go to the ER now** alert (and only then)
