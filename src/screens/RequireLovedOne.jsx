import { Navigate, useParams } from 'react-router-dom';
import { useAppState } from '../state/AppState.jsx';

// Flow 2 is locked until the Caregiver Passport (Flow 1) is complete AND the loved one
// has approved access. Anyone landing on a care screen too early is sent back to My Fam.
export default function RequireLovedOne({ children }) {
  const { lovedOne } = useAppState();
  const { id } = useParams();
  if (!lovedOne || lovedOne.id !== id || lovedOne.status !== 'approved') {
    return <Navigate to="/fam" replace />;
  }
  return children;
}
