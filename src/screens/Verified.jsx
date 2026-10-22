import { useLocation, useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import Icon from '../components/icons.jsx';
import ProfileIcon, { iconKeys, profileIcons } from '../components/ProfileIcon.jsx';
import PassportStamp, { contentIn } from '../components/PassportStamp.jsx';
import PassportHero, { HeaderHeart } from '../components/PassportHero.jsx';
import { useAppState } from '../state/AppState.jsx';

// What happens next, as a small vertical timeline.
function Timeline({ name, verifiedDetail }) {
  const items = [
    { text: "You're verified", detail: verifiedDetail, done: true },
    { text: `${name} approves your request`, done: false },
    { text: 'You can see her clinical, pharmacy, and lab info', done: false },
  ];
  return (
    <ol className="flex flex-col">
      {items.map((item, i) => (
        <li key={item.text} className="relative flex gap-3 pb-3 last:pb-0">
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
          <span className="pt-0.5">
            <span className={`text-base ${item.done ? 'font-semibold text-ink' : 'text-ink-soft'}`}>
              {item.text}
              <span className="sr-only">{item.done ? ' (done)' : ' (not yet)'}</span>
            </span>
            {item.detail && <span className="block text-sm text-ink-soft">{item.detail}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

// Step 2 of 3, done: "You're verified". No Back button (the ID is already verified).
// Everything (timeline + icon picker) fits above the pinned "Send request" button.
export default function Verified() {
  const { draft, setDraft, sendRequest } = useAppState();
  const navigate = useNavigate();
  const manual = useLocation().state?.manual === true;
  const name = draft.firstName || 'your loved one';
  const STAMP_SCALE = 0.68; // the passport stamp, shown smaller here to save space

  const send = () => {
    sendRequest();
    navigate('/fam');
  };

  return (
    <PhoneShell
      title="Verify it's you"
      back={false}
      titleIcon={<HeaderHeart />}
      footer={
        <div className="border-t border-line bg-white px-4 pb-4 pt-3">
          <BigButton onClick={send}>Send request to {name}</BigButton>
        </div>
      }
    >
      <PassportHero step={2} done>
        <div className="flex items-center gap-4">
          <div style={{ width: 112 * STAMP_SCALE, height: 144 * STAMP_SCALE }} className="shrink-0">
            <div
              style={{
                transform: `scale(${STAMP_SCALE})`,
                transformOrigin: 'top left',
                width: 112,
              }}
            >
              <PassportStamp />
            </div>
          </div>
          <div style={contentIn()}>
            <h2 className="text-3xl font-extrabold leading-tight text-ink">You&apos;re verified</h2>
            <p className="mt-1 text-lg text-ink-soft">Your identity is confirmed</p>
          </div>
        </div>
      </PassportHero>

      <div className="flex flex-col gap-5" style={contentIn(100)}>
        <section>
          <h3 className="mb-3 text-lg font-bold text-ink">What happens next</h3>
          <Timeline
            name={name}
            verifiedDetail={manual ? 'ID details matched' : 'ID and selfie matched'}
          />
        </section>

        <fieldset>
          <legend className="mb-2 text-lg font-bold text-ink">Pick an icon for {name}</legend>
          <div className="grid grid-cols-4 justify-items-center gap-3">
            {iconKeys.map((key) => (
              <label key={key} className="relative flex cursor-pointer">
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
                  className="ring-offset-2 peer-checked:ring-4 peer-checked:ring-cvs-blue peer-focus-visible:ring-4 peer-focus-visible:ring-cvs-blue"
                />
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </PhoneShell>
  );
}
