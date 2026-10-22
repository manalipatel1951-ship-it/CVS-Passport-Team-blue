import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';

const benefits = [
  {
    icon: 'M3 12h4l3-8 4 16 3-8h4',
    text: "See your loved one's health info, the same way they do",
  },
  {
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    text: 'Get help with minor issues from an AI NP, anytime',
  },
  {
    icon: 'M12 8v4l3 3M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    text: 'Skip the time off work for a walk-in visit',
  },
];

// Step 1: first screen of the demo. No Back button, since there's nowhere to go back to.
export default function Welcome() {
  return (
    <PhoneShell hideHeader>
      <div className="flex flex-1 flex-col">
        <p className="self-center rounded-full bg-canvas px-3 py-1 text-sm font-semibold text-ink-soft">
          Concept prototype
        </p>

        <div className="mt-10 flex flex-col items-center text-center">
          <img
            src="./brand/cvs-health-logo.png"
            alt="CVS Health"
            className="h-auto w-64 max-w-full"
          />
          <h1 className="mt-8 text-3xl font-bold text-ink">Caregiver Passport</h1>
          <p className="mt-3 text-lg text-ink-soft">
            Help care for the people you love, all in one place.
          </p>
        </div>

        <ul className="mt-10 flex flex-col gap-5">
          {benefits.map((b) => (
            <li key={b.text} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cvs-red-light text-cvs-red">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={b.icon} />
                </svg>
              </span>
              <span className="text-base text-ink">{b.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <BigButton to="/fam">Get started</BigButton>
        </div>
      </div>
    </PhoneShell>
  );
}
