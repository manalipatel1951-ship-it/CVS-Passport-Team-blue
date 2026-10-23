import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from './state/AppState.jsx';
import Welcome from './screens/Welcome.jsx';
import MyFam from './screens/MyFam.jsx';
import AddMember from './screens/AddMember.jsx';
import FoundAccount from './screens/FoundAccount.jsx';
import ScanId from './screens/ScanId.jsx';
import ManualEntry from './screens/ManualEntry.jsx';
import Verified from './screens/Verified.jsx';
import RequireLovedOne from './screens/RequireLovedOne.jsx';
import Dashboard from './screens/Dashboard.jsx';
import RecordDetail from './screens/RecordDetail.jsx';
import Chat from './screens/Chat.jsx';
import Video from './screens/Video.jsx';
import Preparing from './screens/Preparing.jsx';
import Summary from './screens/Summary.jsx';

// Screens that need the loved one to have approved access (Flow 2).
const care = (screen) => <RequireLovedOne>{screen}</RequireLovedOne>;

// Every screen gets one route here.
// Flow 1 (Caregiver Passport): / (splash → Welcome) → /fam (profile step, no nav) →
//   /fam/add → /fam/add/found → /fam/add/verify (or /fam/add/manual) → /fam/add/verified → /fam
//   Tapping the approved person opens Home.
// Flow 2 (MinuteTwin): /care/:id (Home) → /care/:id/chat → /care/:id/video →
//   /care/:id/preparing → /care/:id/summary → Close → /care/:id
export default function App() {
  return (
    <AppStateProvider>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/fam" element={<MyFam />} />
          <Route path="/fam/add" element={<AddMember />} />
          <Route path="/fam/add/found" element={<FoundAccount />} />
          <Route path="/fam/add/verify" element={<ScanId />} />
          <Route path="/fam/add/manual" element={<ManualEntry />} />
          <Route path="/fam/add/verified" element={<Verified />} />
          <Route path="/care/:id" element={care(<Dashboard />)} />
          <Route path="/care/:id/records/:recordId" element={care(<RecordDetail />)} />
          <Route path="/care/:id/chat" element={care(<Chat />)} />
          <Route path="/care/:id/video" element={care(<Video />)} />
          <Route path="/care/:id/preparing" element={care(<Preparing />)} />
          <Route path="/care/:id/summary" element={care(<Summary />)} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppStateProvider>
  );
}
