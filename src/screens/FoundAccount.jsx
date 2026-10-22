import { useEffect, useState } from 'react';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import PassportHero, { HeaderHeart } from '../components/PassportHero.jsx';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Simple, generic profile silhouette (Sarah's fun icon isn't picked until later).
function PersonIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-16 w-16 items-center justify-center rounded-full bg-cvs-blue-light text-cvs-blue"
    >
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
        <circle cx="12" cy="8" r="4.2" />
        <path d="M3.5 21c.6-4.6 4.1-7.5 8.5-7.5s7.9 2.9 8.5 7.5z" />
      </svg>
    </span>
  );
}

// Step 1 of 3 (continued): "Is this Sarah?" Shows only a few details (partial name,
// birth month/year, general area) so the caregiver can confirm without seeing private info.
export default function FoundAccount() {
  const { draft, showNotice } = useAppState();
  const [searching, setSearching] = useState(true);
  const [month, , year] = draft.dateOfBirth.split('/');
  const name = draft.firstName;

  useEffect(() => {
    const t = setTimeout(() => setSearching(false), DELAYS.searching);
    return () => clearTimeout(t);
  }, []);

  return (
    <PhoneShell title={`Is this ${name}?`} back="/fam/add" titleIcon={<HeaderHeart />}>
      <PassportHero step={1} intro="We searched CVS for a matching account." />
      {searching ? (
        <div role="status" className="flex flex-col items-center gap-4 py-12 text-center">
          <span
            aria-hidden="true"
            className="h-12 w-12 animate-spin rounded-full border-4 border-cvs-blue-light border-t-cvs-blue motion-reduce:animate-none"
          />
          <p className="text-lg font-semibold text-ink">Searching for {name}&apos;s CVS account…</p>
        </div>
      ) : (
        <section
          role="status"
          className="animate-slide-in rounded-3xl border border-line bg-white p-5 shadow-sm"
        >
          <PersonIcon />
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-soft">
            We found {name}&apos;s account
          </p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {name} {draft.lastName.charAt(0)}.
          </p>
          <p className="text-lg text-ink-soft">
            Born {MONTHS[Number(month) - 1]} {year}
          </p>
          <p className="text-lg text-ink-soft">{draft.area}</p>
          <div className="mt-5">
            <BigButton to="/fam/add/verify">Yes, that&apos;s her</BigButton>
          </div>
          <button
            type="button"
            onClick={() => showNotice()}
            className="mx-auto mt-2 flex min-h-12 items-center px-4 text-lg font-semibold text-cvs-blue underline"
          >
            Not her?
          </button>
          <p className="mt-3 border-t border-line pt-3 text-sm text-ink-soft">
            We only show a few details to protect {name}&apos;s privacy.
          </p>
        </section>
      )}
    </PhoneShell>
  );
}
