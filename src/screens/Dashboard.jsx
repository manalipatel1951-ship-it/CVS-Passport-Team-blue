import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import BottomNav from '../components/BottomNav.jsx';
import BigButton from '../components/BigButton.jsx';
import AIBadge from '../components/AIBadge.jsx';
import Icon from '../components/icons.jsx';
import Banner from '../components/Banner.jsx';
import CaregiverIllustration from '../components/CaregiverIllustration.jsx';
import { HeaderActions, ProfileSwitcher } from '../components/HealthHeader.jsx';
import { records } from '../data/dashboard.js';
import { useAppState } from '../state/AppState.jsx';

// Sarah's Health: the "Your Health" tab, the same info Sarah sees in her own CVS app.
export default function Dashboard() {
  const { lovedOne, setJustAdded, hasNewVisit, justSavedVisit, dismissSavedVisit } = useAppState();
  const base = `/care/${lovedOne.id}`;

  // The "approved" message on My Fam has done its job.
  useEffect(() => {
    setJustAdded(false);
  }, [setJustAdded]);

  return (
    <PhoneShell
      title={
        // Never wraps next to the three header icons: slightly smaller text on narrow phones,
        // and just the first name on very narrow ones (under 350px wide).
        // Screen readers always hear the full title.
        <>
          <span className="sr-only">{lovedOne.firstName}&apos;s Health</span>
          <span aria-hidden="true" className="whitespace-nowrap text-[17px] min-[400px]:text-xl">
            <span className="min-[350px]:hidden">{lovedOne.firstName}</span>
            <span className="hidden min-[350px]:inline">{lovedOne.firstName}&apos;s Health</span>
          </span>
        </>
      }
      leading={<ProfileSwitcher person={lovedOne} />}
      actions={<HeaderActions />}
      banner={<ContextBanner person={lovedOne} />}
      footer={<BottomNav active="health" />}
      gray
      bare
    >
      {justSavedVisit && (
        <div className="px-4 pt-4">
          <Banner title="Visit summary saved" onDone={dismissSavedVisit}>
            Find it anytime under Previous visits.
          </Banner>
        </div>
      )}

      {/* Hero */}
      <section className="bg-cvs-blue-light px-4 pb-6 pt-6">
        <h2 className="text-3xl font-bold leading-tight text-ink">
          Keep up with {lovedOne.firstName}&apos;s health care
        </h2>
        <div className="mt-4">
          <CaregiverIllustration />
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="flex items-center gap-2 text-2xl font-bold text-ink">
            MinuteTwin <AIBadge />
          </p>
          <p className="mt-2 text-base text-ink">
            Your MinuteClinic NP&apos;s digital twin. Help with everyday concerns like rashes,
            colds, and allergies, no clinic visit needed.
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
