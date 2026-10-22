import { useRef } from 'react';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import CaregiverIllustration from '../components/CaregiverIllustration.jsx';
import Icon from '../components/icons.jsx';
import { LOGO_SRC } from '../components/CvsLogo.jsx';
import Splash from './Splash.jsx';
import { useAppState } from '../state/AppState.jsx';

const benefits = [
  { icon: 'health', text: "See your loved one's health info, the same way they do" },
  {
    icon: 'chat',
    text: 'Get help with everyday concerns like rashes, colds, and allergies from MinuteTwin, our AI care assistant, anytime',
  },
  { icon: 'findCare', text: 'Skip the time off work for a walk-in visit' },
  { icon: 'lock', text: 'Your loved one stays in control of what you can see' },
];

// First screen of the demo (after the splash animation). No Back button: nowhere to go back to.
export default function Welcome() {
  const { splashDone, finishSplash } = useAppState();
  const logoRef = useRef(null);

  return (
    <PhoneShell
      hideHeader
      footer={
        <div className="border-t border-line bg-white px-4 pb-4 pt-3">
          <BigButton to="/fam">Get started</BigButton>
        </div>
      }
      overlay={!splashDone && <Splash targetRef={logoRef} onDone={finishSplash} />}
    >
      <div className="flex flex-1 flex-col">
        {/* Light blue hero, matching the CVS app */}
        <section className="-mx-4 -mt-5 bg-cvs-blue-light px-4 pb-4 pt-5 text-center">
          <p className="inline-block rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink-soft">
            Concept prototype
          </p>
          <img
            ref={logoRef}
            src={LOGO_SRC}
            alt="CVS Health"
            className="mx-auto mt-6 h-auto w-64 max-w-full"
            style={{ visibility: splashDone ? 'visible' : 'hidden' }}
          />
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink">
            Caregiver Passport
          </h1>
          <p className="mt-2 text-lg text-ink-soft">
            Help care for the people you love, all in one place.
          </p>
          <CaregiverIllustration className="mt-4" />
        </section>

        <ul className="mt-6 flex flex-col gap-4">
          {benefits.map((b) => (
            <li key={b.text} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-canvas text-cvs-red">
                <Icon name={b.icon} />
              </span>
              <span className="text-base text-ink">{b.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </PhoneShell>
  );
}
