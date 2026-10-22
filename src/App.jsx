import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from './state/AppState.jsx';
import Welcome from './screens/Welcome.jsx';
import MyFam from './screens/MyFam.jsx';
import AddMember from './screens/AddMember.jsx';
import ScanId from './screens/ScanId.jsx';
import ManualEntry from './screens/ManualEntry.jsx';
import RequireLovedOne from './screens/RequireLovedOne.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Chat from './screens/Chat.jsx';
import Video from './screens/Video.jsx';
import Summary from './screens/Summary.jsx';
import ComingSoon from './screens/ComingSoon.jsx';

// Every screen gets one route here.
// Flow 1 (Caregiver Passport): / → /fam → /fam/add → /fam/add/verify (or /fam/add/manual) → /fam
// Flow 2 (NP Digital Twin):   /care/:id → /care/:id/chat → /care/:id/video → /care/:id/summary
export default function App() {
  return (
    <AppStateProvider>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/fam" element={<MyFam />} />
          <Route path="/fam/add" element={<AddMember />} />
          <Route path="/fam/add/verify" element={<ScanId />} />
          <Route path="/fam/add/manual" element={<ManualEntry />} />
          <Route
            path="/care/:id"
            element={
              <RequireLovedOne>
                <Dashboard />
              </RequireLovedOne>
            }
          />
          <Route
            path="/care/:id/chat"
            element={
              <RequireLovedOne>
                <Chat />
              </RequireLovedOne>
            }
          />
          <Route
            path="/care/:id/video"
            element={
              <RequireLovedOne>
                <Video />
              </RequireLovedOne>
            }
          />
          <Route
            path="/care/:id/summary"
            element={
              <RequireLovedOne>
                <Summary />
              </RequireLovedOne>
            }
          />
          <Route path="/soon" element={<ComingSoon />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppStateProvider>
  );
}
