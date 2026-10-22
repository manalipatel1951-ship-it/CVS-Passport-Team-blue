import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import TextField from '../components/TextField.jsx';
import { useAppState } from '../state/AppState.jsx';

// Step 4 alternative: type the ID details instead of scanning (UX rule: always offer a manual option).
export default function ManualEntry() {
  const { draft, addLovedOne } = useAppState();
  const navigate = useNavigate();
  const [id, setId] = useState({ number: 'D123-4567-8901', state: 'RI', expires: '2029-04-12' });
  const [error, setError] = useState('');
  const name = draft.firstName || 'them';

  const submit = (e) => {
    e.preventDefault();
    if (!id.number.trim()) {
      setError('Please enter the ID number');
      return;
    }
    addLovedOne();
    navigate('/fam');
  };

  return (
    <PhoneShell title="Enter ID details" back="/fam/add/verify">
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col gap-5">
        <p className="text-lg text-ink-soft">
          Type the details from {name}&apos;s driver&apos;s license or ID.
        </p>
        <TextField
          id="idNumber"
          label="ID number"
          value={id.number}
          onChange={(e) => setId({ ...id, number: e.target.value })}
          error={error}
          autoComplete="off"
        />
        <TextField
          id="idState"
          label="State"
          value={id.state}
          onChange={(e) => setId({ ...id, state: e.target.value })}
        />
        <TextField
          id="idExpires"
          label="Expiration date"
          type="date"
          value={id.expires}
          onChange={(e) => setId({ ...id, expires: e.target.value })}
        />
        <div className="mt-auto pt-4">
          <BigButton type="submit">Add {name}</BigButton>
        </div>
      </form>
    </PhoneShell>
  );
}
