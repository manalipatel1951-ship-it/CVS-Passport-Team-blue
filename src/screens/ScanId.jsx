import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import StepIndicator from '../components/StepIndicator.jsx';
import Icon from '../components/icons.jsx';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

// Step 2 of 3: the CAREGIVER proves who they are (not the loved one), so a stolen
// license or someone else's photo can't be used. Pretend scan, no real camera.
// Phases: front → scanningFront → back → scanningBack → selfie → scanningSelfie → done
const NEXT_AFTER_SCAN = { scanningFront: 'back', scanningBack: 'selfie', scanningSelfie: 'done' };

function CameraFrame({ phase }) {
  const scanning = phase.startsWith('scanning');
  const isSelfie = phase === 'selfie' || phase === 'scanningSelfie';
  const ring = scanning ? 'animate-pulse border-emerald-400' : 'border-white';
  return (
    <div
      className="flex h-52 items-center justify-center rounded-2xl bg-neutral-800"
      aria-hidden="true"
    >
      {isSelfie ? (
        <span className={`h-44 w-36 rounded-[50%] border-4 border-dashed ${ring}`} />
      ) : (
        <span
          className={`flex h-32 w-52 items-center justify-center rounded-xl border-4 border-dashed text-sm font-semibold text-white ${ring}`}
        >
          {phase.toLowerCase().includes('back') ? 'Back of ID' : 'Front of ID'}
        </span>
      )}
    </div>
  );
}

// "You're verified": a calm white success screen, no camera.
function Verified({ name, manual, onSend }) {
  const checks = manual
    ? ['ID details entered', 'Details matched to your account']
    : ['ID scanned (front and back)', 'Selfie matched to your ID'];
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Icon name="check" className="h-14 w-14" strokeWidth={3} />
        </span>
        <h2 className="mt-5 text-3xl font-bold text-ink">You&apos;re verified</h2>
        <p className="mt-1 text-lg text-ink-soft">Your identity is confirmed</p>
      </div>

      <ul className="mt-6 flex flex-col gap-3 rounded-2xl border border-line p-4">
        {checks.map((c) => (
          <li key={c} className="flex items-center gap-3 text-lg text-ink">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Icon name="check" className="h-5 w-5" strokeWidth={3} />
            </span>
            {c}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-lg text-ink">
        Next, we&apos;ll send {name} a request to approve your access. Once {name} approves,
        you&apos;ll be able to see her clinical, pharmacy, and lab information.
      </p>

      <div className="mt-auto pt-6">
        <BigButton onClick={onSend}>Send request to {name}</BigButton>
      </div>
    </div>
  );
}

export default function ScanId() {
  const { draft, sendRequest } = useAppState();
  const location = useLocation();
  // Coming back from "Fill it in myself" skips straight to the verified screen.
  const manual = location.state?.manual === true;
  const [phase, setPhase] = useState(manual ? 'done' : 'front');
  const navigate = useNavigate();
  const name = draft.firstName || 'your loved one';

  useEffect(() => {
    const nextPhase = NEXT_AFTER_SCAN[phase];
    if (!nextPhase) return undefined;
    const t = setTimeout(() => setPhase(nextPhase), DELAYS.scan);
    return () => clearTimeout(t);
  }, [phase]);

  const send = () => {
    sendRequest();
    navigate('/fam');
  };

  const instructions = {
    front: 'Scan the front of your driver’s license or ID',
    scanningFront: 'Scanning the front…',
    back: 'Now scan the back of your ID',
    scanningBack: 'Scanning the back…',
    selfie: 'Now take a quick selfie so we can match it to your ID',
    scanningSelfie: 'Matching your selfie…',
  }[phase];

  const action = {
    front: ['Scan front of ID', 'scanningFront'],
    back: ['Scan back of ID', 'scanningBack'],
    selfie: ['Take selfie', 'scanningSelfie'],
  }[phase];

  return (
    <PhoneShell title="Verify it's you" back="/fam/add">
      <StepIndicator step={2} />
      {phase === 'done' ? (
        <Verified name={name} manual={manual} onSend={send} />
      ) : (
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink">Prove you&apos;re you</h2>
            <p className="mt-1 text-base text-ink-soft">
              Scan the front and back of your own ID, then take a quick selfie that&apos;s matched
              to the photo on the ID.
            </p>
          </div>

          <CameraFrame phase={phase} />

          <p role="status" className="text-center text-lg font-semibold text-ink">
            {instructions}
          </p>
          <p className="flex items-start gap-2 rounded-xl bg-canvas p-3 text-base text-ink-soft">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-cvs-blue" />
            This keeps {name}&apos;s health info safe. We use it only to confirm it&apos;s you.
          </p>

          <div className="mt-auto flex flex-col gap-3">
            {action && <BigButton onClick={() => setPhase(action[1])}>{action[0]}</BigButton>}
            <BigButton to="/fam/add/manual" variant="secondary">
              Fill it in myself
            </BigButton>
          </div>
        </div>
      )}
    </PhoneShell>
  );
}
