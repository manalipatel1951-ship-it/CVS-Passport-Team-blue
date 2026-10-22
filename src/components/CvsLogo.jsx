// The CVS Health logo file (public/brand/cvs-health-logo.png), plus ways to show just the
// heart or just the wordmark by clipping the same image. The logo itself is never redrawn.
export const LOGO_SRC = './brand/cvs-health-logo.png';
// Measured from the image (538×81 px): the heart ends at x≈85 and "CVS" starts at x≈91.
export const LOGO_ASPECT = 81 / 538; // height ÷ width
export const HEART_SPLIT = 88 / 538; // where the heart ends, as a share of the width

/** Just the red heart, at the given height in px. Decorative. */
export function CvsHeart({ height = 24, className = '' }) {
  const logoWidth = height / LOGO_ASPECT;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 overflow-hidden ${className}`}
      style={{ width: logoWidth * HEART_SPLIT, height }}
    >
      <img src={LOGO_SRC} alt="" style={{ width: logoWidth, height, maxWidth: 'none' }} />
    </span>
  );
}
