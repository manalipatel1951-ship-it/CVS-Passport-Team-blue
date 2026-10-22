import StepIndicator from './StepIndicator.jsx';
import { CvsHeart } from './CvsLogo.jsx';

// Branding shared by every Caregiver Passport step: the small CVS heart for the header,
// and a light blue top section (matching the CVS app hero) behind the step indicator and intro.

export const HeaderHeart = () => <CvsHeart height={26} className="mr-1" />;

export default function PassportHero({ step, intro, art, children }) {
  return (
    <section className="-mx-4 -mt-5 mb-5 bg-cvs-blue-light px-4 pb-5 pt-4">
      <StepIndicator step={step} />
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1">
          {intro && <p className="text-lg text-ink">{intro}</p>}
          {children}
        </div>
        {art}
      </div>
    </section>
  );
}

// Small flat illustrations, same style as the Welcome screen.
export function IdCardArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 44" className="h-11 w-16 shrink-0">
      <rect
        x="1"
        y="1"
        width="62"
        height="42"
        rx="6"
        fill="#fff"
        stroke="#1f4e95"
        strokeWidth="2"
      />
      <rect x="1" y="1" width="62" height="10" rx="6" fill="#1f4e95" />
      <circle cx="16" cy="25" r="6" fill="#c98b62" />
      <path d="M8 38c0-6 4-9 8-9s8 3 8 9z" fill="#2f6f8f" />
      <rect x="30" y="19" width="26" height="3" rx="1.5" fill="#9fb4cf" />
      <rect x="30" y="26" width="20" height="3" rx="1.5" fill="#9fb4cf" />
      <rect x="30" y="33" width="14" height="3" rx="1.5" fill="#cc0000" />
    </svg>
  );
}

export function FaceArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-12 w-12 shrink-0">
      <circle cx="24" cy="24" r="22" fill="#fff" stroke="#1f4e95" strokeWidth="2" />
      <circle cx="24" cy="21" r="9" fill="#c98b62" />
      <path d="M15 19c0-7 4-11 9-11s9 4 9 11c-3-3-6-4-9-4s-6 1-9 4z" fill="#3b2a24" />
      <path d="M11 40c2-7 7-10 13-10s11 3 13 10" fill="#2f6f8f" />
      <path
        d="M4 12V6a2 2 0 0 1 2-2h6M36 4h6a2 2 0 0 1 2 2v6M44 36v6a2 2 0 0 1-2 2h-6M12 44H6a2 2 0 0 1-2-2v-6"
        stroke="#cc0000"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
