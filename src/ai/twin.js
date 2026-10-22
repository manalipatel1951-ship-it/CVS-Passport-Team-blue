import {
  EMERGENCY_KEYWORDS,
  EMERGENCY_REPLY,
  FALLBACK_REPLY,
  FIRST_PREFILL,
  NUDGES,
  PHOTO_REPLIES,
  paths,
} from './twinScripts.js';

// MinuteTwin's "brain": picks the next scripted reply. Pure functions, no real AI.

export function initialTwinState(name) {
  return {
    pathId: null, // which script we're following (null until the first message picks one)
    turn: 0, // next turn of that script
    waiting: 'text', // what MinuteTwin is waiting for: 'text' | 'photo' | 'video' | 'done'
    prefill: fill(FIRST_PREFILL, name), // the caregiver's next message, pre-typed
    escalation: null, // 'er' once an emergency word has been typed
    photoSent: false,
    completedAt: null, // when the visit finished (ISO date)
  };
}

const fill = (text, name) => text.replaceAll('{name}', name);

// Whole-word match, ignoring case ("ear" won't match "early").
function mentions(text, keywords) {
  const lower = text.toLowerCase().replaceAll('’', "'");
  return keywords.some((kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`).test(lower);
  });
}

export const getPath = (pathId) => paths.find((p) => p.id === pathId) ?? null;
export const findPath = (text) => paths.find((p) => mentions(text, p.keywords)) ?? null;

// Fill in {name} in every text part of a reply.
const fillReply = (reply, name) =>
  reply.map((part) => (part.text ? { ...part, text: fill(part.text, name) } : part));

// Play the next turn of the current path.
function playTurn(path, state, name) {
  const turn = path.turns[state.turn];
  const done = turn.next.waiting === 'done';
  return {
    reply: fillReply(turn.reply, name),
    state: {
      ...state,
      pathId: path.id,
      turn: state.turn + 1,
      waiting: turn.next.waiting,
      prefill: turn.next.prefill ?? '',
      completedAt: done ? new Date().toISOString() : state.completedAt,
    },
  };
}

const say = (text, state, name, extra = {}) => ({
  reply: [{ text: fill(text, name), ...extra }],
  state,
});

/**
 * MinuteTwin's response to something the caregiver did.
 * @param {{type: 'text', text: string} | {type: 'photo'} | {type: 'videoEnded'}} input
 * @returns {{ reply: Array<object>, state: object }} reply parts (may be empty) and the new state
 */
export function twinRespond(input, state, name) {
  const path = getPath(state.pathId);

  if (input.type === 'text') {
    // Emergencies first, but only when those words are actually typed.
    if (mentions(input.text, EMERGENCY_KEYWORDS)) {
      return say(EMERGENCY_REPLY, { ...state, escalation: 'er' }, name, { alert: 'er' });
    }
    if (!path) {
      const found = findPath(input.text);
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

  if (input.type === 'videoEnded' && path && state.waiting === 'video') {
    return playTurn(path, state, name);
  }

  return { reply: [], state };
}

// What the visit summary shows.
export function getSummary(state) {
  return getPath(state.pathId)?.summary ?? null;
}

// MinuteTwin's line on the video screen.
export function getVideoLine(state, name) {
  const line = getPath(state.pathId)?.videoLine ?? "Hi there, can you show me what's going on?";
  return fill(line, name);
}
