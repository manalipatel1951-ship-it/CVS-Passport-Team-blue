import {
  EMERGENCY_KEYWORDS,
  EMERGENCY_REPLY,
  FALLBACK_REPLY,
  NUDGES,
  PHOTO_REPLIES,
  paths,
} from './twinScripts.js';
import { DEMO } from '../config/demo.js';

// MinuteTwin's "brain": picks the next scripted reply. Pure functions, no real AI.

const fill = (text, name) => text.replaceAll('{name}', name);

export const getPath = (pathId) => paths.find((p) => p.id === pathId) ?? null;

export function initialTwinState(name) {
  return {
    pathId: null, // which script we're following (null until the first message picks one)
    chosenPathId: null, // path picked with a quick-start button
    tappedStart: null, // label of the quick-start button that was tapped (shown filled in)
    turn: 0, // next turn of that script
    waiting: 'text', // what MinuteTwin is waiting for: 'text' | 'photo' | 'video' | 'done'
    prefill: fill(getPath('rash').firstMessage, name), // the caregiver's next message, pre-typed
    escalation: null, // 'er' once an emergency word has been typed
    photoSent: false,
    completedAt: null, // when the visit finished (ISO date)
  };
}

// A quick-start button was tapped: pre-fill that path's first message (or clear for "Something else").
export function chooseQuickStart(pathId, state, name, label = null) {
  const path = getPath(pathId);
  return {
    ...state,
    chosenPathId: pathId,
    tappedStart: label,
    prefill: path ? fill(path.firstMessage, name) : '',
  };
}

// Whole-word match, ignoring case ("ear" won't match "early").
function mentions(text, keywords) {
  const lower = text.toLowerCase().replaceAll('’', "'");
  return keywords.some((kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`).test(lower);
  });
}

export const findPath = (text) => paths.find((p) => mentions(text, p.keywords)) ?? null;

// Fill in {name} in every text part of a reply.
const fillReply = (reply, name) =>
  reply.map((part) => ({
    ...part,
    ...(part.text && { text: fill(part.text, name) }),
    ...(part.medsCheck && { medsCheck: fill(part.medsCheck, name) }),
  }));

// Visits use a fixed demo date and time (DEMO.visitTime), so the demo always looks the same.
const finish = (state) => ({ ...state, waiting: 'done', completedAt: DEMO.visitTime });

// Play the next turn of the current path.
function playTurn(path, state, name) {
  const turn = path.turns[state.turn];
  const next = {
    ...state,
    pathId: path.id,
    turn: state.turn + 1,
    waiting: turn.next.waiting,
    prefill: turn.next.prefill ? fill(turn.next.prefill, name) : '',
  };
  return {
    reply: fillReply(turn.reply, name),
    state: next.waiting === 'done' ? finish(next) : next,
  };
}

const say = (text, state, name, extra = {}) => ({
  reply: [{ text: fill(text, name), ...extra }],
  state,
});

/**
 * MinuteTwin's response to something the caregiver did.
 * @param {{type: 'text', text: string} | {type: 'photo', caption?: string} | {type: 'videoEnded'}} input
 * @returns {{ reply: Array<object>, state: object }} reply parts (may be empty) and the new state
 */
export function twinRespond(input, state, name) {
  const path = getPath(state.pathId);
  const words = input.type === 'text' ? input.text : (input.caption ?? '');

  // Emergencies first, but only when those words are actually typed.
  if (words && mentions(words, EMERGENCY_KEYWORDS)) {
    return say(EMERGENCY_REPLY, { ...state, escalation: 'er' }, name, { alert: 'er' });
  }

  if (input.type === 'text') {
    if (!path) {
      // A quick-start button picks the path directly; otherwise match keywords.
      const chosen = getPath(state.chosenPathId);
      const found =
        chosen && input.text === fill(chosen.firstMessage, name) ? chosen : findPath(input.text);
      if (found) return playTurn(found, state, name);
      return say(FALLBACK_REPLY, { ...state, prefill: '' }, name);
    }
    if (state.waiting === 'text') return playTurn(path, state, name);
    return say(NUDGES[state.waiting], state, name);
  }

  if (input.type === 'photo') {
    const withPhoto = { ...state, photoSent: true };
    if (path && state.waiting === 'photo') return playTurn(path, withPhoto, name);
    return say(path ? PHOTO_REPLIES.extra : PHOTO_REPLIES.noPath, withPhoto, name);
  }

  // The video call ended: the visit is complete (the summary screen opens next).
  if (input.type === 'videoEnded' && path && state.waiting === 'video') {
    return { reply: [], state: finish(state) };
  }

  return { reply: [], state };
}

// What the visit summary shows.
export function getSummary(state) {
  return getPath(state.pathId)?.summary ?? null;
}

// MinuteTwin's two captions on the video call.
export function getVideoLines(state, name) {
  const lines = getPath(state.pathId)?.videoLines ?? [
    "Hi there, can you show me what's going on?",
    "Thanks, I've got what I need. I'll put together the visit summary now.",
  ];
  return lines.map((line) => fill(line, name));
}
