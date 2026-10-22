// ─── Stamp timings (milliseconds from the start). Adjust freely. ──────────────
export const STAMP = {
  passportIn: 300, // passport booklet appears
  stampStart: 300, // red "VERIFIED" stamp starts dropping
  stampEnd: 800, // stamp lands (with a slight bounce)
  shakeEnd: 1100, // passport does a tiny shake
  contentIn: 1100, // the rest of the screen starts fading in…
  contentEnd: 1500, // …and is fully visible
};
// ──────────────────────────────────────────────────────────────────────────────

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Animation style helper: no movement for people who prefer reduced motion.
export const anim = (value) => (prefersReducedMotion() ? undefined : value);

/** "Passport stamped" animation for the "You're verified" screen. Original flat drawing. */
export default function PassportStamp() {
  const shake = anim(
    `passport-shake ${STAMP.shakeEnd - STAMP.stampEnd}ms ease-in-out ${STAMP.stampEnd}ms both`,
  );
  return (
    <div
      role="img"
      aria-label="Passport stamped VERIFIED"
      className="relative mx-auto h-36 w-28"
      style={{ animation: anim(`fade-up ${STAMP.passportIn}ms ease-out both`) }}
    >
      <svg viewBox="0 0 112 144" className="h-full w-full" style={{ animation: shake }}>
        <rect x="4" y="4" width="104" height="136" rx="10" fill="#1f4e95" />
        <rect x="4" y="4" width="10" height="136" rx="4" fill="#173d76" />
        <circle cx="60" cy="58" r="20" fill="none" stroke="#e8c76a" strokeWidth="3" />
        <path
          d="M60 68c-7-4.5-11-8.5-11-13a5.5 5.5 0 0 1 11-2 5.5 5.5 0 0 1 11 2c0 4.5-4 8.5-11 13z"
          fill="#e8c76a"
        />
        <rect x="34" y="96" width="52" height="4" rx="2" fill="#e8c76a" />
        <rect x="42" y="106" width="36" height="4" rx="2" fill="#e8c76a" />
      </svg>
      <span
        className="absolute left-1/2 top-[54%] -ml-[52px] flex w-[104px] items-center justify-center rounded-lg border-4 border-cvs-red bg-white/85 py-1 text-xl font-black tracking-wider text-cvs-red"
        style={{
          transform: 'rotate(-14deg)',
          animation: anim(
            `stamp-drop ${STAMP.stampEnd - STAMP.stampStart}ms cubic-bezier(.2,.8,.3,1.2) ${STAMP.stampStart}ms both`,
          ),
        }}
      >
        VERIFIED
      </span>
    </div>
  );
}

// Fade-in style for the content below the stamp (pass an extra delay to stagger items).
export const contentIn = (extra = 0) => ({
  animation: anim(
    `fade-up ${STAMP.contentEnd - STAMP.contentIn}ms ease-out ${STAMP.contentIn + extra}ms both`,
  ),
});
