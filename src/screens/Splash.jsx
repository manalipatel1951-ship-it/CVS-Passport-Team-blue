import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HEART_SPLIT, LOGO_ASPECT, LOGO_SRC } from '../components/CvsLogo.jsx';

// ─── Splash timings (milliseconds from the start). Adjust freely. ─────────────
// Reference: reference/cvs-splash-reference.png (the real CVS Health app's launch animation)
export const SPLASH = {
  heartFadeEnd: 300, // 1. red heart fades in, centered
  beatsEnd: 1200, // 2. two quick heartbeats
  revealEnd: 1600, // 3. heart slides left while "CVSHealth" slides out from behind it
  holdEnd: 2000, // 4. full logo holds, centered
  glideEnd: 2400, // 5. logo glides (and scales) to its Welcome spot while Welcome fades in
  beatScale: 1.12, // how big each heartbeat gets
  logoWidth: 300, // logo width (px) while centered on the splash
};
// ──────────────────────────────────────────────────────────────────────────────

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, p) => a + (b - a) * p;
const easeOut = (p) => 1 - (1 - p) ** 3;
const easeInOut = (p) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);
const progress = (t, from, to) => clamp01((t - from) / (to - from));

// Heart size during the two beats (second beat right after the first).
function beatScale(t) {
  const u = progress(t, SPLASH.heartFadeEnd, SPLASH.beatsEnd);
  const beat = (from, to) =>
    u > from && u < to ? Math.sin((Math.PI * (u - from)) / (to - from)) : 0;
  return 1 + (SPLASH.beatScale - 1) * Math.max(beat(0, 0.33), beat(0.36, 0.69));
}

/**
 * The CVS Health launch animation, shown over the Welcome screen when the demo starts.
 * Uses the real logo file split into the heart and the wordmark (by clipping, never redrawn).
 * `targetRef` is the Welcome screen's logo: the splash logo ends exactly on top of it.
 * Tap anywhere to skip.
 */
export default function Splash({ targetRef, onDone }) {
  const overlayRef = useRef(null);
  const [t, setT] = useState(0);
  const [box, setBox] = useState(null); // where the logo starts (centered) and ends (Welcome)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Measure the start (centered) and end (Welcome logo) positions.
  useLayoutEffect(() => {
    const area = overlayRef.current.getBoundingClientRect();
    const target = targetRef.current?.getBoundingClientRect();
    const W = SPLASH.logoWidth;
    const start = { x: (area.width - W) / 2, y: (area.height - W * LOGO_ASPECT) / 2, scale: 1 };
    const end = target
      ? { x: target.left - area.left, y: target.top - area.top, scale: target.width / W }
      : start;
    setBox({ start: reduceMotion ? end : start, end });
  }, [targetRef, reduceMotion]);

  // Run the clock.
  useEffect(() => {
    let frame;
    const begin = performance.now();
    const tick = (now) => {
      const elapsed = now - begin;
      setT(elapsed);
      if (elapsed >= SPLASH.glideEnd) onDone();
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  const W = SPLASH.logoWidth;
  const H = W * LOGO_ASPECT;
  const heartW = W * HEART_SPLIT;

  // 3. Reveal: the heart moves from the center to the left edge; the wordmark slides out to the right.
  const p = reduceMotion ? 1 : easeOut(progress(t, SPLASH.beatsEnd, SPLASH.revealEnd));
  const heartX = lerp(W / 2 - heartW / 2, 0, p);
  const heartCenter = heartX + heartW / 2;
  const wordOffset = lerp(-W / 2, 0, p);
  // Only show the wordmark to the right of the heart's center (and never the image's own heart).
  const clipLeft = Math.max(heartCenter - wordOffset, heartW);

  // 5. Glide to the Welcome logo, while the white background fades away.
  const q = easeInOut(progress(t, SPLASH.holdEnd, SPLASH.glideEnd));
  const pos = box && {
    x: lerp(box.start.x, box.end.x, q),
    y: lerp(box.start.y, box.end.y, q),
    scale: lerp(box.start.scale, box.end.scale, q),
  };

  const heartOpacity = reduceMotion ? 1 : progress(t, 0, SPLASH.heartFadeEnd);
  const scale = reduceMotion ? 1 : beatScale(t);

  return (
    <div
      ref={overlayRef}
      onClick={onDone}
      aria-hidden="true"
      className="absolute inset-0 z-40 cursor-pointer"
      data-testid="splash"
    >
      <div className="absolute inset-0 bg-white" style={{ opacity: 1 - q }} />
      {pos && (
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: W,
            height: H,
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
          }}
        >
          {/* "CVSHealth" wordmark */}
          <img
            src={LOGO_SRC}
            alt=""
            className="absolute left-0 top-0"
            style={{
              width: W,
              height: H,
              maxWidth: 'none',
              transform: `translateX(${wordOffset}px)`,
              clipPath: `inset(0 0 0 ${clipLeft}px)`,
              opacity: reduceMotion ? heartOpacity : 1,
            }}
          />
          {/* Red heart */}
          <div
            className="absolute top-0 overflow-hidden"
            style={{
              left: heartX,
              width: heartW,
              height: H,
              opacity: heartOpacity,
              transform: `scale(${scale})`,
            }}
          >
            <img src={LOGO_SRC} alt="" style={{ width: W, height: H, maxWidth: 'none' }} />
          </div>
        </div>
      )}
    </div>
  );
}
