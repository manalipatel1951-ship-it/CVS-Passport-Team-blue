import {
  closingReply,
  emergencyKeywords,
  emergencyReply,
  fallbackReplies,
  generalSummary,
  photoReply,
  topics,
  warningKeywords,
  warningReply,
} from './responses.js';

// The conversation's memory between messages.
export const initialChatState = {
  topicId: null, // which topic we're talking about (null until we know)
  step: 0, // how many topic replies have been given
  misses: 0, // how many messages in a row we couldn't understand
  escalation: null, // null | 'urgent' | 'er'. Only ever goes up, never back down.
};

// Whole-word match, ignoring case ("ear" won't match "early").
function mentions(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.some((kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`).test(lower);
  });
}

export function findTopic(text) {
  return topics.find((t) => mentions(text, t.keywords)) ?? null;
}

export function getTopic(topicId) {
  return topics.find((t) => t.id === topicId) ?? null;
}

const fill = (text, name) => text.replaceAll('{name}', name);

/**
 * Picks the AI nurse's next reply.
 * @param {{ text?: string, isPhoto?: boolean }} message  what the caregiver sent
 * @param {typeof initialChatState} state                  the conversation so far
 * @param {string} name                                    the loved one's first name
 * @returns {{ reply: string, alert: null|'urgent'|'er', state: typeof initialChatState }}
 */
export function matchReply(message, state, name) {
  const text = message.text ?? '';

  // 1. Emergencies always come first.
  if (mentions(text, emergencyKeywords)) {
    return { reply: emergencyReply, alert: 'er', state: { ...state, escalation: 'er' } };
  }

  // 2. Photos.
  if (message.isPhoto) {
    const reply = state.topicId ? photoReply.withTopic : photoReply.noTopic;
    return { reply, alert: null, state };
  }

  // 3. Figure out (or keep) the topic.
  const topic = getTopic(state.topicId) ?? findTopic(text);

  // 4. Warning signs: recommend being seen in person.
  if (mentions(text, warningKeywords)) {
    const escalation = state.escalation === 'er' ? 'er' : 'urgent';
    return {
      reply: fill(warningReply, name),
      alert: 'urgent',
      state: { ...state, topicId: topic?.id ?? null, misses: 0, escalation },
    };
  }

  // 5. On topic: give the next scripted reply, then wrap up.
  if (topic) {
    const reply = topic.replies[state.step] ?? closingReply;
    return {
      reply: fill(reply, name),
      alert: null,
      state: { ...state, topicId: topic.id, step: state.step + 1, misses: 0 },
    };
  }

  // 6. Didn't understand: ask again, then suggest an in-person visit.
  const reply = fallbackReplies[Math.min(state.misses, fallbackReplies.length - 1)];
  return { reply: fill(reply, name), alert: null, state: { ...state, misses: state.misses + 1 } };
}

// What the visit summary shows, based on how the conversation went.
export function buildSummary(state) {
  const topic = getTopic(state.topicId);
  return {
    title: topic?.label ?? 'General question',
    ...(topic?.summary ?? generalSummary),
    escalation: state.escalation,
  };
}

// The NP's opening line on the video screen.
export function videoLine(state) {
  return getTopic(state.topicId)?.videoLine ?? "Hi there, can you show me what's going on?";
}
