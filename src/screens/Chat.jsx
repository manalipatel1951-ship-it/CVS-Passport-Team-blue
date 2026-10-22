import { useEffect, useRef, useState } from 'react';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import BigButton from '../components/BigButton.jsx';
import AIBadge, { AI_NAME, AI_SUBTITLE } from '../components/AIBadge.jsx';
import EscalationAlert from '../components/EscalationAlert.jsx';
import { matchReply } from '../ai/matchReply.js';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

// Pretend photo the caregiver "sends" (dummy art, not a real photo).
function SamplePhoto() {
  return (
    <span
      role="img"
      aria-label="Sample photo"
      className="block h-36 w-48 rounded-lg bg-gradient-to-br from-rose-200 via-orange-100 to-rose-300"
    />
  );
}

// Steps 7 and 8: "How can we help?" (empty state), then the conversation.
export default function Chat() {
  const { lovedOne, messages, setMessages, chatState, setChatState } = useAppState();
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const base = `/care/${lovedOne.id}`;

  // Keep the newest message in view. (Braces matter: in Chrome scrollIntoView returns a
  // Promise, and returning it from useEffect crashes React.)
  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (message) => {
    const result = matchReply(message, chatState, lovedOne.firstName);
    setChatState(result.state);
    setMessages((m) => [...m, { from: 'me', ...message }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'ai', text: result.reply, alert: result.alert }]);
      setTyping(false);
    }, DELAYS.typing);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() || typing) return;
    send({ text: text.trim() });
    setText('');
  };

  return (
    <PhoneShell
      title="Talk to AI"
      back={base}
      banner={<ContextBanner name={lovedOne.firstName} what="health chat" />}
      footer={
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-line p-3">
          <button
            type="button"
            onClick={() => !typing && send({ isPhoto: true })}
            aria-label="Add a photo"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-line text-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
          <label htmlFor="chat-input" className="sr-only">
            Message
          </label>
          <input
            id="chat-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message"
            autoComplete="off"
            className="min-h-12 min-w-0 flex-1 rounded-full border-2 border-line px-4 text-lg"
          />
          <button
            type="submit"
            disabled={typing}
            className="min-h-12 shrink-0 rounded-full bg-cvs-red px-5 text-lg font-bold text-white disabled:opacity-60"
          >
            Send
          </button>
        </form>
      }
    >
      <div className="flex items-start gap-3 rounded-xl bg-canvas p-3">
        <AIBadge />
        <div>
          <p className="text-base font-bold text-ink">{AI_NAME}</p>
          <p className="text-sm text-ink-soft">{AI_SUBTITLE}</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold text-ink">How can we help?</h2>
          <p className="text-lg text-ink-soft">
            Tell us what&apos;s going on with {lovedOne.firstName}, in your own words.
          </p>
        </div>
      ) : (
        <ol aria-live="polite" className="mt-4 flex flex-col gap-3">
          {messages.map((m, i) => (
            <li
              key={i}
              className={`flex flex-col gap-2 ${m.from === 'me' ? 'items-end' : 'items-start'}`}
            >
              {m.from === 'ai' && (
                <span className="flex items-center gap-1 text-sm font-semibold text-ink-soft">
                  <AIBadge /> {AI_NAME}
                </span>
              )}
              {m.isPhoto ? (
                <SamplePhoto />
              ) : (
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-base ${m.from === 'me' ? 'bg-cvs-red text-white' : 'bg-canvas text-ink'}`}
                >
                  {m.text}
                </p>
              )}
              {m.alert && (
                <div className="w-full">
                  <EscalationAlert level={m.alert} />
                </div>
              )}
            </li>
          ))}
          {typing && <li className="text-base text-ink-soft">AI is typing…</li>}
        </ol>
      )}
      <div ref={endRef} />

      {messages.length > 0 && !typing && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <BigButton to={`${base}/video`}>Video call</BigButton>
          <BigButton to={`${base}/summary`} variant="secondary">
            See summary
          </BigButton>
        </div>
      )}
    </PhoneShell>
  );
}
