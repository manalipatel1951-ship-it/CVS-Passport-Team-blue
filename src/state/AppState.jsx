import { createContext, useContext, useMemo, useState } from 'react';
import { demoLovedOne } from '../data/family.js';
import { initialChatState } from '../ai/matchReply.js';

// The demo's short-term memory. Nothing is saved: refreshing the page restarts the demo.
const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  // Answers from the Add family member form (pre-filled with demo data).
  const [draft, setDraft] = useState(demoLovedOne);
  // The loved one, once Flow 1 is complete. Flow 2 is locked until then.
  const [lovedOne, setLovedOne] = useState(null);
  // True right after adding, so My Fam shows the confirmation.
  const [justAdded, setJustAdded] = useState(false);
  // The current chat with the AI nurse.
  const [messages, setMessages] = useState([]);
  const [chatState, setChatState] = useState(initialChatState);

  const value = useMemo(
    () => ({
      draft,
      setDraft,
      lovedOne,
      justAdded,
      setJustAdded,
      addLovedOne: () => {
        setLovedOne({ ...draft, id: draft.firstName.trim().toLowerCase() || 'lovedone' });
        setJustAdded(true);
      },
      messages,
      setMessages,
      chatState,
      setChatState,
      resetChat: () => {
        setMessages([]);
        setChatState(initialChatState);
      },
    }),
    [draft, lovedOne, justAdded, messages, chatState],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  return useContext(AppStateContext);
}
