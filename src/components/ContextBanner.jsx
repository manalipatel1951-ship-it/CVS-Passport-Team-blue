// UX rule: always show whose information the caregiver is viewing.
export default function ContextBanner({ name, what = 'dashboard' }) {
  return (
    <p className="bg-cvs-red-light px-4 py-2 text-base font-semibold text-cvs-red-dark">
      Viewing {name}&apos;s {what} as caregiver
    </p>
  );
}
