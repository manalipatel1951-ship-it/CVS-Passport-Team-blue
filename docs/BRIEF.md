# Caregiver Passport: Project Brief

> **Decisions made after this brief was written (these win over the text below):**
> - Caregiver is **Manali**, loved one is **Sarah (Mom)**. "Bob" and the rash were only workflow examples.
> - The chat is **open-ended**: the caregiver can type anything; a "smart fake" (keyword-matched, pre-written replies) answers. Still no live AI.
> - See `docs/PLAN.md` for the full approved plan.

## Product context
User: a caregiver who needs access to their loved one's CVS Health information.
They should see the same information the loved one sees in their own CVS Health app.
This is a clickable demo prototype for a class project. No real logins, no real
database, no live AI. All data and AI responses are fake and scripted.

## Format
Mobile app. Build phone-sized screens that run in the browser.

## Logo
Use the CVS Health logo image on the welcome screen and save it as a separate
file in the project so it's easy to swap or resize later.

## Flow 1: Caregiver Passport (adding a loved one)
1. Welcome screen: CVS Health logo (the image provided), with a small
   "Concept prototype" label so it's clear this is a student concept
2. My Fam: shows existing family members as avatars, with a + button to add someone
3. Add family member form (CVS screen):
   - Does this person already have a CVS account? (yes/no radio buttons)
   - Their name and personal info (entry fields)
   - Back and next buttons
4. Scan ID: camera frame to scan the loved one's driver's license or ID
   (and facial recognition for identity verification). Include a
   "Fill it in myself" option for people who struggle with scanning or
   facial recognition, which opens a manual entry form instead
5. My Fam: the new person now appears as an avatar, with a confirmation
   that they've been added. Do not build the loved one's approval screens.
   In real life the loved one would approve access, but that step is out of
   scope for this demo

## Flow 2: NP Digital Twin (getting care)
Problem: when the loved one has a minor issue (like a rash), the caregiver often
has to take time off work and bring them to a MinuteClinic walk-in.
Solution: the caregiver can chat or video call with an AI "digital twin" of a
real nurse practitioner, trained on information from real CVS NPs. It helps the
caregiver the same way a walk-in NP visit would, and tells them when the issue
needs in-person care, urgent care, or the ER. "NP Digital Twin" is a working
title and may change.

1. My Fam: caregiver taps on a family member's avatar
2. Loved one's dashboard (e.g. "Bob's Dashboard"): tiles including
   "Talk to AI", other health info cards, bottom navigation bar
3. Chat start: "How can we help?" with a message input bar
4. Chat conversation: fully scripted messages about a rash on the loved one,
   including the caregiver sending a photo of the rash
5. Video screen: NP digital twin in the main view, caregiver's small
   self-view in the corner, call buttons (mute, end call). The NP says
   "Hi there, can you show me where the rash is located?" Use a placeholder
   for now (a gray box or avatar image with that line as a caption). We will
   replace it with a real video later, so build it so the video is easy to
   swap in. No full video call needed
6. Summary screen: visit summary with a list of notes/recommendations,
   "Sent to NP" confirmation, and a Close button
7. Close returns the caregiver to the loved one's dashboard

## How the flows connect
- The caregiver must complete the Caregiver Passport before using the NP Digital Twin

## UX rules
- Users are busy, working caregivers who are often stressed. Keep screens
  simple, one main task per screen
- Always show whose information the caregiver is viewing
  (e.g. "Viewing Bob's dashboard as caregiver")
- The NP Digital Twin must be clearly labeled as AI, never presented as a real person
- When the AI recommends in-person care, urgent care, or the ER, make that
  message hard to miss
- Always offer a manual alternative when something relies on scanning or
  facial recognition
- Use plain language, no medical jargon
- Buttons and text should be large and easy to tap on a phone
- Use CVS's look: red (#CC0000) and white, clean, with the CVS logo image
  on the welcome screen
- Every screen should have a clear way to go back

## How to work with me
- I'm not deeply technical, so explain things in plain language
- Ask me questions before building if anything is unclear
- Build one screen or step at a time and show me before moving on
- Commit to git after each piece works
