// Placeholder "photo" of a rash on an arm (simple drawing, not a real photo).
// Used in the chat, the video self-view, and the summary thumbnail.
export default function RashPhoto({
  className = 'h-36 w-48',
  label = 'Photo of the rash (placeholder)',
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 160 120"
      preserveAspectRatio="xMidYMid slice"
      className={`rounded-xl ${className}`}
    >
      <rect width="160" height="120" fill="#e9eef3" />
      <path d="M-10 70c40-30 120-40 180-20v80H-10z" fill="#d9a888" />
      <path d="M-10 70c40-30 120-40 180-20" stroke="#c4906f" strokeWidth="3" fill="none" />
      {[
        [62, 78, 7],
        [74, 72, 5],
        [84, 82, 8],
        [70, 90, 6],
        [95, 74, 5],
        [58, 92, 4],
        [88, 95, 5],
        [100, 86, 4],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#c94b4b" opacity="0.75" />
      ))}
      <ellipse cx="80" cy="84" rx="30" ry="18" fill="#d65a5a" opacity="0.25" />
    </svg>
  );
}
