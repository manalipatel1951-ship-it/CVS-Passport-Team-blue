import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import TextField from '../components/TextField.jsx';
import StepIndicator from '../components/StepIndicator.jsx';
import ProfileIcon, { iconKeys, profileIcons } from '../components/ProfileIcon.jsx';
import { relationships } from '../data/family.js';
import { useAppState } from '../state/AppState.jsx';

// Step 1 of 3: who are you adding? (Pre-filled with demo data, all editable.)
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
    if (!draft.dateOfBirth) found.dateOfBirth = 'Please enter a date of birth';
    setErrors(found);
    if (Object.keys(found).length === 0) navigate('/fam/add/verify');
  };

  return (
    <PhoneShell title="Add family member" back="/fam">
      <StepIndicator step={1} />
      <form onSubmit={next} noValidate className="flex flex-1 flex-col gap-5">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-lg font-bold text-ink">
            Does this person already have a CVS account?
          </legend>
          {['yes', 'no'].map((v) => (
            <label
              key={v}
              className="flex min-h-12 items-center gap-3 rounded-xl border-2 border-line px-3 text-lg"
            >
              <input
                type="radio"
                name="hasCvsAccount"
                value={v}
                checked={draft.hasCvsAccount === v}
                onChange={update('hasCvsAccount')}
                className="h-5 w-5 accent-cvs-blue"
              />
              {v === 'yes' ? 'Yes' : 'No'}
            </label>
          ))}
        </fieldset>

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
          label="Date of birth"
          type="date"
          value={draft.dateOfBirth}
          onChange={update('dateOfBirth')}
          error={errors.dateOfBirth}
        />
        <TextField
          id="phone"
          label="Phone (optional)"
          type="tel"
          value={draft.phone}
          onChange={update('phone')}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="relationship" className="text-base font-semibold text-ink">
            They are my…
          </label>
          <select
            id="relationship"
            value={draft.relationship}
            onChange={update('relationship')}
            className="min-h-12 rounded-lg border-2 border-line bg-white px-3 text-lg"
          >
            {relationships.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="mb-2 text-base font-semibold text-ink">Pick an icon</legend>
          <div className="grid grid-cols-4 gap-3">
            {iconKeys.map((key) => (
              <label key={key} className="relative flex cursor-pointer justify-center">
                <input
                  type="radio"
                  name="icon"
                  value={key}
                  checked={draft.icon === key}
                  onChange={update('icon')}
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

        <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
          <BigButton to="/fam" variant="secondary">
            Back
          </BigButton>
          <BigButton type="submit">Next</BigButton>
        </div>
      </form>
    </PhoneShell>
  );
}
