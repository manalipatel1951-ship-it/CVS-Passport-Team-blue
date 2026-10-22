import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import BigButton from '../components/BigButton.jsx';
import TextField from '../components/TextField.jsx';
import PassportHero, { HeaderHeart, IdCardArt } from '../components/PassportHero.jsx';
import { useAppState } from '../state/AppState.jsx';

// "Verify another way" → the caregiver types their OWN ID details instead of scanning
// (UX rule: always offer a manual option to scanning and face matching).
export default function ManualEntry() {
  const { caregiver } = useAppState();
  const navigate = useNavigate();
  const [id, setId] = useState(caregiver.id);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => setId({ ...id, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!id.fullName.trim()) found.fullName = 'Please enter your full name';
    if (!id.number.trim()) found.number = 'Please enter your ID number';
    setErrors(found);
    if (Object.keys(found).length === 0) {
      navigate('/fam/add/verified', { state: { manual: true } });
    }
  };

  return (
    <PhoneShell title="Enter your ID details" back="/fam/add/verify" actions={<HeaderHeart />}>
      <PassportHero
        step={2}
        intro="Type the details from your own driver's license or ID."
        art={<IdCardArt />}
      />
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col gap-5">
        <TextField
          id="idName"
          label="Full name (as on your ID)"
          value={id.fullName}
          onChange={update('fullName')}
          error={errors.fullName}
          autoComplete="off"
        />
        <TextField
          id="idNumber"
          label="ID number"
          value={id.number}
          onChange={update('number')}
          error={errors.number}
          autoComplete="off"
        />
        <TextField id="idState" label="State" value={id.state} onChange={update('state')} />
        <TextField
          id="idExpires"
          label="Expiration date (MM/DD/YYYY)"
          inputMode="numeric"
          value={id.expires}
          onChange={update('expires')}
        />
        <div className="mt-auto pt-4">
          <BigButton type="submit">Verify me</BigButton>
        </div>
      </form>
    </PhoneShell>
  );
}
