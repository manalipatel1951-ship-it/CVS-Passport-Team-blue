import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import { records } from '../data/dashboard.js';
import { getPath } from '../ai/twin.js';
import { useAppState } from '../state/AppState.jsx';

const isToday = (iso) => new Date(iso).toDateString() === new Date().toDateString();

// One record from Sarah's Health (Prescriptions, Upcoming appointments, …).
export default function RecordDetail() {
  const { lovedOne, visits, markVisitsSeen } = useAppState();
  const { recordId } = useParams();
  const record = records.find((r) => r.id === recordId);
  const isVisits = recordId === 'visits';

  // Opening Previous visits clears its "New" tag.
  useEffect(() => {
    if (isVisits) markVisitsSeen();
  }, [isVisits, markVisitsSeen]);

  if (!record) return <Navigate to={`/care/${lovedOne.id}`} replace />;

  const twinVisits = isVisits
    ? visits.map((v) => {
        const when = isToday(v.completedAt)
          ? 'today'
          : new Date(v.completedAt).toLocaleDateString();
        return `MinuteTwin visit ${when}: ${getPath(v.pathId).summary.short}. Summary sent to NP.`;
      })
    : [];

  return (
    <PhoneShell
      title={record.title}
      back={`/care/${lovedOne.id}`}
      banner={<ContextBanner person={lovedOne} />}
      gray
    >
      <ul className="divide-y divide-line rounded-3xl border border-line bg-white">
        {[...twinVisits, ...record.lines].map((line) => (
          <li key={line} className="px-4 py-4 text-lg text-ink">
            {line}
          </li>
        ))}
      </ul>
    </PhoneShell>
  );
}
