import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import Banner from '../components/Banner.jsx';
import ProfileIcon from '../components/ProfileIcon.jsx';
import StepIndicator from '../components/StepIndicator.jsx';
import { LOGO_SRC } from '../components/CvsLogo.jsx';
import { existingFamily } from '../data/family.js';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

const TAG_STYLES = {
  Pending: 'bg-amber-100 text-amber-900',
  'Full access': 'bg-emerald-100 text-emerald-900',
  'Account owner': 'bg-white text-ink-soft border border-line',
};

/**
 * One profile tile. Every tile has the same structure and height so the rows line up:
 * icon · name · subtitle · tag.
 */
function Tile({ art, name, subtitle, tag, isNew }) {
  return (
    <span className="flex w-full flex-col items-center text-center">
      <span className="relative">
        {art}
        {isNew && (
          <span className="absolute -right-2 -top-2 rounded-full bg-cvs-red px-1.5 text-[13px] font-bold leading-5 text-white">
            New
          </span>
        )}
      </span>
      <span className="mt-1.5 h-6 whitespace-nowrap text-base font-bold leading-6 text-ink">
        {name}
      </span>
      <span className="h-5 text-sm leading-5 text-ink-soft">{subtitle}</span>
      <span className="mt-1 flex h-6 items-center">
        {tag && (
          <span
            className={`whitespace-nowrap rounded-full px-1.5 text-[13px] font-semibold leading-6 ${TAG_STYLES[tag]}`}
          >
            {tag}
          </span>
        )}
      </span>
    </span>
  );
}

// Profile step. Not a tab: it appears on first load (Get started) and again after
// someone is added. The bottom nav shows up only after a profile is selected.
export default function MyFam() {
  const { caregiver, lovedOne, justAdded, approveLovedOne, showNotice } = useAppState();
  const [bannerClosed, setBannerClosed] = useState(false);
  const closeBanner = useCallback(() => setBannerClosed(true), []);
  const pending = lovedOne?.status === 'pending';
  const approved = lovedOne?.status === 'approved';
  const youArt = <ProfileIcon icon={caregiver.icon} size="tile" />;

  // Step 3: the loved one approves on their side (not built). Simulated after a few seconds.
  useEffect(() => {
    if (!pending) return undefined;
    const t = setTimeout(approveLovedOne, DELAYS.approval);
    return () => clearTimeout(t);
  }, [pending, approveLovedOne]);

  const showPending = justAdded && pending;
  const showApproved = justAdded && approved && !bannerClosed;

  const tileButton = 'flex w-full justify-center rounded-2xl py-1';

  return (
    <PhoneShell hideHeader back={false} gray>
      <img src={LOGO_SRC} alt="CVS Health" className="h-auto w-44" />

      {showPending && (
        <div role="status" className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
          <StepIndicator step={3} progress={0.5} />
          <p className="mt-3 text-lg font-bold text-ink">Request sent to {lovedOne.firstName}</p>
          <p className="mt-1 text-base text-ink-soft">
            Waiting for {lovedOne.firstName} to approve your access…
          </p>
        </div>
      )}
      {showApproved && (
        <div className="mt-5">
          <Banner title={`${lovedOne.firstName} approved your access`} onDone={closeBanner}>
            Tap {lovedOne.firstName} to see her health info.
          </Banner>
        </div>
      )}

      <h1 className="mt-8 text-3xl font-bold leading-tight text-ink">
        Who are you caring for today?
      </h1>
      {!showPending && !showApproved && (
        <p className="mt-1 text-base text-ink-soft">Tap someone to see their health info.</p>
      )}

      <ul className="mt-6 grid grid-cols-3 gap-x-1 gap-y-3">
        <li>
          <button type="button" onClick={() => showNotice()} className={tileButton}>
            <Tile art={youArt} name="You" subtitle="Your health" tag="Account owner" />
          </button>
        </li>
        {lovedOne && (
          <li>
            {approved ? (
              <Link to={`/care/${lovedOne.id}`} className={tileButton}>
                <Tile
                  art={<ProfileIcon icon={lovedOne.icon} size="tile" />}
                  name={lovedOne.firstName}
                  subtitle={lovedOne.relationship}
                  tag="Full access"
                  isNew={justAdded}
                />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => showNotice(`Waiting for ${lovedOne.firstName} to approve`)}
                className={tileButton}
              >
                <Tile
                  art={<ProfileIcon icon={lovedOne.icon} size="tile" />}
                  name={lovedOne.firstName}
                  subtitle={lovedOne.relationship}
                  tag="Pending"
                  isNew={justAdded}
                />
              </button>
            )}
          </li>
        )}
        {existingFamily.map((p) => (
          <li key={p.id}>
            <button type="button" onClick={() => showNotice()} className={tileButton}>
              <Tile
                art={<ProfileIcon icon={p.icon} size="tile" />}
                name={p.firstName}
                subtitle={p.relationship}
                tag="Full access"
              />
            </button>
          </li>
        ))}
        <li>
          <Link to="/fam/add" className={tileButton}>
            <span className="flex w-full flex-col items-center text-center">
              <span
                aria-hidden="true"
                className="flex h-15 w-15 items-center justify-center rounded-2xl border-2 border-dashed border-cvs-blue bg-white text-4xl text-cvs-blue"
              >
                +
              </span>
              <span className="mt-1.5 h-6 whitespace-nowrap text-base font-bold leading-6 text-cvs-blue">
                Add someone
              </span>
              {/* Helper spans the subtitle + tag lines, so this tile matches the others' height */}
              <span className="flex h-12 items-start text-sm leading-5 text-ink-soft">
                Add a parent or loved one
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </PhoneShell>
  );
}
