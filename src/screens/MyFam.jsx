import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BottomNav from '../components/BottomNav.jsx';
import ProfileIcon from '../components/ProfileIcon.jsx';
import StepIndicator from '../components/StepIndicator.jsx';
import AIBadge from '../components/AIBadge.jsx';
import Icon from '../components/icons.jsx';
import { existingFamily } from '../data/family.js';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

// One tile in the profile picker: big icon, name, relationship and access status.
function Tile({ person, status, isNew, children }) {
  return (
    <span className="flex flex-col items-center gap-1 text-center">
      <span className="relative">
        <ProfileIcon
          icon={person.icon}
          size="lg"
          className={isNew ? 'ring-4 ring-cvs-blue ring-offset-2' : ''}
        />
        {isNew && (
          <span className="absolute -right-2 -top-2 rounded-full bg-cvs-red px-2 py-0.5 text-sm font-bold text-white">
            New
          </span>
        )}
      </span>
      <span className="mt-1 text-lg font-bold text-ink">{person.firstName}</span>
      <span className="text-sm text-ink-soft">{person.relationship}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-sm font-semibold ${status === 'Pending' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}
      >
        {status}
      </span>
      {children}
    </span>
  );
}

// Home screen: Manali picks whose health to look at, like a streaming profile picker.
export default function MyFam() {
  const { lovedOne, justAdded, approveLovedOne, showNotice } = useAppState();
  const pending = lovedOne?.status === 'pending';
  const approved = lovedOne?.status === 'approved';

  // Step 3: the loved one approves on their side (not built). Simulated after a few seconds.
  useEffect(() => {
    if (!pending) return undefined;
    const t = setTimeout(approveLovedOne, DELAYS.approval);
    return () => clearTimeout(t);
  }, [pending, approveLovedOne]);

  const showBanner = justAdded && lovedOne;

  return (
    <PhoneShell title="My Fam" back={false} gray footer={<BottomNav active="home" />}>
      {showBanner && pending && (
        <div role="status" className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
          <StepIndicator step={3} />
          <p className="text-lg font-bold text-ink">Request sent to {lovedOne.firstName}</p>
          <p className="mt-1 text-base text-ink-soft">
            Waiting for {lovedOne.firstName} to approve your access…
          </p>
        </div>
      )}
      {showBanner && approved && (
        <div
          role="status"
          className="animate-slide-in mb-5 rounded-2xl border-2 border-emerald-700 bg-emerald-50 p-4"
        >
          <p className="flex items-center gap-2 text-lg font-bold text-emerald-900">
            <Icon name="check" className="h-6 w-6" strokeWidth={3} />
            {lovedOne.firstName} approved your access
          </p>
          <p className="mt-1 text-base text-emerald-900">
            Tap {lovedOne.firstName} to see her health info.
          </p>
        </div>
      )}

      <h2 className="text-3xl font-bold text-ink">Who are you caring for today?</h2>
      {!showBanner && (
        <p className="mt-1 text-lg text-ink-soft">Tap someone to see their health info.</p>
      )}

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
        {lovedOne && (
          <li className="flex justify-center">
            {approved ? (
              <Link to={`/care/${lovedOne.id}`} className="rounded-2xl p-1">
                <Tile person={lovedOne} status="Full access" isNew={justAdded} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => showNotice(`Waiting for ${lovedOne.firstName} to approve`)}
                className="rounded-2xl p-1"
              >
                <Tile person={lovedOne} status="Pending" isNew={justAdded} />
              </button>
            )}
          </li>
        )}
        {existingFamily.map((p) => (
          <li key={p.id} className="flex justify-center">
            <button type="button" onClick={() => showNotice()} className="rounded-2xl p-1">
              <Tile person={p} status="Full access" />
            </button>
          </li>
        ))}
        <li className="flex justify-center">
          <Link to="/fam/add" className="flex flex-col items-center gap-1 rounded-2xl p-1">
            <span
              aria-hidden="true"
              className="flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-dashed border-cvs-blue bg-white text-5xl text-cvs-blue"
            >
              +
            </span>
            <span className="mt-1 text-lg font-bold text-cvs-blue">Add someone</span>
          </Link>
        </li>
      </ul>

      {/* Teaser for Flow 2 */}
      <div className="mt-8 rounded-2xl bg-cvs-blue-light p-4">
        <p className="flex items-center gap-2 text-lg font-bold text-ink">
          Need care for someone? <AIBadge />
        </p>
        <p className="mt-1 text-base text-ink">
          Talk to MinuteTwin, an AI NP, in minutes. No clinic visit needed for minor issues.
        </p>
        {approved ? (
          <Link
            to={`/care/${lovedOne.id}`}
            className="mt-3 inline-flex min-h-12 items-center rounded-full bg-cvs-blue px-5 text-base font-bold text-white"
          >
            Go to {lovedOne.firstName}&apos;s health
          </Link>
        ) : (
          <p className="mt-2 text-base font-semibold text-ink-soft">
            {lovedOne
              ? `Available once ${lovedOne.firstName} approves.`
              : 'Add a family member to get started.'}
          </p>
        )}
      </div>
    </PhoneShell>
  );
}
