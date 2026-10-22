import { useLocation, useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import Icon from '../components/icons.jsx';
import ProfileIcon, { iconKeys, profileIcons } from '../components/ProfileIcon.jsx';
import PassportStamp, { contentIn } from '../components/PassportStamp.jsx';
import PassportHero, { HeaderHeart } from '../components/PassportHero.jsx';
import { useAppState } from '../state/AppState.jsx';

// What happens next, as a small vertical timeline.
function Timeline({ name }) {
  const items = [
    { text: "You're verified", done: true },
    { text: `${name} approves your request`, done: false },
    { text: 'You can see her clinical, pharmacy, and lab info', done: false },
  ];
  return (
    <ol className="flex flex-col">
      {items.map((item, i) => (
        <li key={item.text} className="relative flex gap-3 pb-4 last:pb-0">
          {i < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-[13px] top-7 h-[calc(100%-1.5rem)] w-0.5 bg-line"
            />
          )}
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${item.done ? 'bg-cvs-red text-white' : 'border-2 border-line bg-white'}`}
          >
            {item.done && <Icon name="check" className="h-4 w-4" strokeWidth={3} />}
          </span>
          <span
            className={`pt-0.5 text-lg ${item.done ? 'font-semibold text-ink' : 'text-ink-soft'}`}
          >
            {item.text}
            <span className="sr-only">{item.done ? ' (done)' : ' (not yet)'}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

// Step 2 of 3, done: "You're verified". No Back button (the ID is already verified).
export default function Verified() {
  const { draft, setDraft, sendRequest } = useAppState();
  const navigate = useNavigate();
  const manual = useLocation().state?.manual === true;
  const name = draft.firstName || 'your loved one';
  const checks = manual
    ? ['ID details entered', 'Details matched to your account']
    : ['ID scanned (front and back)', 'Selfie matched to your ID'];

  const send = () => {
    sendRequest();
    navigate('/fam');
  };

  return (
    <PhoneShell
      title="Verify it's you"
      back={false}
      actions={<HeaderHeart />}
      footer={
        <div className="border-t border-line bg-white px-4 pb-4 pt-3">
          <BigButton onClick={send}>Send request to {name}</BigButton>
        </div>
      }
    >
      <PassportHero step={2}>
        <PassportStamp />
        <div className="mt-3 text-center" style={contentIn()}>
          <h2 className="text-3xl font-extrabold text-ink">You&apos;re verified</h2>
          <p className="mt-1 text-lg text-ink-soft">Your identity is confirmed</p>
        </div>
      </PassportHero>

      <div className="flex flex-1 flex-col gap-5" style={contentIn(100)}>
        <ul className="flex flex-col gap-3 rounded-2xl border border-line p-4">
          {checks.map((c) => (
            <li key={c} className="flex items-center gap-3 text-lg text-ink">
              <Icon name="check" className="h-6 w-6 shrink-0 text-cvs-red" strokeWidth={3} />
              {c}
            </li>
          ))}
        </ul>

        <section>
          <h3 className="mb-3 text-lg font-bold text-ink">What happens next</h3>
          <Timeline name={name} />
        </section>

        <fieldset>
          <legend className="mb-2 text-lg font-bold text-ink">Pick an icon for {name}</legend>
          <div className="grid grid-cols-4 gap-3">
            {iconKeys.map((key) => (
              <label key={key} className="relative flex cursor-pointer justify-center">
                <input
                  type="radio"
                  name="icon"
                  value={key}
                  checked={draft.icon === key}
                  onChange={() => setDraft({ ...draft, icon: key })}
                  aria-label={profileIcons[key].name}
                  className="peer sr-only"
                />
                <ProfileIcon
                  icon={key}
                  size="md"
                  className="h-16 w-16 ring-offset-2 peer-checked:ring-4 peer-checked:ring-cvs-blue peer-focus-visible:ring-4 peer-focus-visible:ring-cvs-blue"
                />
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </PhoneShell>
  );
}
