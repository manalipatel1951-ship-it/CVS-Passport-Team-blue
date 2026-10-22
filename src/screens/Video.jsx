import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import NpMedia from '../components/NpMedia.jsx';
import AIBadge, { AI_NAME } from '../components/AIBadge.jsx';
import { videoLine } from '../ai/matchReply.js';
import { useAppState } from '../state/AppState.jsx';

// Step 9: video visit with the NP Digital Twin (placeholder until the real video is added).
export default function Video() {
  const { lovedOne, chatState } = useAppState();
  const [muted, setMuted] = useState(false);
  const base = `/care/${lovedOne.id}`;

  return (
    <PhoneShell
      title="Video visit"
      back={`${base}/chat`}
      banner={<ContextBanner name={lovedOne.firstName} what="video visit" />}
    >
      <div className="flex flex-1 flex-col gap-4">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
          <NpMedia />
          <p className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-black/70 px-2 py-1 text-sm font-semibold text-white">
            <AIBadge /> {AI_NAME}. Not a real person
          </p>
          {/* Caregiver's own camera (placeholder) */}
          <div
            aria-label="Your camera"
            role="img"
            className="absolute bottom-3 right-3 flex h-28 w-20 items-center justify-center rounded-lg border-2 border-white bg-neutral-700 text-sm font-semibold text-white"
          >
            You
          </div>
        </div>

        <p className="rounded-xl bg-canvas p-3 text-lg text-ink">
          <span className="font-bold">AI nurse: </span>
          &ldquo;{videoLine(chatState)}&rdquo;
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            type="button"
            aria-pressed={muted}
            onClick={() => setMuted(!muted)}
            className="min-h-14 rounded-xl border-2 border-ink text-lg font-bold text-ink"
          >
            {muted ? 'Unmute' : 'Mute'}
          </button>
          <Link
            to={`${base}/summary`}
            className="flex min-h-14 items-center justify-center rounded-xl bg-cvs-red text-lg font-bold text-white"
          >
            End call
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
