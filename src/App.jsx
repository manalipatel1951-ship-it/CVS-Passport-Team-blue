import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import SetupCheck from './screens/SetupCheck.jsx';

// Every screen gets one route here. Screens are added one step at a time
// (see docs/PROGRESS.md for which ones exist so far).
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SetupCheck />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
