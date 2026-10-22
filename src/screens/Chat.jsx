import { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import BigButton from '../components/BigButton.jsx';
import AIBadge, { TWIN_NAME } from '../components/AIBadge.jsx';
import EscalationAlert from '../components/EscalationAlert.jsx';
import RashPhoto from '../components/RashPhoto.jsx';
import Icon from '../components/icons.jsx';
import { getSummary } from '../ai/twin.js';
import { GREETING, QUICK_STARTS } from '../ai/twinScripts.js';
import { useAppState } from '../state/AppState.jsx';

// "Visit summary: likely common cold" + View summary (paths without a video call).
function SummaryCard({ summary, to }) {
  return (
    <div className="w-full rounded-2xl border border-line bg-white p-4 shadow-sm">
      <p className="text-lg font-bold text-ink">
        Visit summary: {summary.condition.charAt(0).toLowerCase() + summary.condition.slice(1)}
      </p>
      <div className="mt-3">
        <BigButton to={to} full={false}>
          View summary
        </BigButton>
      </div>
    </div>
  );
}

function TwinName() {
  return (
    <span className="flex items-center gap-1 text-sm font-semibold text-ink-soft">
      <AIBadge /> {TWIN_NAME}
    </span>
  );
}

const bubbleTwin =
  'max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-base text-ink shadow-sm';

// The MinuteTwin visit (see src/ai/twinScripts.js). The caregiver's next message is
// pre-typed, so the presenter just taps Send.
export default function Chat() {
  const {
    lovedOne,
    twin,
    messages,
    typing,
    chatInput,
    setChatInput,
    photoAttached,
    setPhotoAttached,
    sendToTwin,
    chooseStart,
  } = useAppState();
  const navigate = useNavigate();
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const base = `/care/${lovedOne.id}`;
  const name = lovedOne.firstName;
  const summary = getSummary(twin);
  const waitingForPhoto = twin.waiting === 'photo' && !typing && !photoAttached;
  const started = messages.length > 0;

  // Keep the newest message in view. (Braces matter: in Chrome scrollIntoView returns a
  // Promise, and returning it from useEffect crashes React.)
  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages, typing]);

  // Grow the text box so the whole pre-filled message is visible.
  useLayoutEffect(() => {
    const box = inputRef.current;
    if (!box) return;
    box.style.height = 'auto';
    box.style.height = `${box.scrollHeight}px`;
  }, [chatInput]);

  const send = () => {
    if (typing) return;
    const text = chatInput.trim();
    if (photoAttached) sendToTwin({ type: 'photo', caption: text });
    else if (text) sendToTwin({ type: 'text', text });
  };

  const quickStart = (pathId, label) => {
    chooseStart(pathId, label);
    inputRef.current?.focus();
  };

  const renderTwin = (m) => {
    if (m.summaryCard) return summary && <SummaryCard summary={summary} to={`${base}/summary`} />;
    if (m.medsCheck) {
      return (
        <p className="flex max-w-[88%] items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cvs-red-light text-cvs-red">
            <Icon name="pill" className="h-5 w-5" />
          </span>
          {m.medsCheck}
        </p>
      );
    }
    return (
      <>
        <p className={bubbleTwin}>{m.text}</p>
        {m.alert && (
          <div className="w-full">
            <EscalationAlert level={m.alert} />
          </div>
        )}
        {m.action === 'video' && twin.waiting === 'video' && (
          <BigButton onClick={() => navigate(`${base}/video`)} full={false}>
            <Icon name="video" className="mr-2 h-6 w-6" />
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
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-line bg-white px-3 pb-3 pt-2"
        >
          <p className="mb-2 text-center text-sm text-ink-soft">For emergencies, call 911.</p>
          {photoAttached && (
            <div className="mb-2 flex items-center gap-2">
              <RashPhoto className="h-14 w-16" label="Photo of the rash, ready to send" />
              <span className="flex-1 text-sm text-ink-soft">Photo added</span>
              <button
                type="button"
                onClick={() => setPhotoAttached(false)}
                aria-label="Remove photo"
                className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-ink"
              >
                ×
              </button>
            </div>
          )}
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => !typing && setPhotoAttached(true)}
              aria-label="Add a photo"
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${waitingForPhoto ? 'animate-pulse border-cvs-blue bg-cvs-blue text-white' : 'border-line text-ink'}`}
            >
              <Icon name="camera" />
            </button>
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={
                waitingForPhoto
                  ? 'Tap the camera to add a photo'
                  : photoAttached
                    ? 'Add a caption'
                    : 'Type a message'
              }
              className="no-scrollbar max-h-36 min-h-12 min-w-0 flex-1 resize-none rounded-3xl border-2 border-line px-4 py-2.5 text-base leading-snug"
            />
            <button
              type="submit"
              disabled={typing}
              className="min-h-12 shrink-0 rounded-full bg-cvs-blue px-5 text-lg font-bold text-white disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </form>
      }
    >
      <ol aria-live="polite" className="flex flex-col gap-3">
        {/* MinuteTwin introduces itself (and says it's AI) */}
        <li className="flex flex-col items-start gap-2">
          <TwinName />
          <p className={bubbleTwin}>{GREETING.replaceAll('{name}', name)}</p>
        </li>

        {!started && (
          <li className="mt-1 flex flex-wrap gap-2" aria-label="Quick start">
            {QUICK_STARTS.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => quickStart(q.pathId, q.label)}
                aria-pressed={twin.tappedStart === q.label}
                className="min-h-12 rounded-full border-2 border-cvs-blue bg-white px-4 text-base font-semibold text-cvs-blue aria-pressed:bg-cvs-blue aria-pressed:text-white"
              >
                {q.label}
              </button>
            ))}
          </li>
        )}

        {messages.map((m, i) => {
          const showName = m.from === 'twin' && messages[i - 1]?.from !== 'twin';
          const align =
            m.from === 'me' ? 'items-end' : m.from === 'system' ? 'items-center' : 'items-start';
          return (
            <li key={i} className={`flex flex-col gap-2 ${align}`}>
              {showName && <TwinName />}
              {m.from === 'twin' && renderTwin(m)}
              {m.from === 'me' && (
                <div className="flex max-w-[85%] flex-col overflow-hidden rounded-2xl rounded-tr-sm bg-cvs-blue text-base text-white">
                  {m.photo && <RashPhoto className="h-40 w-full rounded-none" />}
                  {m.text && <p className="px-4 py-3">{m.text}</p>}
                </div>
              )}
              {m.from === 'system' && (
                <p className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink-soft">
                  {m.text}
                </p>
              )}
            </li>
          );
        })}
        {typing && (
          <li className="flex flex-col items-start gap-2">
            <p className={`${bubbleTwin} flex items-center gap-2`}>
              <span className="sr-only">MinuteTwin is typing…</span>
              <span aria-hidden="true" className="text-ink-soft">
                MinuteTwin is typing
              </span>
              <span aria-hidden="true" className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="typing-dot h-2 w-2 rounded-full bg-ink-soft"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
            </p>
          </li>
        )}
      </ol>
      <div ref={endRef} />
    </PhoneShell>
  );
}
