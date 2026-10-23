import ProfileIcon from './ProfileIcon.jsx';
import Icon from './icons.jsx';
import { useAppState } from '../state/AppState.jsx';

// Header pieces for the loved one's health screens, matching the CVS app:
// profile icon on the left, round icon buttons on the right.
// The icon does not open the profile step. That step only appears on first load
// and after someone is added.
export function ProfileSwitcher({ person }) {
  const { showNotice } = useAppState();
  return (
    <button
      type="button"
      aria-label={`${person.firstName}'s profile`}
      onClick={() => showNotice()}
      className="flex min-h-12 min-w-12 items-center justify-center rounded-xl"
    >
      <ProfileIcon icon={person.icon} size="md" className="h-11 w-11" />
    </button>
  );
}

export function HeaderActions() {
  const { showNotice } = useAppState();
  const buttons = [
    { icon: 'chat', label: 'Chat', className: 'text-cvs-blue' },
    { icon: 'mail', label: 'Messages', className: 'text-ink' },
    { icon: 'cart', label: 'Cart', className: 'text-ink' },
  ];
  return buttons.map((b) => (
    <button
      key={b.label}
      type="button"
      aria-label={b.label}
      onClick={() => showNotice()}
      className={`flex h-12 w-12 items-center justify-center rounded-full bg-canvas shadow-sm ${b.className}`}
    >
      <Icon name={b.icon} />
    </button>
  ));
}
