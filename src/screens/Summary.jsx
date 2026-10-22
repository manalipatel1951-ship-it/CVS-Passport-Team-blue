import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import BigButton from '../components/BigButton.jsx';
import EscalationAlert from '../components/EscalationAlert.jsx';
import { buildSummary } from '../ai/matchReply.js';
import { useAppState } from '../state/AppState.jsx';

function List({ title, items }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <ul className="flex list-disc flex-col gap-1 pl-6">
        {items.map((item) => (
          <li key={item} className="text-base text-ink">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

// Step 10: visit summary. Close returns to the loved one's dashboard.
export default function Summary() {
  const { lovedOne, chatState, resetChat } = useAppState();
  const navigate = useNavigate();
  const base = `/care/${lovedOne.id}`;
  const summary = buildSummary(chatState);

  const close = () => {
    resetChat();
    navigate(base);
  };

  return (
    <PhoneShell
      title="Visit summary"
      back={`${base}/chat`}
      banner={<ContextBanner name={lovedOne.firstName} what="visit summary" />}
    >
      <div className="flex flex-1 flex-col gap-5">
        <p
          role="status"
          className="flex items-center gap-2 rounded-xl border-2 border-emerald-700 bg-emerald-50 p-3 text-base font-semibold text-emerald-900"
        >
          <span aria-hidden="true">✓</span> Sent to NP: a CVS nurse practitioner will review this
          summary.
        </p>

        {summary.escalation && <EscalationAlert level={summary.escalation} />}

        <p className="text-xl font-bold text-ink">{summary.title}</p>
        <List title="Notes" items={summary.notes} />
        <List title="What to do" items={summary.recommendations} />
        <List title="Get seen in person if" items={summary.warnSigns} />

        <div className="mt-auto pt-4">
          <BigButton onClick={close}>Close</BigButton>
        </div>
      </div>
    </PhoneShell>
  );
}
