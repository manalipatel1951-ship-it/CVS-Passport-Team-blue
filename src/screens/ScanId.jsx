import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import Icon from '../components/icons.jsx';
import PassportHero, { HeaderHeart } from '../components/PassportHero.jsx';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

// Step 2 of 3: the CAREGIVER proves who they are (not the loved one), so a stolen
// license or someone else's photo can't be used. Pretend camera, nothing is captured.
//
// Phases:  front → scanningFront → frontDone → back → scanningBack →
//          selfie (liveness: "Slowly turn your head", oval fills) → selfieReady →
//          matching ("Matching your selfie to your ID…") → success screen
const AUTO_NEXT = {
  scanningFront: ['frontDone', 'scan'],
  frontDone: ['back', 'frontScanned'],
  scanningBack: ['selfie', 'scan'],
  selfie: ['selfieReady', 'liveness'],
};

const PARTS = [
  { label: 'Front', icon: 'cardFront' },
  { label: 'Back', icon: 'cardBack' },
  { label: 'Selfie', icon: 'face' },
];
const partOf = (phase) => (/front/i.test(phase) ? 0 : /back/i.test(phase) ? 1 : 2);

// Front · Back · Selfie as small icons: current one highlighted, finished ones checked.
function PartsRow({ current }) {
  return (
    <ol className="mt-3 grid grid-cols-3 gap-2" aria-label="Verification steps">
      {PARTS.map((p, i) => {
        const done = i < current;
        const now = i === current;
        return (
          <li
            key={p.label}
            aria-current={now ? 'step' : undefined}
            className="flex flex-col items-center gap-1"
          >
            <span
              className={`relative flex h-10 w-10 items-center justify-center rounded-full ${now ? 'bg-cvs-blue text-white' : done ? 'bg-white text-ink' : 'bg-white/60 text-ink-soft'}`}
            >
              <Icon name={p.icon} />
              {done && (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cvs-red text-white">
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3.5} />
                </span>
              )}
            </span>
            <span className={`text-sm ${now ? 'font-bold text-ink' : 'text-ink-soft'}`}>
              {p.label}
              {done && <span className="sr-only"> (done)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function IdCamera({ phase }) {
  const scanning = phase.startsWith('scanning');
  return (
    <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-3xl bg-neutral-800">
      <span
        aria-hidden="true"
        className={`flex aspect-[1.586] w-[82%] items-end justify-center rounded-2xl border-4 border-dashed pb-3 text-sm font-semibold text-white ${scanning ? 'animate-pulse border-emerald-400' : 'border-white'}`}
      >
        {/front/i.test(phase) ? 'Front' : 'Back'}
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

// Portrait camera, nearly full width. The liveness check starts as soon as it opens.
function SelfieCamera({ phase }) {
  const checking = phase === 'selfie';
  const ready = phase === 'selfieReady' || phase === 'matching';
  return (
    <div className="relative mx-auto flex aspect-[6/7] w-[88%] items-center justify-center overflow-hidden rounded-3xl bg-neutral-800">
      <svg aria-hidden="true" viewBox="0 0 160 210" className="h-[72%]">
        <ellipse
          cx="80"
          cy="105"
          rx="74"
          ry="99"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          strokeDasharray="8 7"
          opacity={checking || ready ? 0.35 : 1}
        />
        {(checking || ready) && (
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
            style={{
              animation: checking ? `oval-fill ${DELAYS.liveness}ms linear forwards` : undefined,
              strokeDashoffset: ready ? 0 : undefined,
            }}
          />
        )}
      </svg>
      {checking && (
        <span className="absolute bottom-5 rounded-full bg-black/70 px-3 py-1 text-base font-semibold text-white">
          Slowly turn your head
        </span>
      )}
      {phase === 'selfieReady' && (
        <span className="absolute bottom-5 flex items-center gap-1 rounded-full bg-emerald-700 px-3 py-1 text-base font-semibold text-white">
          <Icon name="check" className="h-4 w-4" strokeWidth={3} /> Movement detected
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

  const current = partOf(phase);
  const isSelfie = current === 2;
  const headline = [
    'Scan your driver’s license or state ID',
    'Now scan the back',
    'Now take a quick selfie',
  ][current];
  const tip = [
    'Use good lighting and avoid glare',
    'Make sure the barcode is fully visible',
    'Face the camera and remove hats or sunglasses',
  ][current];
  const privacy = isSelfie
    ? "Your selfie is only used to match your ID and isn't saved."
    : `This keeps ${name}'s health info safe. We use it only to confirm it's you.`;
  const status = {
    front: 'Scan the front of your ID',
    scanningFront: 'Scanning the front of your ID…',
    frontDone: 'Front scanned',
    back: 'Now scan the back of your ID',
    scanningBack: 'Scanning the back of your ID…',
    selfie: 'Slowly turn your head',
    selfieReady: 'Movement detected. Take your selfie.',
    matching: 'Matching your selfie to your ID…',
  }[phase];
  const action = {
    front: ['Scan front', () => setPhase('scanningFront')],
    back: ['Scan back', () => setPhase('scanningBack')],
    selfie: ['Take selfie', null], // unlocks once the liveness check finishes
    selfieReady: ['Take selfie', () => setPhase('matching')],
  }[phase];

  const linkClass =
    'flex min-h-12 items-center justify-center px-2 text-base font-semibold text-cvs-blue underline';

  return (
    <PhoneShell
      title="Verify it's you"
      back="/fam/add/found"
      titleIcon={<HeaderHeart />}
      footer={
        <div className="border-t border-line bg-white px-4 pb-2 pt-3">
          {action ? (
            <button
              type="button"
              onClick={action[1] ?? undefined}
              disabled={!action[1]}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-cvs-blue px-6 text-lg font-bold text-white disabled:bg-neutral-300 disabled:text-ink-soft"
            >
              {action[0]}
            </button>
          ) : (
            <p
              aria-hidden="true"
              className="flex min-h-14 items-center justify-center text-lg font-semibold text-ink-soft"
            >
              {status}
            </p>
          )}
          <div className="mt-1 flex items-center justify-center gap-4">
            {!isSelfie && (
              <>
                <Link to="/fam/add/manual" className={linkClass}>
                  Enter manually
                </Link>
                <span aria-hidden="true" className="text-ink-soft">
                  ·
                </span>
              </>
            )}
            <button type="button" onClick={() => showNotice()} className={linkClass}>
              Verify in store
            </button>
          </div>
        </div>
      }
    >
      <PassportHero step={2} progress={current / 3} headline={headline}>
        <PartsRow current={current} />
      </PassportHero>

      <div className="flex flex-col gap-3">
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
