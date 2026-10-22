// Original flat placeholder illustration: a caregiver helping an older parent.
// Used on the Welcome screen and Sarah's Health. Not based on CVS artwork.
export default function CaregiverIllustration({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 170"
      className={`mx-auto h-auto w-full max-w-xs ${className}`}
    >
      {/* floor shadow and plant */}
      <ellipse cx="160" cy="164" rx="130" ry="6" fill="#c3d4e8" />
      <rect x="262" y="118" width="26" height="40" rx="4" fill="#e9a23b" />
      <path
        d="M275 118c-14-10-16-28-8-40 6 10 9 24 8 40zM275 118c10-12 24-16 34-12-6 9-18 14-34 12z"
        fill="#4f8f5b"
      />
      {/* armchair */}
      <rect x="58" y="96" width="130" height="58" rx="14" fill="#7d93b8" />
      <rect x="48" y="104" width="26" height="54" rx="10" fill="#6b80a6" />
      <rect x="172" y="104" width="26" height="54" rx="10" fill="#6b80a6" />
      {/* older parent, seated */}
      <path d="M86 150c0-34 14-58 40-58s40 24 40 58z" fill="#b65d6e" />
      <rect x="96" y="128" width="62" height="24" rx="10" fill="#4a5a78" />
      <circle cx="126" cy="70" r="20" fill="#e2b08e" />
      <path d="M106 66c0-16 10-24 20-24s20 8 20 24c-4-8-10-10-20-10s-16 2-20 10z" fill="#d9dde3" />
      <circle cx="104" cy="70" r="6" fill="#d9dde3" />
      <circle cx="148" cy="70" r="6" fill="#d9dde3" />
      <path
        d="M118 80c5 4 11 4 16 0"
        stroke="#8a5a44"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* mug in parent's hands */}
      <rect x="116" y="112" width="18" height="16" rx="3" fill="#ffffff" />
      <path d="M134 116h4a4 4 0 0 1 0 8h-4" stroke="#ffffff" strokeWidth="3" fill="none" />
      {/* caregiver, standing, hand on parent's shoulder */}
      <path d="M190 160c0-46 10-82 34-82s34 36 34 82z" fill="#2f6f8f" />
      <path
        d="M200 100c-18 4-36 4-50 0"
        stroke="#2f6f8f"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="148" cy="100" r="7" fill="#c98b62" />
      <circle cx="224" cy="56" r="19" fill="#c98b62" />
      <path d="M205 54c0-14 9-22 19-22s19 8 19 22c-6-6-12-8-19-8s-13 2-19 8z" fill="#3b2a24" />
      <circle cx="238" cy="34" r="9" fill="#3b2a24" />
      <path
        d="M216 64c5 4 11 4 16 0"
        stroke="#7a4b2f"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* small heart between them */}
      <path
        d="M176 44c-6-4-9-7-9-11a4.5 4.5 0 0 1 9-1.5 4.5 4.5 0 0 1 9 1.5c0 4-3 7-9 11z"
        fill="#cc0000"
      />
    </svg>
  );
}
