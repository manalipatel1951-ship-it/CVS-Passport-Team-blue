import {
  chooseQuickStart,
  getSummary,
  getVideoLines,
  initialTwinState,
  twinRespond,
} from './twin.js';

const NAME = 'Sarah';
const text = (t) => ({ type: 'text', text: t });

// Plays a list of inputs and returns every reply part plus the final state.
function play(inputs, state = initialTwinState(NAME)) {
  const parts = [];
  for (const input of inputs) {
    const r = twinRespond(input, state, NAME);
    parts.push(...r.reply);
    state = r.state;
  }
  return { parts, state, texts: parts.map((p) => p.text).filter(Boolean) };
}

describe('MinuteTwin script engine', () => {
  it('starts with the rash message pre-typed', () => {
    expect(initialTwinState(NAME).prefill).toBe(
      'Hi, my mother Sarah has a rash on her left upper arm.',
    );
  });

  it('rash: message, then photo with caption, then video, then done', () => {
    let { state, texts } = play([text(initialTwinState(NAME).prefill)]);
    expect(texts[0]).toMatch(/send a photo of the rash/);
    expect(state.waiting).toBe('photo');
    expect(state.prefill).toMatch(/^Started yesterday/);

    let parts;
    ({ state, parts } = play([{ type: 'photo', caption: state.prefill }], state));
    expect(parts[0].medsCheck).toBe("Checked Sarah's medications: no recent changes.");
    expect(parts[1].text).toMatch(/quick video call/);
    expect(parts[1].action).toBe('video');
    expect(state.waiting).toBe('video');
    expect(getVideoLines(state, NAME)[0]).toMatch(/closer to the rash on Sarah's left upper arm/);

    ({ state, parts } = play([{ type: 'videoEnded' }], state));
    expect(parts).toHaveLength(0);
    expect(state.waiting).toBe('done');
    expect(state.completedAt).not.toBeNull();
    expect(getSummary(state).condition).toBe('Likely contact dermatitis');
  });

  it.each([
    ['cold', /common cold/],
    ['allergy', /seasonal allergies/],
  ])('quick start "%s" follows its path to a summary card', (pathId, conclusion) => {
    const chosen = chooseQuickStart(pathId, initialTwinState(NAME), NAME);
    let result = play([text(chosen.prefill)], chosen);
    expect(result.state.pathId).toBe(pathId);
    result = play([text(result.state.prefill)], result.state);
    expect(result.texts[0]).toMatch(conclusion);
    expect(result.parts.some((p) => p.summaryCard)).toBe(true);
    expect(result.state.waiting).toBe('done');
  });

  it.each([
    ['She has an infected scrape on her knee', 'cut'],
    ['She has a fever', 'fever'],
    ['Her pollen allergies again, itchy eyes', 'allergy'],
  ])('typing "%s" follows the %s path', (first, pathId) => {
    expect(play([text(first)]).state.pathId).toBe(pathId);
  });

  it('"Something else" clears the box', () => {
    expect(chooseQuickStart(null, initialTwinState(NAME), NAME).prefill).toBe('');
  });

  it('replies naturally and waits when nothing matches', () => {
    const { texts, state } = play([text('She is not feeling well')]);
    expect(texts[0]).toBe(
      'I can help with that. Can you tell me what Sarah is experiencing and when it started?',
    );
    expect(state.pathId).toBeNull();
  });

  it('shows the 911 alert only when emergency words are typed', () => {
    const { parts, state } = play([text('She has chest pain')]);
    expect(parts[0].alert).toBe('er');
    expect(state.escalation).toBe('er');
    const rash = play([text('rash'), { type: 'photo', caption: 'no fever' }]);
    expect(rash.parts.some((p) => p.alert)).toBe(false);
  });

  it('nudges instead of skipping ahead when waiting for the photo or the video', () => {
    let { state } = play([text('rash')]);
    expect(play([text('ok')], state).texts[0]).toMatch(/camera button/);
    ({ state } = play([{ type: 'photo' }], state));
    expect(play([text('ok')], state).texts[0]).toMatch(/Start video call/);
  });

  it('matches whole words only', () => {
    expect(play([text('It started early this morning')]).state.pathId).toBeNull();
  });
});
