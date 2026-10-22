// Demo timing (milliseconds). Tests set these to 0 so they run instantly.
// The splash animation, the "VERIFIED" stamp and the video call keep their own
// timings at the top of their files (src/screens/Splash.jsx, PassportStamp.jsx, Video.jsx).
export const DELAYS = {
  searching: 1000, // "Searching for Sarah's CVS account…"
  scan: 1500, // pretend ID scan
  frontScanned: 1000, // "✓ Front scanned" before switching to the back of the ID
  liveness: 2000, // selfie: "Slowly turn your head" while the oval fills in (then Take selfie unlocks)
  matching: 1500, // "Matching your selfie to your ID…"
  typing: 1000, // MinuteTwin "typing…" pause before each reply
  approval: 3000, // how long until "Sarah approved your access" appears on My Fam
  bannerVisible: 6000, // how long green banners stay before fading out
  preparing: 1500, // "Preparing Sarah's visit summary…" after the video call
  notice: 2500, // how long "Not part of this demo" messages stay up
};

// Show the animated CVS splash every time the demo starts (tests turn it off).
export const DEMO = {
  showSplash: true,
  // Fixed date and time for the MinuteTwin visit, so the demo always shows the same thing
  // (summary screen and Previous visits). Local time.
  visitTime: '2026-10-22T14:15:00',
};
