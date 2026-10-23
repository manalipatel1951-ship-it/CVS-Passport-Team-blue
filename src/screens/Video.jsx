import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import NpMedia from '../components/NpMedia.jsx';
import AIBadge, { TWIN_NAME } from '../components/AIBadge.jsx';
import RashPhoto from '../components/RashPhoto.jsx';
import Icon from '../components/icons.jsx';
import { getVideoLines } from '../ai/twin.js';
import { useAppState } from '../state/AppState.jsx';

// ─── Video call timings (milliseconds from the start of the call). Adjust freely. ───
export const CALL = {
  firstCaption: 1500, // "Thanks for the photo. Can you hold the camera closer…"
  flipCamera: 3500, // your small view switches to Sarah's arm
  secondCaption: 5500, // "Thanks, I've got what I need…" (with a small nod)
  autoEnd: 7500, // the call ends by itself and the summary is prepared
};
// ─────────────────────────────────────────────────────────────────────────────

const mmss = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function RoundButton({ label, onClick, pressed, danger = false, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex h-16 w-16 items-center justify-center rounded-full ${danger ? 'bg-cvs-red text-white' : pressed ? 'bg-white text-ink' : 'bg-white/25 text-white backdrop-blur'}`}
    >
      {children}
    </button>
  );
}

// Video visit with MinuteTwin. Full-screen video with everything floating on top.
// No Back button during the call: End call (or the automatic end) leads to the summary.
export default function Video() {
  const { lovedOne, twin, sendToTwin } = useAppState();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [caption, setCaption] = useState(0); // 0 none, 1 first, 2 second
  // false = the caregiver's own camera; true = flipped to show Sarah's arm
  const [flipped, setFlipped] = useState(false);
  const ended = useRef(false);
  const lines = getVideoLines(twin, lovedOne.firstName);
  // Always call the latest sendToTwin, without restarting the call's timers.
  const sendRef = useRef(sendToTwin);
  useEffect(() => {
    sendRef.current = sendToTwin;
  }, [sendToTwin]);

  const endCall = useCallback(() => {
    if (ended.current) return;
    ended.current = true;
    sendRef.current({ type: 'videoEnded' });
    navigate(`/care/${lovedOne.id}/preparing`, { replace: true });
  }, [navigate, lovedOne.id]);

  useEffect(() => {
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
    const timers = [
      setTimeout(() => setCaption(1), CALL.firstCaption),
      setTimeout(() => setFlipped(true), CALL.flipCamera),
      setTimeout(() => setCaption(2), CALL.secondCaption),
      setTimeout(endCall, CALL.autoEnd),
    ];
    return () => {
      clearInterval(tick);
      timers.forEach(clearTimeout);
    };
  }, [endCall]);

  return (
    <PhoneShell hideHeader bare>
      <h1 className="sr-only">MinuteTwin video visit</h1>
      <div className="relative flex-1 overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <NpMedia />
        </div>

        {/* Top: status, AI label, whose visit */}
        <div className="absolute inset-x-0 top-0 flex flex-col items-center gap-2 bg-gradient-to-b from-black/60 to-transparent px-4 pb-8 pt-4 text-white">
          <p className="text-base font-semibold">
            Connected · <span aria-label="Call time">{mmss(seconds)}</span>
          </p>
          <p className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-sm font-semibold">
            <AIBadge inverted /> {TWIN_NAME}. Not a real person
          </p>
          <p className="rounded-full bg-white/90 px-3 py-0.5 text-sm font-semibold text-ink">
            {lovedOne.firstName}&apos;s visit
          </p>
        </div>

        {/* Self-view (top right) */}
        <div className="absolute right-3 top-36 h-36 w-24 overflow-hidden rounded-xl border-2 border-white bg-neutral-700 shadow-lg">
          {flipped ? (
            <RashPhoto
              className="h-full w-full rounded-none"
              label={`Your camera, showing ${lovedOne.firstName}'s arm`}
            />
          ) : (
            <div
              role="img"
              aria-label="Your camera"
              className="flex h-full w-full items-center justify-center text-sm font-semibold text-white"
            >
              You
            </div>
          )}
        </div>

        {/* Bottom: live caption and call buttons */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 bg-gradient-to-t from-black/75 to-transparent px-4 pb-8 pt-16">
          <p aria-live="polite" className="min-h-20 w-full text-center">
            {caption > 0 && (
              <span
                key={caption}
                className="animate-slide-in inline-block rounded-xl bg-black/75 px-4 py-2 text-lg text-white"
              >
                {lines[caption - 1]}
              </span>
            )}
          </p>
          <div className="flex items-center gap-6">
            <RoundButton
              label={muted ? 'Unmute' : 'Mute'}
              pressed={muted}
              onClick={() => setMuted(!muted)}
            >
              <Icon name={muted ? 'micOff' : 'mic'} className="h-7 w-7" />
            </RoundButton>
            <RoundButton label="Flip camera" pressed={flipped} onClick={() => setFlipped(!flipped)}>
              <Icon name="flip" className="h-7 w-7" />
            </RoundButton>
            <RoundButton label="End call" danger onClick={endCall}>
              <Icon name="phoneDown" className="h-8 w-8" />
            </RoundButton>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
