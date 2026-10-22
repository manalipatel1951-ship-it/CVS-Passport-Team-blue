import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import Avatar from '../components/Avatar.jsx';
import { existingFamily } from '../data/family.js';
import { useAppState } from '../state/AppState.jsx';

// Steps 2 and 5: family members as avatars, plus a + button to add someone.
export default function MyFam() {
  const { lovedOne, justAdded } = useAppState();
  const [notice, setNotice] = useState('');

  return (
    <PhoneShell title="My Fam" back="/">
      {justAdded && lovedOne && (
        <div
          role="status"
          className="mb-5 rounded-xl border-2 border-emerald-700 bg-emerald-50 p-4"
        >
          <p className="text-lg font-bold text-emerald-900">{lovedOne.firstName} has been added</p>
          <p className="mt-1 text-base text-emerald-900">
            Tap {lovedOne.firstName} to see her health info.
          </p>
        </div>
      )}

      <p className="text-lg text-ink-soft">Tap someone to see their health info.</p>

      <ul className="mt-6 grid grid-cols-3 gap-y-6">
        {lovedOne && (
          <li className="flex justify-center">
            <Link to={`/care/${lovedOne.id}`} className="rounded-xl p-1">
              <Avatar name={lovedOne.firstName} caption={lovedOne.relationship} />
            </Link>
          </li>
        )}
        {existingFamily.map((p) => (
          <li key={p.id} className="flex justify-center">
            <button
              type="button"
              onClick={() =>
                setNotice(
                  `Caregiver access isn't set up for ${p.firstName} yet. This demo follows ${lovedOne?.firstName ?? 'your loved one'}.`,
                )
              }
              className="rounded-xl p-1"
            >
              <Avatar name={p.firstName} caption={p.relationship} color={p.color} />
            </button>
          </li>
        ))}
        <li className="flex justify-center">
          <Link to="/fam/add" className="flex flex-col items-center gap-1 rounded-xl p-1">
            <span
              aria-hidden="true"
              className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-cvs-red text-4xl text-cvs-red"
            >
              +
            </span>
            <span className="text-base font-semibold text-cvs-red">Add someone</span>
          </Link>
        </li>
      </ul>

      {notice && (
        <p role="status" className="mt-6 rounded-xl bg-canvas p-4 text-base text-ink">
          {notice}
        </p>
      )}
    </PhoneShell>
  );
}
