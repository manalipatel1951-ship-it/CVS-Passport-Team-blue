// Original flat illustration of a friendly nurse practitioner in a white coat, chest up,
// filling the video area. Subtle "live" movement: breathing, sway, blinking, a glow that pulses
// while she's speaking (a caption is showing), and a small nod. No lip-sync.
// A soft blue outline glow marks it as a digital twin (AI), not a real person.
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
          <stop offset="0" stopColor="#dce8f4" />
          <stop offset="1" stopColor="#b9cde3" />
        </linearGradient>
        <filter id="np-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Clinic room background */}
      <rect width="360" height="480" fill="url(#np-bg)" />
      <rect x="24" y="40" width="110" height="80" rx="8" fill="#eef4fa" />
      <path
        d="M79 92c-9-6-13-10-13-15a6.5 6.5 0 0 1 13-2 6.5 6.5 0 0 1 13 2c0 5-4 9-13 15z"
        fill="#cc0000"
        opacity="0.8"
      />
      <rect x="268" y="60" width="60" height="120" rx="8" fill="#eef4fa" />

      <g className="np-breathe">
        <g className="np-sway">
          {/* Digital-twin glow around the person */}
          <path
            d="M70 480c0-90 50-150 110-150s110 60 110 150zM180 120a62 70 0 1 1 0 140 62 70 0 1 1 0-140z"
            fill="#5aa0ff"
            filter="url(#np-glow)"
            className={speaking ? 'np-glow' : undefined}
            opacity={speaking ? 0.6 : 0.3}
          />

          {/* Body: scrubs, white coat, stethoscope */}
          <path d="M60 480c0-96 52-150 120-150s120 54 120 150z" fill="#ffffff" />
          <path d="M150 338h60l-30 70z" fill="#2f8f8a" />
          <path
            d="M150 338l30 70-18 72h-24l-14-120zM210 338l-30 70 18 72h24l14-120z"
            fill="#eef2f6"
          />
          <path
            d="M148 352c-10 30-8 60 8 78"
            stroke="#3a4a5c"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="158" cy="434" r="9" fill="#3a4a5c" />
          <rect x="226" y="392" width="40" height="22" rx="4" fill="#1f4e95" />
          <rect x="231" y="400" width="30" height="3" rx="1.5" fill="#fff" />

          {/* Head (nods when the second caption appears) */}
          <g key={nodKey} className={nodKey ? 'np-nod' : undefined}>
            <rect x="164" y="290" width="32" height="44" rx="12" fill="#b07656" />
            <ellipse cx="180" cy="210" rx="56" ry="66" fill="#c48a66" />
            <path
              d="M120 206c-4-62 28-96 62-96s64 30 58 96c-8-30-28-48-58-50-30 2-52 20-62 50z"
              fill="#3b2a24"
            />
            <path
              d="M124 200c-12 30-10 70 4 92M236 200c12 30 10 70-4 92"
              stroke="#3b2a24"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="124" cy="216" rx="8" ry="12" fill="#b07656" />
            <ellipse cx="236" cy="216" rx="8" ry="12" fill="#b07656" />
            <g className="np-blink">
              <ellipse cx="160" cy="214" rx="6" ry="7" fill="#2a1d18" />
              <ellipse cx="200" cy="214" rx="6" ry="7" fill="#2a1d18" />
            </g>
            <path
              d="M148 196c6-5 14-5 20 0M192 196c6-5 14-5 20 0"
              stroke="#3b2a24"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M166 248c8 7 20 7 28 0"
              stroke="#8a4a3a"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="148" cy="236" rx="9" ry="5" fill="#e09a8a" opacity="0.5" />
            <ellipse cx="212" cy="236" rx="9" ry="5" fill="#e09a8a" opacity="0.5" />
          </g>
        </g>
      </g>
    </svg>
  );
}
