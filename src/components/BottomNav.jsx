import { Link } from 'react-router-dom';
import Icon from './icons.jsx';
import { useAppState } from '../state/AppState.jsx';

const tabs = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'health', label: 'Your Health', icon: 'health' },
  { id: 'findCare', label: 'Find Care', icon: 'findCare' },
  { id: 'vaccines', label: 'Vaccine Records', icon: 'vaccineRecords' },
];

/**
 * Floating bottom navigation, matching the CVS app.
 * Home = My Fam. Your Health = the loved one's dashboard (once they've approved access).
 * Find Care and Vaccine Records aren't part of this demo.
 */
export default function BottomNav({ active }) {
  const { lovedOne, showNotice } = useAppState();
  const healthTo = lovedOne?.status === 'approved' ? `/care/${lovedOne.id}` : null;
  const routes = { home: '/fam', health: healthTo };

  return (
    <nav aria-label="Main" className="px-3 pb-3 pt-1">
      <ul className="grid grid-cols-4 gap-1 rounded-full border border-line bg-white p-1.5 shadow-lg">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          const className = `flex min-h-14 w-full flex-col items-center justify-center gap-0.5 rounded-full text-xs font-semibold leading-tight ${isActive ? 'bg-canvas text-ink' : 'text-ink-soft'}`;
          const content = (
            <>
              <Icon name={tab.icon} className={`h-6 w-6 ${isActive ? 'text-cvs-red' : ''}`} />
              {tab.label}
            </>
          );
          const to = routes[tab.id];
          return (
            <li key={tab.id}>
              {to ? (
                <Link to={to} aria-current={isActive ? 'page' : undefined} className={className}>
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    showNotice(
                      tab.id === 'health' ? 'Add a family member first' : 'Not part of this demo',
                    )
                  }
                  className={className}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
