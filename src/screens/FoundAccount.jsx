import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import PassportHero, { HeaderHeart } from '../components/PassportHero.jsx';
import Icon from '../components/icons.jsx';
import { useAppState } from '../state/AppState.jsx';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Step 1 of 3 (continued): "We found Sarah's account". Shows only a partial name and
// birth month/year, so the caregiver can confirm without seeing private details.
export default function FoundAccount() {
  const { draft, showNotice } = useAppState();
  const [month, , year] = draft.dateOfBirth.split('/');
  const name = draft.firstName;

  return (
    <PhoneShell title="Who are you adding?" back="/fam/add" actions={<HeaderHeart />}>
      <PassportHero step={1} intro="We searched CVS for a matching account." />
      <section className="rounded-3xl border border-line bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-lg font-bold text-ink">
          <Icon name="check" className="h-6 w-6 text-cvs-red" strokeWidth={3} />
          We found {name}&apos;s account
        </p>
        <p className="mt-4 text-2xl font-bold text-ink">
          {name} {draft.lastName.charAt(0)}.
        </p>
        <p className="text-lg text-ink-soft">
          Born {MONTHS[Number(month) - 1]} {year}
        </p>
        <div className="mt-5">
          <BigButton to="/fam/add/verify">Yes, that&apos;s her</BigButton>
        </div>
        <button
          type="button"
          onClick={() => showNotice()}
          className="mx-auto mt-3 flex min-h-12 items-center px-4 text-lg font-semibold text-cvs-blue underline"
        >
          Not her?
        </button>
      </section>
    </PhoneShell>
  );
}
