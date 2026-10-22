import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

// Step 4: pretend ID scan, then pretend face check. Always offers "Fill it in myself".
// Phases: id → scanningId → face → scanningFace → done
export default function ScanId() {
  const { draft, addLovedOne } = useAppState();
  const [phase, setPhase] = useState('id');
  const navigate = useNavigate();
  const name = draft.firstName || 'them';

  useEffect(() => {
    const nextPhase = { scanningId: 'face', scanningFace: 'done' }[phase];
    if (!nextPhase) return undefined;
    const t = setTimeout(() => setPhase(nextPhase), DELAYS.scan);
    return () => clearTimeout(t);
  }, [phase]);

  const finish = () => {
    addLovedOne();
    navigate('/fam');
  };

  const isFace = phase === 'face' || phase === 'scanningFace';
  const scanning = phase === 'scanningId' || phase === 'scanningFace';

  const instructions = {
    id: `Hold ${name}'s driver's license or ID inside the frame.`,
    scanningId: 'Scanning ID…',
    face: `Now hold the phone up to ${name}'s face to confirm it's them.`,
    scanningFace: 'Checking face…',
    done: `${name}'s identity is confirmed.`,
  }[phase];

  return (
    <PhoneShell title="Verify identity" back="/fam/add">
      <div className="flex flex-1 flex-col gap-5">
        {/* Pretend camera view */}
        <div
          className="flex aspect-[4/3] items-center justify-center rounded-xl bg-neutral-800"
          aria-hidden="true"
        >
          {phase === 'done' ? (
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-5xl text-white">
              ✓
            </span>
          ) : isFace ? (
            <span
              className={`h-44 w-36 rounded-[50%] border-4 border-dashed ${scanning ? 'animate-pulse border-emerald-400' : 'border-white'}`}
            />
          ) : (
            <span
              className={`h-32 w-52 rounded-lg border-4 border-dashed ${scanning ? 'animate-pulse border-emerald-400' : 'border-white'}`}
            />
          )}
        </div>

        <p role="status" className="text-center text-lg font-semibold text-ink">
          {instructions}
        </p>

        <div className="mt-auto flex flex-col gap-3">
          {phase === 'id' && <BigButton onClick={() => setPhase('scanningId')}>Scan ID</BigButton>}
          {phase === 'face' && (
            <BigButton onClick={() => setPhase('scanningFace')}>Start face check</BigButton>
          )}
          {phase === 'done' && <BigButton onClick={finish}>Add {name}</BigButton>}
          {phase !== 'done' && (
            <BigButton to="/fam/add/manual" variant="secondary">
              Fill it in myself
            </BigButton>
          )}
        </div>
      </div>
    </PhoneShell>
  );
}
