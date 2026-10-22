// Fun profile icons, like picking a streaming profile. Simple, original flat drawings.
// To add one: add an entry with a name, a background color and the drawing (24×24 grid).

export const profileIcons = {
  airplane: {
    name: 'Airplane',
    bg: '#cfe3f7',
    art: (
      <g>
        <path
          d="M11 2.5h2l.9 7.2 7.6 3.8v2.2l-7.7-2.1-.5 5 2.4 1.8v1.6l-3.7-1-3.7 1v-1.6l2.4-1.8-.5-5-7.7 2.1v-2.2l7.6-3.8z"
          fill="#1f4e95"
        />
      </g>
    ),
  },
  sunflower: {
    name: 'Sunflower',
    bg: '#fdf0c2',
    art: (
      <g>
        <path d="M12 14v8" stroke="#3f7d3a" strokeWidth="1.6" />
        <path d="M12 19c-2-.2-3.2-1.2-3.6-2.8 1.8 0 3 .9 3.6 2.8z" fill="#3f7d3a" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse
            key={a}
            cx="12"
            cy="5.2"
            rx="1.7"
            ry="2.8"
            fill="#f2b705"
            transform={`rotate(${a} 12 9.5)`}
          />
        ))}
        <circle cx="12" cy="9.5" r="2.8" fill="#7a4b1d" />
      </g>
    ),
  },
  rocket: {
    name: 'Rocket',
    bg: '#e4dcf5',
    art: (
      <g>
        <path d="M12 2c2.9 2.3 4.3 5.6 4.3 9.6v4.6H7.7v-4.6C7.7 7.6 9.1 4.3 12 2z" fill="#6b4fb0" />
        <path d="M7.7 12.5 5 15.4v3l2.7-1.6zM16.3 12.5l2.7 2.9v3l-2.7-1.6z" fill="#cc0000" />
        <circle cx="12" cy="9" r="2" fill="#fff" />
        <path d="M10.2 16.8h3.6L12 21.5z" fill="#f29a1d" />
      </g>
    ),
  },
  star: {
    name: 'Star',
    bg: '#fde3c8',
    art: (
      <path
        d="m12 2.8 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.6l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"
        fill="#e86a10"
      />
    ),
  },
  fish: {
    name: 'Fish',
    bg: '#cdeee9',
    art: (
      <g>
        <ellipse cx="10.5" cy="12" rx="6.5" ry="4.5" fill="#138a7c" />
        <path d="M16 12l5-4v8z" fill="#138a7c" />
        <circle cx="7.6" cy="11" r="1.1" fill="#fff" />
      </g>
    ),
  },
  mountain: {
    name: 'Mountain',
    bg: '#dcebd5',
    art: (
      <g>
        <circle cx="17.5" cy="6" r="2.3" fill="#f2b705" />
        <path d="M2 20 9 8l4 6.5 2.5-3.5L22 20z" fill="#3f7d3a" />
        <path d="m9 8 1.9 3.2-1.9-.9-1.8.9z" fill="#fff" />
      </g>
    ),
  },
  moon: {
    name: 'Moon',
    bg: '#d6dbea',
    art: (
      <g>
        <path d="M15.5 3.5a8.5 8.5 0 1 0 5 14.8A7 7 0 0 1 15.5 3.5z" fill="#2c3a63" />
        <circle cx="18" cy="6" r="0.9" fill="#2c3a63" />
        <circle cx="20.5" cy="10" r="0.6" fill="#2c3a63" />
      </g>
    ),
  },
  cat: {
    name: 'Cat',
    bg: '#f6d9d9',
    art: (
      <g>
        <path d="M5 9 6 3l4.3 3.4h3.4L18 3l1 6v4.5a7 7 0 0 1-14 0z" fill="#b5523b" />
        <circle cx="9.3" cy="11.5" r="1.1" fill="#fff" />
        <circle cx="14.7" cy="11.5" r="1.1" fill="#fff" />
        <path d="m11 14.3 1 1 1-1z" fill="#fff" />
      </g>
    ),
  },
};

export const iconKeys = Object.keys(profileIcons);

const sizes = {
  sm: 'h-8 w-8 rounded-lg',
  md: 'h-12 w-12 rounded-xl',
  lg: 'h-28 w-28 rounded-3xl',
};

/** A profile icon tile. Decorative: always show the person's name next to it. */
export default function ProfileIcon({ icon, size = 'md', className = '' }) {
  const p = profileIcons[icon] ?? profileIcons.star;
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center ${sizes[size]} ${className}`}
      style={{ background: p.bg }}
    >
      <svg viewBox="0 0 24 24" className="h-3/5 w-3/5">
        {p.art}
      </svg>
    </span>
  );
}
