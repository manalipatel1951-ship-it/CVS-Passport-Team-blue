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

// Home screen: Manali picks whose health to look at, like a streaming profile picker.
export default function MyFam() {
  const { caregiver, lovedOne, justAdded, approveLovedOne, showNotice } = useAppState();
  const navigate = useNavigate();
  const [bannerClosed, setBannerClosed] = useState(false);
  const closeBanner = useCallback(() => setBannerClosed(true), []);
  const [picking, setPicking] = useState(false);
  const pending = lovedOne?.status === 'pending';
  const approved = lovedOne?.status === 'approved';
  const youArt = <ProfileIcon icon={caregiver.icon} size="tile" />;
  const ring = (isNew) => (isNew ? 'ring-4 ring-cvs-blue ring-offset-2' : '');

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

  const tileButton = 'flex w-full justify-center rounded-2xl py-1';

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
            <ul className="grid grid-cols-3 gap-x-2 gap-y-4">
              <li>
                <button type="button" onClick={() => pick('you')} className={tileButton}>
                  <Tile art={youArt} name="You" subtitle="Your health" />
                </button>
              </li>
              {lovedOne && (
                <li>
                  <button type="button" onClick={() => pick('lovedOne')} className={tileButton}>
                    <Tile
                      art={<ProfileIcon icon={lovedOne.icon} size="tile" />}
                      name={lovedOne.firstName}
                      subtitle={lovedOne.relationship}
                    />
                  </button>
                </li>
              )}
              {existingFamily.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => pick(p.id)} className={tileButton}>
                    <Tile
                      art={<ProfileIcon icon={p.icon} size="tile" />}
                      name={p.firstName}
                      subtitle={p.relationship}
                    />
                  </button>
                </li>
              ))}
            </ul>
            {!lovedOne && (
              <Link
                to="/fam/add"
                className="mt-5 flex min-h-12 items-center justify-center text-lg font-semibold text-cvs-blue underline"
              >
                Add a parent or loved one
              </Link>
            )}
          </Sheet>
        )
      }
    >
      {showPending && (
        <div role="status" className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
          <StepIndicator step={3} progress={0.5} />
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

      <h2 className="text-2xl font-bold text-ink">Who are you caring for today?</h2>
      {!showPending && !showApproved && (
        <p className="mt-1 text-base text-ink-soft">Tap someone to see their health info.</p>
      )}

      <ul className="mt-4 grid grid-cols-3 gap-x-1 gap-y-3">
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
                  art={<ProfileIcon icon={lovedOne.icon} size="tile" className={ring(justAdded)} />}
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
                  art={<ProfileIcon icon={lovedOne.icon} size="tile" className={ring(justAdded)} />}
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

      {/* MinuteTwin teaser (Flow 2) */}
      <section className="mb-4 mt-6 rounded-3xl bg-cvs-blue-light p-4">
        <p className="flex items-center gap-2 text-xl font-bold text-ink">
          MinuteTwin <AIBadge />
        </p>
        <p className="mt-1 text-base text-ink">
          Talk to MinuteTwin, our AI care assistant trained by MinuteClinic nurse practitioners.
          Help with everyday concerns like rashes, colds, and allergies, no clinic visit needed.
        </p>
        <div className="mt-3">
          <BigButton onClick={() => setPicking(true)} full={false}>
            Start a MinuteTwin visit
          </BigButton>
        </div>
      </section>
    </PhoneShell>
  );
}
