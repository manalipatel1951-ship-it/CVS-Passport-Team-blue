// Demo timing (milliseconds). Tests set these to 0 so they run instantly.
// The splash animation, the "VERIFIED" stamp and the video call keep their own
// timings at the top of their files (src/screens/Splash.jsx, PassportStamp.jsx, Video.jsx).
export const DELAYS = {
  scan: 1500, // pretend ID scan
  frontScanned: 1000, // "✓ Front scanned" before switching to the back of the ID
  liveness: 1800, // selfie: "Slowly turn your head" while the oval fills in
  matching: 1500, // "Matching your selfie to your ID…"
  typing: 1000, // MinuteTwin "typing…" pause before each reply
  approval: 3000, // how long until "Sarah approved your access" appears on My Fam
  bannerVisible: 6000, // how long green banners stay before fading out
  preparing: 1500, // "Preparing Sarah's visit summary…" after the video call
  notice: 2500, // how long "Not part of this demo" messages stay up
};

// Show the animated CVS splash every time the demo starts (tests turn it off).
export const DEMO = { showSplash: true };
