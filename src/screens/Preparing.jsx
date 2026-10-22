import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell.jsx';
import { CvsHeart } from '../components/CvsLogo.jsx';
import { DELAYS } from '../config/demo.js';
import { useAppState } from '../state/AppState.jsx';

// Short loading screen after the video call, then the visit summary opens.
export default function Preparing() {
  const { lovedOne } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(
      () => navigate(`/care/${lovedOne.id}/summary`, { replace: true }),
      DELAYS.preparing,
    );
    return () => clearTimeout(t);
  }, [navigate, lovedOne.id]);

  return (
    <PhoneShell hideHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span className="animate-pulse">
          <CvsHeart height={56} />
        </span>
        <h1 role="status" className="text-2xl font-bold text-ink">
          Preparing {lovedOne.firstName}&apos;s visit summary…
        </h1>
      </div>
    </PhoneShell>
  );
}
