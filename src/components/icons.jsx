// Simple line icons used across the app (24×24, drawn with the current text color).
const paths = {
  home: 'M3 11 12 4l9 7M5 10v10h5v-6h4v6h5V10',
  health:
    'M12 20s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 8.2a3.8 3.8 0 0 1 7 2.3C19 15.6 12 20 12 20zM12 11v4M10 13h4',
  findCare: 'M4 5h16v15H4zM4 9h16M8 3v4M16 3v4M15 14.5v2l1.3 1M15.5 16.3a2.8 2.8 0 1 1 0 .1',
  vaccineRecords: 'M7 3h10v18H7zM10 3v2h4V3M10 10h4M10 14h4M10 18h2',
  chat: 'M12 4c4.4 0 8 3.1 8 7s-3.6 7-8 7c-1 0-2-.2-2.9-.5L5 19l1.2-3.4C4.8 14.4 4 12.8 4 11c0-3.9 3.6-7 8-7z',
  mail: 'M3 6h18v12H3zM3 6l9 7 9-7',
  cart: 'M3 4h2l2.4 11h10.2L20 8H6.3M9.5 19.5a1 1 0 1 0 0 .1M17 19.5a1 1 0 1 0 0 .1',
  chevron: 'm9 6 6 6-6 6',
  pill: 'M8 4h8v4H8zM7 8h10v12H7zM10 14h4M12 12v4',
  calendar: 'M4 5h16v15H4zM4 9h16M8 3v4M16 3v4',
  syringe: 'm16 3 5 5M18.5 5.5 9 15l-3.5.5L6 12l9.5-9.5M6 18l-3 3M11 9l2 2',
  clinic: 'M4 21V7l8-4 8 4v14M10 21v-5h4v5M12 8v4M10 10h4',
  camera: 'M3 8h4l2-3h6l2 3h4v12H3zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  micOff:
    'M9 9v3a3 3 0 0 0 5.1 2.1M15 9.3V6a3 3 0 0 0-5.7-1.3M5 11a7 7 0 0 0 11.3 5.5M19 11a7 7 0 0 1-.6 2.8M12 18v3M3 3l18 18',
  flip: 'M4 8h11l-3-3M20 16H9l3 3',
  phoneDown: 'M3 13.5c5-4.5 13-4.5 18 0l-2 3-3.5-1.3V12.6a10 10 0 0 0-7 0v2.6L5 16.5z',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  alert:
    'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  lock: 'M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 15v2',
  cardFront:
    'M3 6h18v12H3zM6 10a2 2 0 1 0 4 0 2 2 0 1 0-4 0M5.5 16c.5-2 1.6-3 3.5-3s3 1 3.5 3M14 10h4M14 13h3',
  cardBack: 'M3 6h18v12H3zM3 9.5h18M6 14v2M8 14v2M10.5 14v2M12 14v2M14.5 14v2M17 14v2',
  face: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 10h.01M15 10h.01M9 15c1.7 1.3 4.3 1.3 6 0',
  video: 'M3 7h12v10H3zM15 10.5 21 7v10l-6-3.5',
  share: 'M4 13v7h16v-7M12 3v12M7.5 7.5 12 3l4.5 4.5',
  shield: 'M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6zM8.8 12l2.2 2.2 4.3-4.4',
};

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 2 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
