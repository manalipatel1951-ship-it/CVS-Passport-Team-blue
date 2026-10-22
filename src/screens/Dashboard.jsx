import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import BottomNav from '../components/BottomNav.jsx';
import BigButton from '../components/BigButton.jsx';
import AIBadge from '../components/AIBadge.jsx';
import Icon from '../components/icons.jsx';
import { HeaderActions, ProfileSwitcher } from '../components/HealthHeader.jsx';
import { records } from '../data/dashboard.js';
import { useAppState } from '../state/AppState.jsx';

// Placeholder illustration in a flat style (original drawing, not CVS artwork).
function HeroIllustration() {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 130" className="mx-auto h-auto w-full max-w-xs">
      <rect x="20" y="10" width="150" height="100" rx="4" fill="#9fb4cf" />
      <rect x="28" y="18" width="64" height="40" fill="#c7d6e8" />
      <rect x="98" y="18" width="64" height="40" fill="#c7d6e8" />
      <rect x="28" y="64" width="64" height="40" fill="#c7d6e8" />
      <path d="M60 92c-9-6-14-11-14-17a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 6-5 11-14 17z" fill="#fff" />
      <circle cx="150" cy="58" r="17" fill="#6e7f99" />
      <path d="M112 130c2-30 18-48 38-48s36 18 38 48z" fill="#e9a7a0" />
      <circle cx="245" cy="42" r="19" fill="#5a2a2a" />
      <circle cx="245" cy="48" r="14" fill="#8a5a44" />
      <path d="M205 130c2-34 18-55 40-55s38 21 40 55z" fill="#fff" />
      <path d="M238 78h14l-3 52h-8z" fill="#5c9a8b" />
    </svg>
  );
}

// Sarah's Health: the "Your Health" tab, the same info Sarah sees in her own CVS app.
export default function Dashboard() {
  const { lovedOne, setJustAdded, hasNewVisit } = useAppState();
  const base = `/care/${lovedOne.id}`;

  // The "approved" message on My Fam has done its job.
  useEffect(() => {
    setJustAdded(false);
  }, [setJustAdded]);

  return (
    <PhoneShell
      title={`${lovedOne.firstName}'s Health`}
      leading={<ProfileSwitcher person={lovedOne} />}
      actions={<HeaderActions />}
      banner={<ContextBanner person={lovedOne} />}
      footer={<BottomNav active="health" />}
      gray
      bare
    >
      {/* Hero */}
      <section className="bg-cvs-blue-light px-4 pb-6 pt-6">
        <h2 className="text-3xl font-bold leading-tight text-ink">
          Keep up with {lovedOne.firstName}&apos;s health care
        </h2>
        <div className="mt-4">
          <HeroIllustration />
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="flex items-center gap-2 text-2xl font-bold text-ink">
            MinuteTwin <AIBadge />
          </p>
          <p className="mt-2 text-base text-ink">
            Your MinuteClinic NP&apos;s digital twin. Get help with a minor issue anytime, no clinic
            visit needed.
          </p>
          <div className="mt-4">
            <BigButton to={`${base}/chat`} full={false}>
              Start a MinuteTwin visit
            </BigButton>
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="px-4 pb-6 pt-6">
        <h2 className="text-2xl font-bold text-ink">Records</h2>
        <ul className="mt-3 divide-y divide-line rounded-3xl border border-line bg-white">
          {records.map((r) => (
            <li key={r.id}>
              <Link
                to={`${base}/records/${r.id}`}
                className="flex min-h-16 items-center gap-3 px-4 py-3"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-canvas text-ink">
                  <Icon name={r.icon} />
                </span>
                <span className="flex-1 text-lg font-semibold text-ink">{r.title}</span>
                {r.id === 'visits' && hasNewVisit && (
                  <span className="rounded-full bg-cvs-red px-2 py-0.5 text-sm font-bold text-white">
                    New
                  </span>
                )}
                <Icon name="chevron" className="h-6 w-6 text-ink" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PhoneShell>
  );
}
