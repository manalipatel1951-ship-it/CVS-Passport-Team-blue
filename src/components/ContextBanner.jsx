import ProfileIcon from './ProfileIcon.jsx';

// UX rule: always show whose information the caregiver is viewing. Neutral, not alarming.
export default function ContextBanner({ person, what = 'health' }) {
  return (
    <p className="flex items-center gap-2 border-b border-line bg-white px-4 py-2 text-base text-ink-soft">
      <ProfileIcon icon={person.icon} size="sm" />
      <span>
        Viewing <span className="font-semibold text-ink">{person.firstName}&apos;s</span> {what} as
        caregiver
      </span>
    </p>
  );
}
