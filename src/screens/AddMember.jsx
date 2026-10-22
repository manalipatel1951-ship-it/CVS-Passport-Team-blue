import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import TextField from '../components/TextField.jsx';
import PassportHero, { HeaderHeart } from '../components/PassportHero.jsx';
import { relationships } from '../data/family.js';
import { useAppState } from '../state/AppState.jsx';

// Valid US date: MM/DD/YYYY
const US_DATE = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;

// Adds the slashes as you type: "04121958" → "04/12/1958".
function formatDate(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join('/');
}

// Step 1 of 3: who are you adding? Just enough to find their CVS account.
export default function AddMember() {
  const { draft, setDraft } = useAppState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const update = (field) => (e) => setDraft({ ...draft, [field]: e.target.value });

  const next = (e) => {
    e.preventDefault();
    const found = {};
    if (!draft.firstName.trim()) found.firstName = 'Please enter a first name';
    if (!draft.lastName.trim()) found.lastName = 'Please enter a last name';
    if (!US_DATE.test(draft.dateOfBirth)) found.dateOfBirth = 'Please enter a date like 04/12/1958';
    setErrors(found);
    if (Object.keys(found).length === 0) navigate('/fam/add/found');
  };

  return (
    <PhoneShell title="Who are you adding?" back="/fam" actions={<HeaderHeart />}>
      <PassportHero step={1} intro="We'll use this to find their CVS account." />
      <form onSubmit={next} noValidate className="flex flex-1 flex-col gap-5">
        <TextField
          id="firstName"
          label="First name"
          value={draft.firstName}
          onChange={update('firstName')}
          error={errors.firstName}
          autoComplete="off"
        />
        <TextField
          id="lastName"
          label="Last name"
          value={draft.lastName}
          onChange={update('lastName')}
          error={errors.lastName}
          autoComplete="off"
        />
        <TextField
          id="dateOfBirth"
          label="Date of birth (MM/DD/YYYY)"
          inputMode="numeric"
          placeholder="MM/DD/YYYY"
          value={draft.dateOfBirth}
          onChange={(e) => setDraft({ ...draft, dateOfBirth: formatDate(e.target.value) })}
          error={errors.dateOfBirth}
          autoComplete="off"
        />

        <fieldset>
          <legend className="mb-2 text-base font-semibold text-ink">They are my…</legend>
          <div className="flex flex-wrap gap-2">
            {relationships.map((r) => (
              <label key={r} className="cursor-pointer">
                <input
                  type="radio"
                  name="relationship"
                  value={r}
                  checked={draft.relationship === r}
                  onChange={update('relationship')}
                  className="peer sr-only"
                />
                <span className="flex min-h-12 items-center rounded-full border-2 border-line bg-white px-5 text-lg text-ink peer-checked:border-cvs-blue peer-checked:bg-cvs-blue peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cvs-blue">
                  {r}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-auto pt-4">
          <BigButton type="submit">Next</BigButton>
        </div>
      </form>
    </PhoneShell>
  );
}
