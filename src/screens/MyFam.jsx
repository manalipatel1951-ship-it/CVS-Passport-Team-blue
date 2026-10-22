import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BottomNav from '../components/BottomNav.jsx';
import BigButton from '../components/BigButton.jsx';
import Banner from '../components/Banner.jsx';
import Sheet from '../components/Sheet.jsx';
import ProfileIcon from '../components/ProfileIcon.jsx';
import StepIndicator from '../components/StepIndicator.jsx';
import AIBadge from '../components/AIBadge.jsx';
import { HeaderActions } from '../components/HealthHeader.jsx';
import { existingFamily } from '../data/family.js';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

// One tile in the profile picker: big icon, name, relationship and access status.
function Tile({ person, label, status, isNew, size = 'lg' }) {
  return (
    <span className="flex flex-col items-center gap-1 text-center">
      <span className="relative">
        <ProfileIcon
          icon={person.icon}
          size={size}
          className={isNew ? 'ring-4 ring-cvs-blue ring-offset-2' : ''}
        />
        {isNew && (
          <span className="absolute -right-2 -top-2 rounded-full bg-cvs-red px-2 py-0.5 text-sm font-bold text-white">
            New
          </span>
        )}
      </span>
      <span className="mt-1 text-lg font-bold text-ink">{label ?? person.firstName}</span>
      {person.relationship && <span className="text-sm text-ink-soft">{person.relationship}</span>}
      {status && (
        <span
          className={`rounded-full px-2 py-0.5 text-sm font-semibold ${status === 'Pending' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}
        >
          {status}
        </span>
      )}
    </span>
  );
}

// Home screen: Manali picks whose health to look at, like a streaming profile picker.
export default function MyFam() {
  const { caregiver, lovedOne, justAdded, approveLovedOne, showNotice } = useAppState();
  const navigate = useNavigate();
  const [bannerClosed, setBannerClosed] = useState(false);
  const closeBanner = useCallback(() => setBannerClosed(true), []);
  const [picking, setPicking] = useState(false);
  const pending = lovedOne?.status === 'pending';
  const approved = lovedOne?.status === 'approved';
  const you = { icon: caregiver.icon };

  // Step 3: the loved one approves on their side (not built). Simulated after a few seconds.
  useEffect(() => {
    if (!pending) return undefined;
    const t = setTimeout(approveLovedOne, DELAYS.approval);
    return () => clearTimeout(t);
  }, [pending, approveLovedOne]);

  const showPending = justAdded && pending;
  const showApproved = justAdded && approved && !bannerClosed;

  // "Who needs care?": only Sarah's MinuteTwin visit is part of the demo.
  const pick = (who) => {
    if (who === 'lovedOne' && approved) {
      setPicking(false);
      navigate(`/care/${lovedOne.id}/chat`);
    } else if (who === 'lovedOne') {
      showNotice(`Waiting for ${lovedOne.firstName} to approve`);
    } else {
      showNotice();
    }
  };

  return (
    <PhoneShell
      title="My Fam"
      back={false}
      actions={<HeaderActions />}
      gray
      footer={<BottomNav active="home" />}
      overlay={
        picking && (
          <Sheet title="Who needs care?" onClose={() => setPicking(false)}>
            <ul className="grid grid-cols-3 gap-4">
              <li className="flex justify-center">
                <button type="button" onClick={() => pick('you')} className="rounded-2xl p-1">
                  <Tile person={you} label="You" size="md" />
                </button>
              </li>
              {lovedOne && (
                <li className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => pick('lovedOne')}
                    className="rounded-2xl p-1"
                  >
                    <Tile person={lovedOne} size="md" />
                  </button>
                </li>
              )}
              {existingFamily.map((p) => (
                <li key={p.id} className="flex justify-center">
                  <button type="button" onClick={() => pick(p.id)} className="rounded-2xl p-1">
                    <Tile person={p} size="md" />
                  </button>
                </li>
              ))}
            </ul>
            {!lovedOne && (
              <Link
                to="/fam/add"
                className="mt-5 flex min-h-12 items-center justify-center text-lg font-semibold text-cvs-blue underline"
              >
                Add a parent or anyone you care for
              </Link>
            )}
          </Sheet>
        )
      }
    >
      {showPending && (
        <div role="status" className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
          <StepIndicator step={3} />
          <p className="mt-3 text-lg font-bold text-ink">Request sent to {lovedOne.firstName}</p>
          <p className="mt-1 text-base text-ink-soft">
            Waiting for {lovedOne.firstName} to approve your access…
          </p>
        </div>
      )}
      {showApproved && (
        <Banner title={`${lovedOne.firstName} approved your access`} onDone={closeBanner}>
          Tap {lovedOne.firstName} to see her health info.
        </Banner>
      )}

      <h2 className="text-3xl font-bold text-ink">Who are you caring for today?</h2>
      {!showPending && !showApproved && (
        <p className="mt-1 text-lg text-ink-soft">Tap someone to see their health info.</p>
      )}

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
        <li className="flex justify-center">
          <button type="button" onClick={() => showNotice()} className="rounded-2xl p-1">
            <Tile person={you} label="You" />
          </button>
        </li>
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
          <Link
            to="/fam/add"
            className="flex max-w-40 flex-col items-center gap-1 rounded-2xl p-1 text-center"
          >
            <span
              aria-hidden="true"
              className="flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-dashed border-cvs-blue bg-white text-5xl text-cvs-blue"
            >
              +
            </span>
            <span className="mt-1 text-lg font-bold text-cvs-blue">Add someone</span>
            <span className="text-sm text-ink-soft">Add a parent or anyone you care for</span>
          </Link>
        </li>
      </ul>

      {/* MinuteTwin teaser (Flow 2) */}
      <section className="mb-6 mt-8 rounded-3xl bg-cvs-blue-light p-5">
        <p className="flex items-center gap-2 text-xl font-bold text-ink">
          MinuteTwin <AIBadge />
        </p>
        <p className="mt-2 text-base text-ink">
          Talk to MinuteTwin, our AI care assistant trained by MinuteClinic nurse practitioners.
          Help with everyday concerns like rashes, colds, and allergies, no clinic visit needed.
        </p>
        <div className="mt-4">
          <BigButton onClick={() => setPicking(true)} full={false}>
            Start a MinuteTwin visit
          </BigButton>
        </div>
      </section>
    </PhoneShell>
  );
}
