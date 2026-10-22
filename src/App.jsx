import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Welcome from './screens/Welcome.jsx';
import ComingSoon from './screens/ComingSoon.jsx';

// Every screen gets one route here. Screens are added one step at a time
// (see docs/PROGRESS.md for which ones exist so far).
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/fam" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
