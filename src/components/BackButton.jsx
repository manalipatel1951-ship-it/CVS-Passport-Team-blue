import { useNavigate } from 'react-router-dom';

/**
 * Large, always-visible Back control (UX rule: every screen has a clear way back).
 * Pass `to` to go to a specific screen; otherwise it goes to the previous screen.
 */
export default function BackButton({ to }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="-ml-2 flex min-h-12 min-w-12 shrink-0 items-center gap-1 rounded-lg px-2 text-lg font-semibold text-cvs-blue"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Back
    </button>
  );
}
