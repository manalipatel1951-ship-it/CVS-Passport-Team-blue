import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { caregiver, demoLovedOne } from '../data/family.js';
import { initialTwinState, twinRespond } from '../ai/twin.js';
import { DELAYS } from '../config/demo.js';

// The demo's short-term memory. Nothing is saved: refreshing the page restarts the demo.
const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  // --- Flow 1: Caregiver Passport ---
  // Answers from the Add family member form (pre-filled with demo data).
  const [draft, setDraft] = useState(demoLovedOne);
  // The loved one once the request is sent. status: 'pending' → 'approved'.
  // Flow 2 is locked until they approve.
  const [lovedOne, setLovedOne] = useState(null);
  // True right after sending the request, so My Fam shows the request / approval banners.
  const [justAdded, setJustAdded] = useState(false);

  // Stable functions (screens use them inside effects, so they must not change between renders).
  const approveLovedOne = useCallback(
    () => setLovedOne((p) => (p ? { ...p, status: 'approved' } : p)),
    [],
  );
  const markVisitsSeen = useCallback(() => setHasNewVisit(false), []);

  // --- Small pop-up message ("Not part of this demo") ---
  const [notice, setNotice] = useState('');
  const noticeTimer = useRef(null);
  const showNotice = useCallback((message = 'Not part of this demo') => {
    setNotice(message);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), DELAYS.notice);
  }, []);

  // --- Flow 2: MinuteTwin visit ---
  const name = lovedOne?.firstName ?? demoLovedOne.firstName;
  const [twin, setTwin] = useState(() => initialTwinState(name));
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [chatInput, setChatInput] = useState(twin.prefill);
  // Finished visits, shown under "Previous visits" on the dashboard.
  const [visits, setVisits] = useState([]);
  const [hasNewVisit, setHasNewVisit] = useState(false);

  // Something the caregiver did in the visit: { type: 'text', text } | { type: 'photo' } | { type: 'videoEnded' }
  const sendToTwin = useCallback(
    (input) => {
      if (input.type === 'text') setMessages((m) => [...m, { from: 'me', text: input.text }]);
      if (input.type === 'photo') setMessages((m) => [...m, { from: 'me', photo: true }]);
      if (input.type === 'videoEnded')
        setMessages((m) => [...m, { from: 'system', text: 'Video call ended' }]);

      const result = twinRespond(input, twin, name);
      setTwin(result.state);
      setChatInput('');
      if (result.reply.length === 0) return;
      setTyping(true);
      setTimeout(() => {
        setMessages((m) => [...m, ...result.reply.map((part) => ({ from: 'twin', ...part }))]);
        setChatInput(result.state.prefill);
        setTyping(false);
      }, DELAYS.typing);
    },
    [twin, name],
  );

  const value = useMemo(() => {
    const resetChat = (forName = name) => {
      const fresh = initialTwinState(forName);
      setTwin(fresh);
      setMessages([]);
      setTyping(false);
      setChatInput(fresh.prefill);
    };
    return {
      caregiver,
      draft,
      setDraft,
      lovedOne,
      justAdded,
      setJustAdded,
      // Called after verification: sends Sarah the request (she shows up as Pending).
      sendRequest: () => {
        const added = {
          ...draft,
          id: draft.firstName.trim().toLowerCase() || 'lovedone',
          status: 'pending',
        };
        setLovedOne(added);
        setJustAdded(true);
        resetChat(added.firstName);
      },
      approveLovedOne,
      notice,
      showNotice,
      twin,
      messages,
      typing,
      chatInput,
      setChatInput,
      sendToTwin,
      resetChat,
      visits,
      hasNewVisit,
      markVisitsSeen,
      // Close on the summary: save the finished visit, then start fresh next time.
      closeVisit: () => {
        if (twin.waiting === 'done') {
          setVisits((v) => [{ pathId: twin.pathId, completedAt: twin.completedAt }, ...v]);
          setHasNewVisit(true);
        }
        resetChat();
      },
    };
  }, [
    draft,
    lovedOne,
    justAdded,
    notice,
    showNotice,
    twin,
    messages,
    typing,
    chatInput,
    sendToTwin,
    visits,
    hasNewVisit,
    name,
    approveLovedOne,
    markVisitsSeen,
  ]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  return useContext(AppStateContext);
}
