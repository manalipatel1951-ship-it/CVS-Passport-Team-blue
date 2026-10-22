import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import Sheet from '../components/Sheet.jsx';
import Icon from '../components/icons.jsx';
import PassportHero, { FaceArt, HeaderHeart, IdCardArt } from '../components/PassportHero.jsx';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

// Step 2 of 3: the CAREGIVER proves who they are (not the loved one), so a stolen
// license or someone else's photo can't be used. Pretend camera, nothing is captured.
//
// Phases:  front → scanningFront → frontDone → back → scanningBack →
//          selfie → liveness → matching → (success screen)
const AUTO_NEXT = {
  scanningFront: ['frontDone', 'scan'],
  frontDone: ['back', 'frontScanned'],
  scanningBack: ['selfie', 'scan'],
  liveness: ['matching', 'liveness'],
};

const STEPS = ['ID front', 'ID back', 'Selfie'];
const stepOf = (phase) => (/front/i.test(phase) ? 0 : /back/i.test(phase) ? 1 : 2);

// "ID front · ID back · Selfie", with finished steps checked off.
function ProgressRow({ current }) {
  return (
    <ol
      className="mt-3 flex flex-wrap items-center gap-x-2 text-base"
      aria-label="Verification steps"
    >
      {STEPS.map((s, i) => (
        <li key={s} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="mr-1 text-ink-soft">
              ·
            </span>
          )}
          {i < current && <Icon name="check" className="h-4 w-4 text-cvs-red" strokeWidth={3} />}
          <span
            aria-current={i === current ? 'step' : undefined}
            className={
              i === current
                ? 'font-bold text-ink underline decoration-cvs-red decoration-2 underline-offset-4'
                : i < current
                  ? 'text-ink'
                  : 'text-ink-soft'
            }
          >
            {s}
            {i < current && <span className="sr-only"> (done)</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

function IdCamera({ phase }) {
  const scanning = phase.startsWith('scanning');
  return (
    <div className="relative flex h-60 items-center justify-center overflow-hidden rounded-3xl bg-neutral-800">
      <span
        aria-hidden="true"
        className={`flex aspect-[1.586] w-[82%] items-end justify-center rounded-2xl border-4 border-dashed pb-3 text-sm font-semibold text-white ${scanning ? 'animate-pulse border-emerald-400' : 'border-white'}`}
      >
        {/front/i.test(phase) ? 'Front of ID' : 'Back of ID'}
      </span>
      {phase === 'frontDone' && (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-800/90 text-xl font-bold text-white">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600">
            <Icon name="check" className="h-9 w-9" strokeWidth={3} />
          </span>
          Front scanned
        </span>
      )}
    </div>
  );
}

function SelfieCamera({ phase }) {
  const checking = phase === 'liveness';
  return (
    <div className="relative mx-auto flex h-72 w-60 items-center justify-center overflow-hidden rounded-3xl bg-neutral-800">
      <svg aria-hidden="true" viewBox="0 0 160 210" className="h-56 w-44">
        <ellipse
          cx="80"
          cy="105"
          rx="74"
          ry="99"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          strokeDasharray="8 7"
          opacity={checking ? 0.35 : 1}
        />
        {checking && (
          <ellipse
            cx="80"
            cy="105"
            rx="74"
            ry="99"
            fill="none"
            stroke="#34d399"
            strokeWidth="6"
            pathLength="100"
            strokeDasharray="100"
            style={{ animation: `oval-fill ${DELAYS.liveness}ms linear forwards` }}
          />
        )}
      </svg>
      {checking && (
        <span className="absolute bottom-4 rounded-full bg-black/70 px-3 py-1 text-base font-semibold text-white">
          Slowly turn your head
        </span>
      )}
      {phase === 'matching' && (
        <span className="absolute inset-0 flex items-center justify-center bg-neutral-800/90 px-6 text-center text-lg font-bold text-white">
          Matching your selfie to your ID…
        </span>
      )}
    </div>
  );
}

export default function ScanId() {
  const { draft, showNotice } = useAppState();
  const [phase, setPhase] = useState('front');
  const [otherWay, setOtherWay] = useState(false);
  const statusRef = useRef(null);
  const navigate = useNavigate();
  const name = draft.firstName || 'your loved one';

  // Timed steps (scanning, "Front scanned", liveness), then matching → success screen.
  useEffect(() => {
    if (phase === 'matching') {
      const t = setTimeout(() => navigate('/fam/add/verified', { replace: true }), DELAYS.matching);
      return () => clearTimeout(t);
    }
    const auto = AUTO_NEXT[phase];
    if (!auto) return undefined;
    const t = setTimeout(() => setPhase(auto[0]), DELAYS[auto[1]]);
    return () => clearTimeout(t);
  }, [phase, navigate]);

  // Move focus to the status after each step, so no button keeps a stale highlight
  // and screen readers hear what changed.
  useEffect(() => {
    statusRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const current = stepOf(phase);
  const isSelfie = current === 2;

  const tip = [
    'Use good lighting and avoid glare',
    'Make sure the barcode is fully visible',
    'Face the camera and remove hats or sunglasses',
  ][current];
  const privacy = isSelfie
    ? "Your selfie is only used to match your ID and isn't saved."
    : `This keeps ${name}'s health info safe. We use it only to confirm it's you.`;
  const status = {
    front: 'Scan the front of your driver’s license or ID',
    scanningFront: 'Scanning the front of your ID…',
    frontDone: 'Front scanned',
    back: 'Now scan the back of your ID',
    scanningBack: 'Scanning the back of your ID…',
    selfie: 'Now take a quick selfie so we can match it to your ID',
    liveness: 'Slowly turn your head',
    matching: 'Matching your selfie to your ID…',
  }[phase];
  const action = {
    front: ['Scan front of ID', 'scanningFront'],
    back: ['Scan back of ID', 'scanningBack'],
    selfie: ['Take selfie', 'liveness'],
  }[phase];

  return (
    <PhoneShell
      title="Verify it's you"
      back="/fam/add/found"
      actions={<HeaderHeart />}
      footer={
        <div className="flex flex-col gap-1 border-t border-line bg-white px-4 pb-3 pt-3">
          {action ? (
            <BigButton onClick={() => setPhase(action[1])}>{action[0]}</BigButton>
          ) : (
            <p
              aria-hidden="true"
              className="flex min-h-14 items-center justify-center text-lg font-semibold text-ink-soft"
            >
              {status}
            </p>
          )}
          <button
            type="button"
            onClick={() => setOtherWay(true)}
            className="flex min-h-12 items-center justify-center text-lg font-semibold text-cvs-blue underline"
          >
            Verify another way
          </button>
        </div>
      }
      overlay={
        otherWay && (
          <Sheet title="Verify another way" onClose={() => setOtherWay(false)}>
            <div className="flex flex-col gap-3">
              <BigButton to="/fam/add/manual">Enter your ID details manually</BigButton>
              <BigButton variant="secondary" onClick={() => showNotice()}>
                Verify in person at any CVS Pharmacy
              </BigButton>
            </div>
          </Sheet>
        )
      }
    >
      <PassportHero
        step={2}
        intro="Scan the front and back of your own ID, then take a quick selfie that's matched to the photo on the ID."
        art={isSelfie ? <FaceArt /> : <IdCardArt />}
      >
        <ProgressRow current={current} />
      </PassportHero>

      <div className="flex flex-1 flex-col gap-3">
        <p ref={statusRef} tabIndex={-1} role="status" className="sr-only">
          {status}
        </p>
        {isSelfie ? <SelfieCamera phase={phase} /> : <IdCamera phase={phase} />}
        <p className="text-center text-base text-ink-soft">{tip}</p>
        <p className="flex items-start gap-2 rounded-2xl bg-canvas p-3 text-base text-ink-soft">
          <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-cvs-red" />
          {privacy}
        </p>
      </div>
    </PhoneShell>
  );
}
