import PhoneShell from '../components/PhoneShell.jsx';

// Temporary screen to confirm the setup works. Replaced by the Welcome screen in step 1.
export default function SetupCheck() {
  return (
    <PhoneShell title="Setup check">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div aria-hidden="true" className="h-16 w-16 rounded-full bg-cvs-red" />
        <p className="text-2xl font-bold">The phone frame works</p>
        <p className="text-lg text-ink-soft">
          Every screen will appear inside this frame. The Welcome screen comes next.
        </p>
      </div>
    </PhoneShell>
  );
}
