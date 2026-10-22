import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import BigButton from '../components/BigButton.jsx';
import CareLevels from '../components/CareLevels.jsx';
import EscalationAlert from '../components/EscalationAlert.jsx';
import RashPhoto from '../components/RashPhoto.jsx';
import Icon from '../components/icons.jsx';
import { getSummary } from '../ai/twin.js';
import { useAppState } from '../state/AppState.jsx';

function List({ title, items }) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <ul className="mt-2 flex list-disc flex-col gap-1 pl-6">
        {items.map((item) => (
          <li key={item} className="text-base text-ink">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

// Icon for each action row on the summary.
const actionIcon = (label) =>
  label.startsWith('Find') ? 'cart' : label.startsWith('Book') ? 'calendar' : 'share';

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

// Visit summary. Close returns to Sarah's Health.
export default function Summary() {
  const { lovedOne, caregiver, twin, closeVisit, showNotice } = useAppState();
  const navigate = useNavigate();
  const base = `/care/${lovedOne.id}`;
  const summary = getSummary(twin);
  const closing = useRef(false);

  // Only reachable once a MinuteTwin visit has finished. (While Close is moving to the
  // dashboard the visit has just been cleared, so show nothing for that moment.)
  if (!summary || twin.waiting !== 'done') {
    return closing.current ? null : <Navigate to={`${base}/chat`} replace />;
  }

  const close = () => {
    closing.current = true;
    closeVisit();
    navigate(base);
  };

  return (
    <PhoneShell
      title="Visit summary"
      back={base}
      banner={<ContextBanner person={lovedOne} what="visit summary" />}
      gray
    >
      <div className="flex flex-col gap-4">
        <div role="status" className="rounded-2xl border-2 border-emerald-700 bg-emerald-50 p-3">
          <p className="flex items-start gap-2 text-base font-semibold text-emerald-900">
            <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={3} />
            Sent to {lovedOne.firstName}&apos;s account and a MinuteClinic nurse practitioner for
            review. We&apos;ll let you know when it&apos;s been reviewed.
          </p>
          <p className="ml-7 mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-semibold text-amber-900">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-500" />
            NP review: Pending
          </p>
        </div>

        {twin.escalation && <EscalationAlert level={twin.escalation} />}

        {/* Visit details */}
        <section className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <dl className="flex-1 text-base">
            <dt className="sr-only">Patient</dt>
            <dd className="text-lg font-bold text-ink">
              {lovedOne.firstName} {lovedOne.lastName}
            </dd>
            <dt className="sr-only">Date and time</dt>
            <dd className="text-ink">{formatDateTime(twin.completedAt)}</dd>
            <dt className="sr-only">Visit type</dt>
            <dd className="text-ink">{summary.visitType}</dd>
            <dt className="sr-only">Requested by</dt>
            <dd className="text-ink-soft">Requested by {caregiver.firstName} (caregiver)</dd>
          </dl>
          {twin.photoSent && <RashPhoto className="h-20 w-24 shrink-0" />}
        </section>

        <section>
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Condition</p>
          <h2 className="text-2xl font-bold text-ink">{summary.condition}</h2>
        </section>

        <List title="Notes" items={summary.notes} />
        <List title="What to do" items={summary.whatToDo} />
        <CareLevels levels={summary.careLevels} />

        <div className="flex flex-col gap-3">
          {summary.actions.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => showNotice()}
              className="flex h-16 w-full items-center gap-3 rounded-2xl border border-line bg-white px-4 text-left text-base leading-5 font-semibold text-cvs-blue shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cvs-blue-light">
                <Icon name={actionIcon(label)} className="h-5 w-5" />
              </span>
              <span className="flex-1">{label}</span>
              <Icon name="chevron" className="h-5 w-5 shrink-0" />
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-ink-soft">
          Created by MinuteTwin (AI). This is not a diagnosis.
        </p>

        <BigButton onClick={close}>Close</BigButton>
      </div>
    </PhoneShell>
  );
}
