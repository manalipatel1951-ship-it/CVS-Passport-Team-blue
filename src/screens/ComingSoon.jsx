import PhoneShell from '../components/PhoneShell.jsx';

// Stand-in for screens that aren't built yet, so the demo never dead-ends while in progress.
export default function ComingSoon() {
  return (
    <PhoneShell title="Coming soon" back="/">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <p className="text-2xl font-bold">This screen isn&apos;t built yet</p>
        <p className="text-lg text-ink-soft">See docs/PROGRESS.md for what&apos;s next.</p>
      </div>
    </PhoneShell>
  );
}
