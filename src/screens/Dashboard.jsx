import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import ContextBanner from '../components/ContextBanner.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { AI_NAME } from '../components/AIBadge.jsx';
import { dashboardCards } from '../data/dashboard.js';
import { useAppState } from '../state/AppState.jsx';

// Step 6: the loved one's dashboard, the same info they'd see in their own CVS app.
export default function Dashboard() {
  const { lovedOne, setJustAdded } = useAppState();
  const base = `/care/${lovedOne.id}`;

  // The "has been added" message on My Fam has done its job.
  useEffect(() => {
    setJustAdded(false);
  }, [setJustAdded]);

  return (
    <PhoneShell
      title={`${lovedOne.firstName}'s Dashboard`}
      back="/fam"
      banner={<ContextBanner name={lovedOne.firstName} />}
      footer={<BottomNav homeTo={base} />}
    >
      <div className="flex flex-col gap-4">
        <Link
          to={`${base}/chat`}
          className="flex flex-col gap-2 rounded-xl bg-cvs-red p-5 text-white"
        >
          <span className="flex items-center gap-2">
            <span className="text-2xl font-bold">Talk to AI</span>
            <span className="rounded-md bg-white px-2 py-0.5 text-sm font-bold text-cvs-red">
              AI
            </span>
          </span>
          <span className="text-base">
            Chat or video call with an {AI_NAME} about a minor health issue.
          </span>
        </Link>

        {dashboardCards.map((card) => (
          <section
            key={card.id}
            aria-labelledby={`card-${card.id}`}
            className="rounded-xl border-2 border-line p-4"
          >
            <h2 id={`card-${card.id}`} className="text-lg font-bold text-ink">
              {card.title}
            </h2>
            <ul className="mt-2 flex flex-col gap-1">
              {card.lines.map((line) => (
                <li key={line} className="text-base text-ink">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PhoneShell>
  );
}
