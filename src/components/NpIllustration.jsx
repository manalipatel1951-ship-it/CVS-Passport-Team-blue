// Original flat illustration of a friendly, professional nurse practitioner in a white coat,
// chest up, filling the video area, on a soft blurred clinic background.
// Subtle "live" movement: breathing, sway, blinking, a glow that pulses while she's speaking
// (a caption is showing), and a small nod. No lip-sync.
// A soft blue glow marks it as a digital twin (AI); the coat badge reads "MinuteTwin".
export default function NpIllustration({ speaking = false, nodKey = 0 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 480"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="np-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3edf7" />
          <stop offset="1" stopColor="#c3d5e8" />
        </linearGradient>
        <filter id="np-bg-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="np-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Soft, blurred clinic background (a bright window, cabinets, a wall line) */}
      <rect width="360" height="480" fill="url(#np-bg)" />
      <g filter="url(#np-bg-blur)" opacity="0.9">
        <rect x="-20" y="40" width="150" height="190" rx="20" fill="#f7fbff" />
        <rect x="250" y="70" width="130" height="230" rx="20" fill="#b7cbe0" />
        <rect x="-20" y="300" width="400" height="40" fill="#d3e1ef" />
        <circle cx="300" cy="120" r="26" fill="#e9f1f9" />
      </g>

      {/* The person sits high in the frame so the badge stays clear of the caption and buttons */}
      <g transform="translate(0 -70)">
        <g className="np-breathe">
          <g className="np-sway">
            {/* Digital-twin glow behind the person */}
            <g
              filter="url(#np-glow)"
              className={speaking ? 'np-glow' : undefined}
              opacity={speaking ? 0.65 : 0.3}
            >
              <path d="M40 560c0-170 52-222 140-226 88 4 140 56 140 226z" fill="#5aa0ff" />
              <ellipse cx="180" cy="206" rx="54" ry="64" fill="#5aa0ff" />
            </g>

            {/* Neck */}
            <rect x="161" y="262" width="38" height="80" rx="16" fill="#b98263" />

            {/* White coat with scrubs underneath */}
            <path d="M40 560c0-170 52-222 140-226 88 4 140 56 140 226z" fill="#ffffff" />
            <path d="M148 336l32 58 32-58z" fill="#2f8f8a" />
            <path d="M148 336l32 64-12 160h-46l12-200z" fill="#eef2f7" />
            <path d="M212 336l-32 64 12 160h46l-12-200z" fill="#eef2f7" />
            <path d="M180 400v160" stroke="#dde4ec" strokeWidth="2" />

            {/* Stethoscope around the neck */}
            <path
              d="M156 300c-6 10-6 12 4 20 12 10 28 10 40 0 10-8 10-10 4-20"
              stroke="#2f3b4a"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M160 320c-18 22-20 44-12 62"
              stroke="#2f3b4a"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M200 320c18 22 22 46 14 70"
              stroke="#2f3b4a"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="148" cy="390" r="10" fill="#a8b4c2" stroke="#2f3b4a" strokeWidth="4" />

            {/* "MinuteTwin" name badge on the coat */}
            <g transform="translate(200 358)">
              <rect width="70" height="32" rx="5" fill="#ffffff" stroke="#c7d3e0" strokeWidth="2" />
              <rect width="70" height="9" rx="4" fill="#1f4e95" />
              <text
                x="35"
                y="25"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
                fill="#1f4e95"
              >
                MinuteTwin
              </text>
            </g>

            {/* Head (nods when the second caption appears) */}
            <g key={nodKey} className={nodKey ? 'np-nod' : undefined}>
              {/* hair behind */}
              <path d="M130 210c-4 34 2 58 14 70h72c12-12 18-36 14-70z" fill="#3a2a22" />
              <ellipse cx="180" cy="206" rx="46" ry="56" fill="#c99474" />
              <ellipse cx="134" cy="212" rx="6" ry="10" fill="#b98263" />
              <ellipse cx="226" cy="212" rx="6" ry="10" fill="#b98263" />
              {/* hair on top, neatly pulled back */}
              <path
                d="M132 204c-2-46 22-68 48-68s50 22 48 68c-8-24-24-38-48-38s-40 14-48 38z"
                fill="#3a2a22"
              />
              <circle cx="180" cy="134" r="15" fill="#3a2a22" />
              <g className="np-blink">
                <ellipse cx="163" cy="210" rx="4.5" ry="5.5" fill="#2a1d18" />
                <ellipse cx="197" cy="210" rx="4.5" ry="5.5" fill="#2a1d18" />
              </g>
              <path
                d="M154 196c6-4 12-4 18 0M188 196c6-4 12-4 18 0"
                stroke="#3a2a22"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M180 214c-3 9-4 14 2 16"
                stroke="#a8735a"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M168 240c7 6 17 6 24 0"
                stroke="#8a4a3a"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
