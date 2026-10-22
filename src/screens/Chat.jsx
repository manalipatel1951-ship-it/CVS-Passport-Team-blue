import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import BigButton from '../components/BigButton.jsx';
import AIBadge, { TWIN_NAME, TWIN_SUBTITLE } from '../components/AIBadge.jsx';
import EscalationAlert from '../components/EscalationAlert.jsx';
import CareLevels from '../components/CareLevels.jsx';
import RashPhoto from '../components/RashPhoto.jsx';
import Icon from '../components/icons.jsx';
import { getSummary } from '../ai/twin.js';
import { useAppState } from '../state/AppState.jsx';

// Short version of the summary, shown at the end of the chat.
function SummaryCard({ summary, to }) {
  return (
    <div className="w-full rounded-2xl border border-line bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Visit summary</p>
      <p className="mt-1 text-xl font-bold text-ink">{summary.condition}</p>
      <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-base text-ink">
        {summary.whatToDo.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <div className="mt-4">
        <BigButton to={to}>View full summary</BigButton>
      </div>
    </div>
  );
}

// The MinuteTwin visit: "How can we help?", then a scripted conversation (see src/ai/twinScripts.js).
// The caregiver's next message is pre-typed, so the presenter just taps Send.
export default function Chat() {
  const { lovedOne, twin, messages, typing, chatInput, setChatInput, sendToTwin } = useAppState();
  const navigate = useNavigate();
  const endRef = useRef(null);
  const base = `/care/${lovedOne.id}`;
  const summary = getSummary(twin);
  const waitingForPhoto = twin.waiting === 'photo' && !typing;

  // Keep the newest message in view. (Braces matter: in Chrome scrollIntoView returns a
  // Promise, and returning it from useEffect crashes React.)
  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages, typing]);

  const submit = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || typing) return;
    sendToTwin({ type: 'text', text: chatInput.trim() });
  };

  const renderTwinPart = (m) => {
    if (m.careLevels) return summary && <CareLevels levels={summary.careLevels} />;
    if (m.summaryCard) return summary && <SummaryCard summary={summary} to={`${base}/summary`} />;
    return (
      <>
        <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-base text-ink shadow-sm">
          {m.text}
        </p>
        {m.alert && (
          <div className="w-full">
            <EscalationAlert level={m.alert} />
          </div>
        )}
        {m.action === 'video' && twin.waiting === 'video' && (
          <BigButton onClick={() => navigate(`${base}/video`)} full={false}>
            Start video call
          </BigButton>
        )}
      </>
    );
  };

  return (
    <PhoneShell
      title="MinuteTwin"
      back={base}
      banner={<ContextBanner person={lovedOne} what="visit" />}
      gray
      footer={
        <form
          onSubmit={submit}
          className="flex items-center gap-2 border-t border-line bg-white p-3"
        >
          <button
            type="button"
            onClick={() => !typing && sendToTwin({ type: 'photo' })}
            aria-label="Send a photo"
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${waitingForPhoto ? 'animate-pulse border-cvs-blue bg-cvs-blue text-white' : 'border-line text-ink'}`}
          >
            <Icon name="camera" />
          </button>
          <label htmlFor="chat-input" className="sr-only">
            Message
          </label>
          <input
            id="chat-input"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={waitingForPhoto ? 'Tap the camera to send a photo' : 'Type a message'}
            autoComplete="off"
            className="min-h-12 min-w-0 flex-1 rounded-full border-2 border-line px-4 text-lg"
          />
          <button
            type="submit"
            disabled={typing}
            className="min-h-12 shrink-0 rounded-full bg-cvs-blue px-5 text-lg font-bold text-white disabled:opacity-60"
          >
            Send
          </button>
        </form>
      }
    >
      <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm">
        <AIBadge />
        <div>
          <p className="text-base font-bold text-ink">{TWIN_NAME}</p>
          <p className="text-sm text-ink-soft">{TWIN_SUBTITLE}</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold text-ink">How can we help?</h2>
          <p className="text-lg text-ink-soft">
            Tell MinuteTwin what&apos;s going on with {lovedOne.firstName}.
          </p>
        </div>
      ) : (
        <ol aria-live="polite" className="mt-4 flex flex-col gap-3">
          {messages.map((m, i) => {
            const showName = m.from === 'twin' && messages[i - 1]?.from !== 'twin';
            const align =
              m.from === 'me' ? 'items-end' : m.from === 'system' ? 'items-center' : 'items-start';
            return (
              <li key={i} className={`flex flex-col gap-2 ${align}`}>
                {showName && (
                  <span className="flex items-center gap-1 text-sm font-semibold text-ink-soft">
                    <AIBadge /> {TWIN_NAME}
                  </span>
                )}
                {m.from === 'twin' && renderTwinPart(m)}
                {m.from === 'me' &&
                  (m.photo ? (
                    <RashPhoto />
                  ) : (
                    <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-cvs-blue px-4 py-3 text-base text-white">
                      {m.text}
                    </p>
                  ))}
                {m.from === 'system' && (
                  <p className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink-soft">
                    {m.text}
                  </p>
                )}
              </li>
            );
          })}
          {typing && <li className="text-base text-ink-soft">MinuteTwin is typing…</li>}
        </ol>
      )}
      <div ref={endRef} />
    </PhoneShell>
  );
}
